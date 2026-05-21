import { orderStatuses, type OrderStatus } from "@/types/order";

export const orderStatusLabels: Record<OrderStatus, string> = {
  recibido: "Recibido",
  preparando: "Preparando",
  horneando: "Horneando",
  listo: "Listo",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export function isOrderStatus(value: string): value is OrderStatus {
  return orderStatuses.includes(value as OrderStatus);
}

export function getNextOrderStatus(status: OrderStatus): OrderStatus | null {
  const flow: OrderStatus[] = [
    "recibido",
    "preparando",
    "horneando",
    "listo",
    "entregado",
  ];
  const next = flow[flow.indexOf(status) + 1];

  return next ?? null;
}
