import { products } from "@/lib/data/products";

export async function getProducts() {
  return products.filter((product) => product.isActive);
}

export async function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured && product.isActive);
}
