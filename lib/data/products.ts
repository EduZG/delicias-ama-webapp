import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "emp-carne-suave",
    name: "Carne suave",
    slug: "carne-suave",
    description:
      "Ternera especiada, cebolla pochada y masa dorada al horno con acabado crujiente.",
    price: 3.2,
    category: "empanadas",
    isActive: true,
    isFeatured: true,
    tags: ["premium"],
  },
  {
    id: "emp-pollo-chipotle",
    name: "Pollo chipotle",
    slug: "pollo-chipotle",
    description:
      "Pollo desmechado con toque ahumado, punto picante y relleno jugoso.",
    price: 3.4,
    category: "empanadas",
    isActive: true,
    isFeatured: true,
    tags: ["picante", "nuevo"],
  },
  {
    id: "emp-verduras-asadas",
    name: "Verduras asadas",
    slug: "verduras-asadas",
    description:
      "Calabacín, pimiento, cebolla y queso fundente en equilibrio vegetal.",
    price: 3.1,
    category: "empanadas",
    isActive: true,
    isFeatured: true,
    tags: ["vegetariano"],
  },
];

export const featuredProducts = products.filter((product) => product.isFeatured);
