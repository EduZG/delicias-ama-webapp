export const orderStatuses = [
  "recibido",
  "preparando",
  "horneando",
  "listo",
  "entregado",
  "cancelado",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type DeliveryMethod = "pickup" | "delivery";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  status: OrderStatus;
  subtotal: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentProvider?: "stripe";
  notes?: string;
  items: OrderItem[];
  createdAt: string;
};
