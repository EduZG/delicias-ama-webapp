"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/services/auth/actions";
import { initialActionState } from "@/lib/validation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Profile } from "@/types/profile";

type ProfileFormProps = {
  email?: string;
  profile: Profile | null;
};

export function ProfileForm({ email, profile }: ProfileFormProps) {
  const [state, formAction] = useActionState(
    updateProfileAction,
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
        defaultValue={profile?.fullName ?? ""}
        error={state.fieldErrors?.fullName}
        label="Nombre completo"
        name="fullName"
        placeholder="Tu nombre"
      />
      <FormField
        defaultValue={email ?? ""}
        disabled
        label="Email"
        name="email"
        type="email"
      />
      <FormField
        defaultValue={profile?.phone ?? ""}
        error={state.fieldErrors?.phone}
        label="Telefono"
        name="phone"
        placeholder="+34"
      />
      <FormField
        as="textarea"
        defaultValue={profile?.defaultAddress ?? ""}
        label="Direccion favorita"
        name="defaultAddress"
        placeholder="Calle, numero, notas de entrega..."
      />
      <SubmitButton loadingLabel="Guardando...">Guardar perfil</SubmitButton>
    </form>
  );
}
