"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { products } from "@/lib/data/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createFieldErrorState,
  sanitizeLongText,
  sanitizeText,
  type ActionState,
} from "@/lib/validation";
import { validatePhone } from "@/lib/validation";
import { getOrderById } from "@/services/orders";

const checkoutProducts = products.slice(0, 2);

function missingSupabaseState(): ActionState {
  return {
    status: "error",
    message:
      "Supabase no esta configurado. Completa las variables de entorno para crear pedidos.",
  };
}

export async function createOrderAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const customerName = sanitizeText(formData.get("customerName"), 120);
  const customerPhone = sanitizeText(formData.get("customerPhone"), 24);
  const deliveryMethod = sanitizeText(formData.get("deliveryMethod"), 20);
  const deliveryAddress = sanitizeLongText(formData.get("deliveryAddress"), 240);
  const notes = sanitizeLongText(formData.get("notes"), 400);
  const fieldErrors: Record<string, string> = {};
  const phoneError = validatePhone(customerPhone);

  if (!customerName) {
    fieldErrors.customerName = "Introduce tu nombre.";
  }

  if (phoneError) {
    fieldErrors.customerPhone = phoneError;
  }

  if (!["pickup", "delivery"].includes(deliveryMethod)) {
    fieldErrors.deliveryMethod = "Elige entrega o recogida.";
  }

  if (deliveryMethod === "delivery" && !deliveryAddress) {
    fieldErrors.deliveryAddress = "Introduce una direccion de entrega.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return createFieldErrorState(fieldErrors);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingSupabaseState();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Inicia sesion para crear un pedido&type=error");
  }

  const orderItems = checkoutProducts.map((product, index) => {
    const quantity = index + 1;

    return {
      product_id: null,
      product_name: product.name,
      quantity,
      unit_price: product.price,
      total_price: product.price * quantity,
    };
  });
  const subtotal = orderItems.reduce((total, item) => total + item.total_price, 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_method: deliveryMethod,
      delivery_address: deliveryMethod === "delivery" ? deliveryAddress : null,
      status: "recibido",
      subtotal,
      total_amount: subtotal,
      payment_status: "pending",
      payment_provider: "stripe",
      notes: notes || null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return {
      status: "error",
      message: "No hemos podido crear el pedido.",
    };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    })),
  );

  if (itemsError) {
    return {
      status: "error",
      message: "El pedido se creo, pero no pudimos guardar sus productos.",
    };
  }

  revalidatePath("/account/orders");
  redirect(`/account/orders/${order.id}?message=Pedido creado&type=success`);
}

export async function repeatOrderAction(formData: FormData) {
  const orderId = sanitizeText(formData.get("orderId"), 80);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/checkout?message=Configura Supabase para repetir pedidos&type=error");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Inicia sesion para repetir un pedido&type=error");
  }

  const previousOrder = await getOrderById(orderId, user.id);

  if (!previousOrder || previousOrder.items.length === 0) {
    redirect("/account/orders?message=No hemos encontrado ese pedido&type=error");
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      customer_name: previousOrder.customerName,
      customer_phone: previousOrder.customerPhone,
      delivery_method: previousOrder.deliveryMethod,
      delivery_address: previousOrder.deliveryAddress ?? null,
      status: "recibido",
      subtotal: previousOrder.subtotal,
      total_amount: previousOrder.totalAmount,
      payment_status: "pending",
      payment_provider: "stripe",
      notes: previousOrder.notes ?? null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    redirect("/account/orders?message=No hemos podido repetir el pedido&type=error");
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    previousOrder.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId || null,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
    })),
  );

  if (itemsError) {
    redirect("/account/orders?message=Pedido duplicado sin productos&type=error");
  }

  revalidatePath("/account/orders");
  redirect(`/account/orders/${order.id}?message=Pedido repetido&type=success`);
}
