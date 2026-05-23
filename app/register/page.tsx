import { RegisterForm } from "@/components/auth/register-form";
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
        <Card>
          <RegisterForm />
        </Card>
      </section>
    </div>
  );
}
