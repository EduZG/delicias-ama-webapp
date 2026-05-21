import Link from "next/link";

const footerLinks = [
  { href: "/menu", label: "Menú" },
  { href: "/checkout", label: "Checkout" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Registro" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/60">
      <div className="container grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-semibold text-ink-900">Delicias de la ama</p>
          <p className="mt-1 text-sm text-muted">
            Empanadas artesanales, pedidos online y cocina preparada para
            escalar.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm text-ink-700">
          {footerLinks.map((link) => (
            <Link className="hover:text-brand-700" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
