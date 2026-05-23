"use client";

import { useActionState } from "react";
import { createOrderAction } from "@/services/orders/actions";
import { initialActionState } from "@/lib/validation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Profile } from "@/types/profile";

type CheckoutFormProps = {
  email?: string;
  profile: Profile | null;
};

export function CheckoutForm({ email, profile }: CheckoutFormProps) {
  const [state, formAction] = useActionState(
    createOrderAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {state.message}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          defaultValue={profile?.fullName ?? ""}
          error={state.fieldErrors?.customerName}
          label="Nombre"
          name="customerName"
          placeholder="Tu nombre"
        />
        <FormField
          defaultValue={profile?.phone ?? ""}
          error={state.fieldErrors?.customerPhone}
          label="Telefono"
          name="customerPhone"
          placeholder="+34"
        />
      </div>
      <FormField
        defaultValue={email ?? ""}
        disabled
        label="Email de cuenta"
        name="email"
        type="email"
      />
      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-medium text-ink-700">
          Metodo de entrega
        </legend>
        <label className="flex items-center gap-3 rounded-md border border-border bg-white px-3 py-3 text-sm font-medium text-ink-700">
          <input defaultChecked name="deliveryMethod" type="radio" value="pickup" />
          Recogida
        </label>
        <label className="flex items-center gap-3 rounded-md border border-border bg-white px-3 py-3 text-sm font-medium text-ink-700">
          <input name="deliveryMethod" type="radio" value="delivery" />
          Entrega
        </label>
        {state.fieldErrors?.deliveryMethod ? (
          <p className="text-sm font-medium text-red-700 sm:col-span-2">
            {state.fieldErrors.deliveryMethod}
          </p>
        ) : null}
      </fieldset>
      <FormField
        as="textarea"
        defaultValue={profile?.defaultAddress ?? ""}
        error={state.fieldErrors?.deliveryAddress}
        label="Direccion o notas de recogida"
        name="deliveryAddress"
        placeholder="Direccion, portal, hora aproximada..."
      />
      <FormField
        as="textarea"
        label="Notas para cocina"
        name="notes"
        placeholder="Sin cebolla, punto picante, hora de recogida..."
      />
      <SubmitButton loadingLabel="Creando pedido...">
        Confirmar pedido
      </SubmitButton>
    </form>
  );
}
