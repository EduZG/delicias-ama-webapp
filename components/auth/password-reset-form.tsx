"use client";

import { useActionState } from "react";
import { requestPasswordResetAction } from "@/services/auth/actions";
import { initialActionState } from "@/lib/validation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";

export function PasswordResetForm() {
  const [state, formAction] = useActionState(
    requestPasswordResetAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.message ? (
        <p className="rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-ink-700">
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
      <SubmitButton loadingLabel="Enviando...">
        Enviar instrucciones
      </SubmitButton>
    </form>
  );
}
