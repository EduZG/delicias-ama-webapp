import { products as fallbackProducts } from "@/lib/data/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
  is_featured: boolean;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    price: Number(row.price),
    imageUrl: row.image_url ?? undefined,
    category: row.category ?? "empanadas",
    isActive: row.is_active,
    isFeatured: row.is_featured,
    tags: [],
  };
}

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return fallbackProducts.filter((product) => product.isActive);
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price, image_url, category, is_active, is_featured",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return fallbackProducts.filter((product) => product.isActive);
  }

  return data.map((row) => mapProduct(row as ProductRow));
}

export async function getFeaturedProducts() {
  const products = await getProducts();

  return products.filter((product) => product.isFeatured);
}
