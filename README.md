# Delicias de la ama

Web app para street food premium, empezando con empanadas artesanales.

## Stack

- Next.js 15 con App Router
- TypeScript
- Tailwind CSS
- Supabase, PostgreSQL y Supabase Auth
- Stripe
- Vercel

## Desarrollo local

```bash
npm install
npm run dev
```

Crear un archivo `.env.local` a partir de `.env.example` antes de conectar
Supabase o Stripe.

Con Docker:

```bash
docker run -it --rm -p 3000:3000 -v "${PWD}:/app" -w /app node:24-alpine sh
npm install
npm run dev -- --hostname 0.0.0.0
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Fase 2: Supabase

1. Crear un proyecto en Supabase.
2. Copiar `.env.example` a `.env.local`.
3. Completar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Ejecutar el SQL de [docs/phase2-supabase.sql](docs/phase2-supabase.sql)
   en el SQL editor de Supabase.

La app puede arrancar sin credenciales para revisar UI, pero autenticacion,
perfil, checkout e historial necesitan Supabase configurado.

## Estructura

- `app/`: rutas, layouts y páginas con App Router.
- `components/`: componentes reutilizables de layout, UI y catálogo.
- `lib/`: utilidades, clientes externos, configuración de dominio y datos base.
- `services/`: capa de acceso a datos preparada para Supabase.
- `hooks/`: hooks de cliente.
- `types/`: tipos compartidos de dominio y base de datos.
- `docs/`: roadmap y esquema de base de datos.
