"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/services/auth/actions";
import { initialActionState } from "@/lib/validation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialActionState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {state.message}
        </p>
      ) : null}
      <FormField
        autoComplete="email"
        error={state.fieldErrors?.email}
        label="Email"
        name="email"
        placeholder="email@dominio.com"
        type="email"
      />
      <FormField
        autoComplete="current-password"
        error={state.fieldErrors?.password}
        label="Contrasena"
        name="password"
        placeholder="Minimo 8 caracteres"
        type="password"
      />
      <SubmitButton loadingLabel="Entrando...">Entrar</SubmitButton>
      <div className="space-y-2 text-center text-sm text-muted">
        <p>
          No tienes cuenta?{" "}
          <Link className="font-semibold text-brand-700" href="/register">
            Crear cuenta
          </Link>
        </p>
        <Link className="font-semibold text-ink-700" href="/forgot-password">
          He olvidado mi contrasena
        </Link>
      </div>
    </form>
  );
}
