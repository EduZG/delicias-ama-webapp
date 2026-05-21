import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-ink-900">{product.name}</h3>
        </div>
        <p className="text-base font-bold text-ink-900">
          {formatCurrency(product.price)}
        </p>
      </div>
      <p className="flex-1 text-sm leading-6 text-muted">{product.description}</p>
      <Button className="w-full" variant="secondary">
        <Plus className="h-4 w-4" />
        Añadir
      </Button>
    </Card>
  );
}
