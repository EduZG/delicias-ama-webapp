import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Toast } from "@/components/ui/toast";
import { orderStatusLabels } from "@/lib/orders/status";
import { formatCurrency } from "@/lib/utils/format";
import { requireUser } from "@/services/auth";
import { getRecentOrders } from "@/services/orders";
import { repeatOrderAction } from "@/services/orders/actions";

export const metadata = {
  title: "Mis pedidos",
};

type OrdersPageProps = {
  searchParams: Promise<{
    message?: string;
    type?: "success" | "error" | "info";
  }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { message, type } = await searchParams;
  const user = await requireUser();
  const orders = await getRecentOrders(user.id);

  return (
    <div>
      <Toast message={message} type={type} />
      <PageHeader
        eyebrow="historial"
        title="Mis pedidos"
        description="Consulta tus ultimos pedidos y el estado actual de cada preparacion."
      />
      <section className="container space-y-3 pb-12">
        {orders.length === 0 ? (
          <EmptyState
            action={
              <Button asChild>
                <Link href="/menu">Ver menu</Link>
              </Button>
            }
            description="Cuando crees tu primer pedido, aparecera aqui con estado, fecha, productos y total."
            title="Todavia no hay pedidos"
          />
        ) : (
          orders.map((order) => (
            <Card
              className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"
              key={order.id}
            >
              <Link href={`/account/orders/${order.id}`}>
                <p className="font-semibold text-ink-900">
                  Pedido {order.id.slice(0, 8)}
                </p>
                <p className="text-sm text-muted">
                  {new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(order.createdAt))}
                </p>
              </Link>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-brand-700">
                    {orderStatusLabels[order.status]}
                  </p>
                </div>
                <form action={repeatOrderAction}>
                  <input name="orderId" type="hidden" value={order.id} />
                  <Button type="submit" variant="secondary">
                    Repetir
                  </Button>
                </form>
              </div>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
