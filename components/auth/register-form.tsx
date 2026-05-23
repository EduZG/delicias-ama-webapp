"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/services/auth/actions";
import { initialActionState } from "@/lib/validation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialActionState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {state.message}
        </p>
      ) : null}
      <FormField
        autoComplete="name"
        error={state.fieldErrors?.fullName}
        label="Nombre completo"
        name="fullName"
        placeholder="Tu nombre"
      />
      <FormField
        autoComplete="email"
        error={state.fieldErrors?.email}
        label="Email"
        name="email"
        placeholder="email@dominio.com"
        type="email"
      />
      <FormField
        autoComplete="new-password"
        error={state.fieldErrors?.password}
        label="Contrasena"
        name="password"
        placeholder="Minimo 8 caracteres"
        type="password"
      />
      <SubmitButton loadingLabel="Creando cuenta...">Registrarme</SubmitButton>
      <p className="text-center text-sm text-muted">
        Ya tienes cuenta?{" "}
        <Link className="font-semibold text-brand-700" href="/login">
          Iniciar sesion
        </Link>
      </p>
    </form>
  );
}
