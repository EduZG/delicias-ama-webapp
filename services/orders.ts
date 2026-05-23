import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Order, OrderItem, OrderStatus } from "@/types/order";

type OrderRow = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  delivery_method: string;
  delivery_address: string | null;
  status: OrderStatus;
  subtotal: number;
  total_amount: number;
  payment_status: string | null;
  payment_provider: string | null;
  notes: string | null;
  created_at: string;
  order_items?: OrderItemRow[];
};

type OrderItemRow = {
  id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

function mapOrderItem(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    productId: row.product_id ?? "",
    productName: row.product_name,
    quantity: row.quantity,
    unitPrice: Number(row.unit_price),
    totalPrice: Number(row.total_price),
  };
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    userId: row.user_id ?? undefined,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    deliveryMethod: row.delivery_method === "delivery" ? "delivery" : "pickup",
    deliveryAddress: row.delivery_address ?? undefined,
    status: row.status,
    subtotal: Number(row.subtotal),
    totalAmount: Number(row.total_amount),
    paymentStatus: row.payment_status === "paid" ? "paid" : "pending",
    paymentProvider: row.payment_provider === "stripe" ? "stripe" : undefined,
    notes: row.notes ?? undefined,
    items: row.order_items?.map(mapOrderItem) ?? [],
    createdAt: row.created_at,
  };
}

export async function getRecentOrders(userId: string): Promise<Order[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_phone, delivery_method, delivery_address, status, subtotal, total_amount, payment_status, payment_provider, notes, created_at, order_items(id, product_id, product_name, quantity, unit_price, total_price)",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapOrder(row as OrderRow));
}

export async function getOrderById(
  orderId: string,
  userId: string,
): Promise<Order | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_phone, delivery_method, delivery_address, status, subtotal, total_amount, payment_status, payment_provider, notes, created_at, order_items(id, product_id, product_name, quantity, unit_price, total_price)",
    )
    .eq("id", orderId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapOrder(data as OrderRow);
}
