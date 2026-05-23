export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialActionState: ActionState = {
  status: "idle",
};

export function sanitizeText(value: FormDataEntryValue | null, maxLength = 160) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function sanitizeLongText(
  value: FormDataEntryValue | null,
  maxLength = 500,
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/[<>]/g, "").slice(0, maxLength);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validatePassword(value: string) {
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  return null;
}

export function validatePhone(value: string) {
  if (!/^[+()\d\s-]{7,24}$/.test(value)) {
    return "Introduce un teléfono válido.";
  }

  return null;
}

export function createFieldErrorState(
  fieldErrors: Record<string, string>,
  message = "Revisa los campos marcados.",
): ActionState {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}
