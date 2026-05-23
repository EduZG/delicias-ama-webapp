import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?message=Inicia sesion para continuar&type=error");
  }

  return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, phone, default_address, role, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    fullName: data.full_name ?? undefined,
    phone: data.phone ?? undefined,
    defaultAddress: data.default_address ?? undefined,
    role: data.role,
    createdAt: data.created_at,
  };
}

export async function requireAdmin() {
  const user = await requireUser();
  const profile = await getProfile(user.id);

  if (profile?.role !== "admin") {
    redirect("/account?message=No tienes acceso al panel admin&type=error");
  }

  return { profile, user };
}
