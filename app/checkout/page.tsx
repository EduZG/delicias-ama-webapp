import { CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="checkout"
        title="Finalizar pedido"
        description="Completa tus datos y elige cómo quieres recibir tus empanadas."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <Card className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-ink-700">
              Nombre
              <input
                className="h-11 w-full rounded-md border border-border bg-white px-3 outline-none focus:border-brand-500"
                placeholder="Tu nombre"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-700">
              Teléfono
              <input
                className="h-11 w-full rounded-md border border-border bg-white px-3 outline-none focus:border-brand-500"
                placeholder="+34"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm font-medium text-ink-700">
            Dirección o notas de recogida
            <textarea
              className="min-h-28 w-full rounded-md border border-border bg-white px-3 py-3 outline-none focus:border-brand-500"
              placeholder="Dirección, portal, hora aproximada..."
            />
          </label>
        </Card>
        <Card className="h-fit space-y-4">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold">Entrega preparada</p>
              <p className="text-sm text-muted">Delivery o recogida local.</p>
            </div>
          </div>
          <div className="flex gap-3 border-t border-border pt-4">
            <CreditCard className="mt-0.5 h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold">Pago online</p>
              <p className="text-sm text-muted">Pago online próximamente.</p>
            </div>
          </div>
          <Button className="w-full">Confirmar pedido</Button>
        </Card>
      </section>
    </div>
  );
}
