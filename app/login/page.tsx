import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div>
      <PageHeader
        eyebrow="cuenta"
        title="Iniciar sesión"
        description="Accede para consultar tus pedidos y guardar tus datos favoritos."
      />
      <section className="container max-w-xl pb-12">
        <Card className="space-y-4">
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
              placeholder="••••••••"
              type="password"
            />
          </label>
          <Button className="w-full">Entrar</Button>
          <p className="text-center text-sm text-muted">
            ¿No tienes cuenta?{" "}
            <Link className="font-semibold text-brand-700" href="/register">
              Crear cuenta
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}
