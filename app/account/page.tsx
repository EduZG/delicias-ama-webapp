import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Cuenta",
};

export default function AccountPage() {
  return (
    <div>
      <PageHeader
        eyebrow="perfil"
        title="Mi cuenta"
        description="Centro de perfil para datos personales, dirección favorita e historial de pedidos."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-ink-900">Perfil</h2>
          <p className="text-sm leading-6 text-muted">
            Mantén a mano tu nombre, teléfono y dirección favorita para pedidos
            más rápidos.
          </p>
          <Button asChild variant="secondary">
            <Link href="/login">Conectar sesión</Link>
          </Button>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-ink-900">Pedidos</h2>
          <p className="text-sm leading-6 text-muted">
            Consulta tus pedidos recientes y sigue el estado de los que estén
            en marcha.
          </p>
          <Button asChild>
            <Link href="/account/orders">Ver pedidos</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
