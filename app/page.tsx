import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import { getFeaturedProducts } from "@/services/products";

const highlights = [
  { label: "Empanadas", value: "artesanales" },
  { label: "Pedido", value: "mobile-first" },
  { label: "Recogida", value: "sin fricción" },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      <section className="container grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-border bg-white/70 px-3 py-1 text-sm font-medium text-ink-700">
            Street food premium · Madrid
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-ink-900 sm:text-5xl lg:text-6xl">
              Delicias de la ama
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Empanadas artesanales con alma de barrio, producto cuidado y una
              experiencia digital preparada para crecer.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/menu">Ver menú</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/cart">Ir al carrito</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {highlights.map((item) => (
              <div key={item.label}>
                <p className="text-sm font-semibold text-ink-900">
                  {item.label}
                </p>
                <p className="text-sm text-muted">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden bg-ink-900 p-0 text-white shadow-soft">
          <div className="space-y-8 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-brand-200">Pedido destacado</p>
                <h2 className="mt-2 text-3xl font-semibold">
                  Pack degustación
                </h2>
              </div>
              <p className="rounded-full bg-brand-400 px-3 py-1 text-sm font-bold text-ink-900">
                {formatCurrency(18.5)}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/74">
              Una selección para probar sabores, compartir en mesa y descubrir
              la carta con el menor rodeo posible.
            </p>
            <div className="grid gap-3">
              {["recibido", "preparando", "horneando", "listo"].map(
                (status, index) => (
                  <div
                    className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3"
                    key={status}
                  >
                    <span className="text-sm capitalize">{status}</span>
                    <span className="text-xs text-brand-200">
                      paso {index + 1}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Card>
      </section>

      <section className="border-y border-border bg-white/50 py-10 sm:py-14">
        <div className="container space-y-6">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
                destacados
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink-900">
                Primeras empanadas listas para el catálogo
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/menu">Explorar</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
