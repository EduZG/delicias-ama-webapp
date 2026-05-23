import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Toast } from "@/components/ui/toast";
import { orderStatusLabels } from "@/lib/orders/status";
import { formatCurrency } from "@/lib/utils/format";
import { requireUser } from "@/services/auth";
import { getOrderById } from "@/services/orders";
import { repeatOrderAction } from "@/services/orders/actions";
import type { OrderStatus } from "@/types/order";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    message?: string;
    type?: "success" | "error" | "info";
  }>;
};

const statusFlow: OrderStatus[] = [
  "recibido",
  "preparando",
  "horneando",
  "listo",
  "entregado",
];

export default async function OrderDetailPage({
  params,
  searchParams,
}: OrderDetailPageProps) {
  const { id } = await params;
  const { message, type } = await searchParams;
  const user = await requireUser();
  const order = await getOrderById(id, user.id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <Toast message={message} type={type} />
      <PageHeader
        eyebrow="seguimiento"
        title={`Pedido ${order.id.slice(0, 8)}`}
        description="Sigue cada paso desde la recepcion hasta la entrega."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <Card className="space-y-4">
          {statusFlow.map((status) => {
            const isCurrent = status === order.status;

            return (
              <div
                className="flex items-center justify-between rounded-md border border-border bg-white px-4 py-3"
                key={status}
              >
                <span className="font-medium text-ink-900">
                  {orderStatusLabels[status]}
                </span>
                <span className="text-sm text-muted">
                  {isCurrent ? "Actual" : "Pendiente"}
                </span>
              </div>
            );
          })}
        </Card>
        <Card className="h-fit space-y-4">
          <h2 className="text-lg font-semibold text-ink-900">Resumen</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                className="flex items-center justify-between gap-4 text-sm"
                key={item.id}
              >
                <span>
                  {item.quantity} x {item.productName}
                </span>
                <span className="font-semibold">
                  {formatCurrency(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
          <p className="text-sm text-muted">
            {new Intl.DateTimeFormat("es-ES", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date(order.createdAt))}
          </p>
          <form action={repeatOrderAction}>
            <input name="orderId" type="hidden" value={order.id} />
            <Button className="w-full" type="submit">
              Repetir pedido
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
}
