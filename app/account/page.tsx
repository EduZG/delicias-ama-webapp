import Link from "next/link";
import { ProfileForm } from "@/components/account/profile-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Toast } from "@/components/ui/toast";
import { getProfile, requireUser } from "@/services/auth";
import { logoutAction } from "@/services/auth/actions";

export const metadata = {
  title: "Cuenta",
};

type AccountPageProps = {
  searchParams: Promise<{
    message?: string;
    type?: "success" | "error" | "info";
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { message, type } = await searchParams;
  const user = await requireUser();
  const profile = await getProfile(user.id);

  return (
    <div>
      <Toast message={message} type={type} />
      <PageHeader
        eyebrow="perfil"
        title="Mi cuenta"
        description="Gestiona tus datos y consulta el historial de pedidos."
      />
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_360px]">
        <Card>
          <ProfileForm email={user.email} profile={profile} />
        </Card>
        <div className="space-y-5">
          <Card className="space-y-3">
            <h2 className="text-lg font-semibold text-ink-900">Pedidos</h2>
            <p className="text-sm leading-6 text-muted">
              Consulta tus pedidos recientes, revisa estados y repite favoritos.
            </p>
            <Button asChild>
              <Link href="/account/orders">Ver pedidos</Link>
            </Button>
          </Card>
          <Card className="space-y-3">
            <h2 className="text-lg font-semibold text-ink-900">Sesion</h2>
            <p className="text-sm leading-6 text-muted">
              Cierra la sesion en este dispositivo cuando termines.
            </p>
            <form action={logoutAction}>
              <Button className="w-full" type="submit" variant="secondary">
                Cerrar sesion
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
