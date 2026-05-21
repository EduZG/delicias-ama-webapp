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

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Estructura

- `app/`: rutas, layouts y páginas con App Router.
- `components/`: componentes reutilizables de layout, UI y catálogo.
- `lib/`: utilidades, clientes externos, configuración de dominio y datos base.
- `services/`: capa de acceso a datos preparada para Supabase.
- `hooks/`: hooks de cliente.
- `types/`: tipos compartidos de dominio y base de datos.
- `docs/`: roadmap y esquema de base de datos.
