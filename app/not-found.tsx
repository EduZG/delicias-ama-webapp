import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[62vh] flex-col items-start justify-center gap-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
        404
      </p>
      <h1 className="text-3xl font-semibold text-ink-900">
        Esta pantalla aún no está en carta
      </h1>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </section>
  );
}
