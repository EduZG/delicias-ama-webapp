import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { orderStatusLabels } from "@/lib/orders/status";
import type { OrderStatus } from "@/types/order";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const statusFlow: OrderStatus[] = [
  "recibido",
  "preparando",
  "horneando",
  "listo",
  "entregado",
];

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const currentStatus: OrderStatus = "horneando";

  return (
    <div>
      <PageHeader
        eyebrow="seguimiento"
        title={`Pedido ${id}`}
        description="Sigue cada paso desde la recepción hasta la entrega."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <Card className="space-y-4">
          {statusFlow.map((status) => {
            const isCurrent = status === currentStatus;

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
          <p className="text-sm leading-6 text-muted">
            Tu pedido aparecerá aquí con productos, cantidades y notas de
            entrega.
          </p>
          <Button asChild variant="secondary">
            <Link href="/account/orders">Volver a pedidos</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
