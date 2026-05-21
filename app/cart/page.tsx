import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { products } from "@/lib/data/products";
import { formatCurrency } from "@/lib/utils/format";

export const metadata = {
  title: "Carrito",
};

const cartItems = products.slice(0, 2).map((product, index) => ({
  product,
  quantity: index + 1,
}));

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <PageHeader
        eyebrow="pedido"
        title="Carrito"
        description="Revisa tu selección antes de confirmar los datos de entrega o recogida."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cartItems.map((item) => (
            <Card
              className="flex items-center justify-between gap-4"
              key={item.product.id}
            >
              <div>
                <h2 className="font-semibold text-ink-900">
                  {item.product.name}
                </h2>
                <p className="text-sm text-muted">Cantidad {item.quantity}</p>
              </div>
              <p className="font-semibold text-ink-900">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </Card>
          ))}
        </div>
        <Card className="h-fit space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
          </div>
          <Button asChild className="w-full">
            <Link href="/checkout">Continuar</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
