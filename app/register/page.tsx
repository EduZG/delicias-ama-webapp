import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Registro",
};

export default function RegisterPage() {
  return (
    <div>
      <PageHeader
        eyebrow="cuenta"
        title="Crear cuenta"
        description="Guarda tus datos, revisa tu historial y repite tus pedidos favoritos."
      />
      <section className="container max-w-xl pb-12">
        <Card className="space-y-4">
          <label className="space-y-2 text-sm font-medium text-ink-700">
            Nombre completo
            <input
              className="h-11 w-full rounded-md border border-border bg-white px-3 outline-none focus:border-brand-500"
              placeholder="Tu nombre"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-ink-700">
            Email
            <input
              className="h-11 w-full rounded-md border border-border bg-white px-3 outline-none focus:border-brand-500"
              placeholder="email@dominio.com"
              type="email"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-ink-700">
            Contraseña
            <input
              className="h-11 w-full rounded-md border border-border bg-white px-3 outline-none focus:border-brand-500"
              placeholder="Mínimo 8 caracteres"
              type="password"
            />
          </label>
          <Button className="w-full">Registrarme</Button>
          <p className="text-center text-sm text-muted">
            ¿Ya tienes cuenta?{" "}
            <Link className="font-semibold text-brand-700" href="/login">
              Iniciar sesión
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}
