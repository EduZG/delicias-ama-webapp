import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { orderStatusLabels } from "@/lib/orders/status";
import { requireAdmin } from "@/services/auth";
import type { OrderStatus } from "@/types/order";

export const metadata = {
  title: "Admin",
};

const lanes: OrderStatus[] = [
  "recibido",
  "preparando",
  "horneando",
  "listo",
  "entregado",
  "cancelado",
];

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div>
      <PageHeader
        eyebrow="operaciones"
        title="Panel admin"
        description="Vista de operaciones para organizar pedidos por estado y mantener la cocina clara."
      />
      <section className="container grid gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {lanes.map((status, index) => (
          <Card className="space-y-3" key={status}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink-900">
                {orderStatusLabels[status]}
              </h2>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800">
                {index === 0 ? 2 : 0}
              </span>
            </div>
            <p className="text-sm leading-6 text-muted">
              Pedidos en estado {status} para seguimiento del equipo.
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
