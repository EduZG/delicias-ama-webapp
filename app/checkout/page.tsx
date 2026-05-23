import { CreditCard, MapPin } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Toast } from "@/components/ui/toast";
import { products } from "@/lib/data/products";
import { formatCurrency } from "@/lib/utils/format";
import { getProfile, requireUser } from "@/services/auth";

export const metadata = {
  title: "Checkout",
};

type CheckoutPageProps = {
  searchParams: Promise<{
    message?: string;
    type?: "success" | "error" | "info";
  }>;
};

const cartItems = products.slice(0, 2).map((product, index) => ({
  product,
  quantity: index + 1,
}));

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { message, type } = await searchParams;
  const user = await requireUser();
  const profile = await getProfile(user.id);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <Toast message={message} type={type} />
      <PageHeader
        eyebrow="checkout"
        title="Finalizar pedido"
        description="Completa tus datos y elige como quieres recibir tus empanadas."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <Card>
          <CheckoutForm email={user.email} profile={profile} />
        </Card>
        <Card className="h-fit space-y-5">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold">Entrega preparada</p>
              <p className="text-sm text-muted">Delivery o recogida local.</p>
            </div>
          </div>
          <div className="space-y-3 border-t border-border pt-4">
            {cartItems.map((item) => (
              <div
                className="flex items-center justify-between gap-4 text-sm"
                key={item.product.id}
              >
                <span>
                  {item.quantity} x {item.product.name}
                </span>
                <span className="font-semibold">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-3 border-t border-border pt-4">
            <CreditCard className="mt-0.5 h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold">Pago online</p>
              <p className="text-sm text-muted">Stripe queda preparado.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
