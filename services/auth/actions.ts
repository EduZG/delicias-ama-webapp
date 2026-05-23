"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createFieldErrorState,
  sanitizeLongText,
  sanitizeText,
  validatePassword,
  type ActionState,
} from "@/lib/validation";
import { isEmail } from "@/lib/validation";

function missingSupabaseState(): ActionState {
  return {
    status: "error",
    message:
      "Supabase no esta configurado. Completa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  };
}

export async function loginAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = sanitizeText(formData.get("email"), 254).toLowerCase();
  const password = sanitizeText(formData.get("password"), 128);
  const fieldErrors: Record<string, string> = {};

  if (!isEmail(email)) {
    fieldErrors.email = "Introduce un email valido.";
  }

  if (!password) {
    fieldErrors.password = "Introduce tu contrasena.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return createFieldErrorState(fieldErrors);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingSupabaseState();
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: "No hemos podido iniciar sesion con esos datos.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/account?message=Sesion iniciada&type=success");
}

export async function registerAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = sanitizeText(formData.get("fullName"), 120);
  const email = sanitizeText(formData.get("email"), 254).toLowerCase();
  const password = sanitizeText(formData.get("password"), 128);
  const fieldErrors: Record<string, string> = {};
  const passwordError = validatePassword(password);

  if (!fullName) {
    fieldErrors.fullName = "Introduce tu nombre.";
  }

  if (!isEmail(email)) {
    fieldErrors.email = "Introduce un email valido.";
  }

  if (passwordError) {
    fieldErrors.password = passwordError;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return createFieldErrorState(fieldErrors);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingSupabaseState();
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      message: "No hemos podido crear la cuenta.",
    };
  }

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
      role: "customer",
    });
  }

  revalidatePath("/", "layout");
  redirect("/account?message=Cuenta creada&type=success");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/login?message=Sesion cerrada&type=success");
}

export async function requestPasswordResetAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = sanitizeText(formData.get("email"), 254).toLowerCase();

  if (!isEmail(email)) {
    return createFieldErrorState({
      email: "Introduce un email valido.",
    });
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingSupabaseState();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/login?message=Ya puedes actualizar tu contrasena&type=success`,
  });

  if (error) {
    return {
      status: "error",
      message: "No hemos podido enviar el email de recuperacion.",
    };
  }

  return {
    status: "success",
    message: "Si el email existe, recibiras instrucciones para recuperar acceso.",
  };
}

export async function updateProfileAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = sanitizeText(formData.get("fullName"), 120);
  const phone = sanitizeText(formData.get("phone"), 24);
  const defaultAddress = sanitizeLongText(formData.get("defaultAddress"), 240);
  const fieldErrors: Record<string, string> = {};

  if (!fullName) {
    fieldErrors.fullName = "Introduce tu nombre.";
  }

  if (phone && !/^[+()\d\s-]{7,24}$/.test(phone)) {
    fieldErrors.phone = "Introduce un telefono valido.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return createFieldErrorState(fieldErrors);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingSupabaseState();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Inicia sesion para continuar&type=error");
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    phone: phone || null,
    default_address: defaultAddress || null,
  });

  if (error) {
    return {
      status: "error",
      message: "No hemos podido guardar tu perfil.",
    };
  }

  revalidatePath("/account");

  return {
    status: "success",
    message: "Perfil actualizado.",
  };
}
