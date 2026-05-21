import { ProductCard } from "@/components/catalog/product-card";
import { PageHeader } from "@/components/ui/page-header";
import { getProducts } from "@/services/products";

export const metadata = {
  title: "Menú",
};

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <div>
      <PageHeader
        eyebrow="catálogo"
        title="Menú inicial"
        description="Empanadas artesanales con rellenos cuidados, masa dorada y sabores pensados para comer sin ceremonia."
      />
      <section className="container pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
