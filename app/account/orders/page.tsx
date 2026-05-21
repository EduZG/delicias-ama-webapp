import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { orderStatusLabels } from "@/lib/orders/status";
import type { OrderStatus } from "@/types/order";

export const metadata = {
  title: "Mis pedidos",
};

const demoOrders: Array<{
  id: string;
  status: OrderStatus;
  total: string;
  date: string;
}> = [
  {
    id: "AMA-1004",
    status: "horneando",
    total: "12,80 €",
    date: "Hoy",
  },
  {
    id: "AMA-1001",
    status: "entregado",
    total: "18,50 €",
    date: "Anterior",
  },
];

export default function OrdersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="historial"
        title="Mis pedidos"
        description="Consulta tus últimos pedidos y el estado actual de cada preparación."
      />
      <section className="container space-y-3 pb-12">
        {demoOrders.map((order) => (
          <Card
            className="flex items-center justify-between gap-4"
            key={order.id}
          >
            <div>
              <h2 className="font-semibold text-ink-900">{order.id}</h2>
              <p className="text-sm text-muted">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{order.total}</p>
              <p className="text-sm text-brand-700">
                {orderStatusLabels[order.status]}
              </p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
