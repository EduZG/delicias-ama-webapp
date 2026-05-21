import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/account/orders", label: "Pedidos" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/86 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/" aria-label="Inicio">
          <Image
            src="/logos/logo.svg"
            alt="Delicias de la ama"
            width={42}
            height={32}
            priority
          />
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-900">
            Delicias
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-white hover:text-ink-900"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="icon" variant="ghost" aria-label="Cuenta">
            <Link href="/account">
              <UserRound className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="secondary" aria-label="Carrito">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            className="md:hidden"
            size="icon"
            variant="ghost"
            aria-label="Abrir navegación"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <nav
        className="container flex gap-1 overflow-x-auto pb-3 md:hidden"
        aria-label="Principal móvil"
      >
        {navItems.map((item) => (
          <Link
            className="shrink-0 rounded-md border border-border bg-white/70 px-3 py-2 text-sm font-medium text-ink-700"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
