import Link from "next/link";
import { PasswordResetForm } from "@/components/auth/password-reset-form";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Recuperar contrasena",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <PageHeader
        eyebrow="cuenta"
        title="Recuperar contrasena"
        description="Te enviaremos un enlace para volver a entrar en tu cuenta."
      />
      <section className="container max-w-xl pb-12">
        <Card className="space-y-4">
          <PasswordResetForm />
          <p className="text-center text-sm text-muted">
            Ya recuerdas tu contrasena?{" "}
            <Link className="font-semibold text-brand-700" href="/login">
              Volver al login
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}
