import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Toast } from "@/components/ui/toast";

export const metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
    type?: "success" | "error" | "info";
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { message, type } = await searchParams;

  return (
    <div>
      <Toast message={message} type={type} />
      <PageHeader
        eyebrow="cuenta"
        title="Iniciar sesion"
        description="Accede para consultar tus pedidos y guardar tus datos favoritos."
      />
      <section className="container max-w-xl pb-12">
        <Card>
          <LoginForm />
        </Card>
      </section>
    </div>
  );
}
