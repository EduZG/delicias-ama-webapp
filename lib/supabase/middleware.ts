import { createServerClient } from "@supabase/ssr";
import type { SetAllCookies } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

const privatePathPrefixes = ["/account", "/checkout"];
const authPathPrefixes = ["/login", "/register"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!hasSupabaseEnv()) {
    return supabaseResponse;
  }

  const { supabaseAnonKey, supabaseUrl } = getSupabaseEnv();

  const supabase = createServerClient<Database, "public", any>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const isPrivatePath = privatePathPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthPath = authPathPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!user && isPrivatePath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("message", "Inicia sesion para continuar");
    url.searchParams.set("type", "error");

    return NextResponse.redirect(url);
  }

  if (user && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";

    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("message", "Inicia sesion para continuar");
      url.searchParams.set("type", "error");

      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/account";
      url.searchParams.set("message", "No tienes acceso al panel admin");
      url.searchParams.set("type", "error");

      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
