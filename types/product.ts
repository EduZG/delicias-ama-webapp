export type ProductTag = "picante" | "vegetariano" | "premium" | "nuevo";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: ProductTag[];
};
