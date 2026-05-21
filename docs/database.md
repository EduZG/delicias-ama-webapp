# Database Schema — Delicias de la ama

## Descripción

Base de datos principal para la web app de pedidos online de Delicias de la ama.

### Tecnologías
- PostgreSQL
- Supabase
- Supabase Auth

### Objetivos
- Gestionar usuarios
- Gestionar pedidos
- Mantener historial de compras
- Gestionar catálogo
- Escalar fácilmente en el futuro

---

# Tabla: profiles

Información de perfil de usuario.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text,

  phone text,

  default_address text,

  role text default 'customer',

  created_at timestamp with time zone default now()
);
```

---

# Tabla: products

Productos disponibles en el catálogo.

```sql
create table products (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  slug text unique not null,

  description text,

  price numeric(10,2) not null,

  image_url text,

  category text,

  is_active boolean default true,

  is_featured boolean default false,

  created_at timestamp with time zone default now()
);
```

---

# Tabla: orders

Pedidos realizados por clientes.

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references auth.users(id),

  customer_name text not null,

  customer_phone text not null,

  delivery_method text not null,

  delivery_address text,

  status text not null default 'recibido',

  subtotal numeric(10,2) not null,

  total_amount numeric(10,2) not null,

  payment_status text default 'pending',

  payment_provider text,

  notes text,

  created_at timestamp with time zone default now()
);
```

---

# Tabla: order_items

Productos individuales dentro de cada pedido.

```sql
create table order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid references orders(id) on delete cascade,

  product_id uuid references products(id),

  product_name text not null,

  quantity integer not null,

  unit_price numeric(10,2) not null,

  total_price numeric(10,2) not null
);
```

---

# Tabla: addresses

Direcciones guardadas por usuarios.

```sql
create table addresses (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references auth.users(id) on delete cascade,

  label text,

  address_line text not null,

  city text,

  postal_code text,

  created_at timestamp with time zone default now()
);
```

---

# Estados de pedido

```txt
recibido
preparando
horneando
listo
entregado
cancelado
```

---

# Roles de usuario

```txt
customer
admin
kitchen
```

---

# Relaciones

## Usuario → Pedidos
Un usuario puede tener muchos pedidos.

## Pedido → Productos
Un pedido contiene múltiples productos.

## Usuario → Direcciones
Un usuario puede guardar múltiples direcciones.

---

# Seguridad (Row Level Security)

## Activar RLS

```sql
alter table profiles enable row level security;

alter table products enable row level security;

alter table orders enable row level security;

alter table order_items enable row level security;

alter table addresses enable row level security;
```

---

# Policies

## Perfil: ver propio perfil

```sql
create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);
```

---

## Perfil: editar propio perfil

```sql
create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);
```

---

## Pedidos: ver propios pedidos

```sql
create policy "Users can view own orders"
on orders
for select
using (auth.uid() = user_id);
```

---

## Pedidos: crear pedidos

```sql
create policy "Users can create orders"
on orders
for insert
with check (auth.uid() = user_id);
```

---

## Order items: ver productos de pedidos propios

```sql
create policy "Users can view own order items"
on order_items
for select
using (
  exists (
    select 1
    from orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);
```

---

# Índices recomendados

```sql
create index idx_orders_user_id
on orders(user_id);

create index idx_orders_status
on orders(status);

create index idx_order_items_order_id
on order_items(order_id);

create index idx_products_slug
on products(slug);
```

---

# Funcionalidades soportadas

## Usuarios
- Registro
- Login
- Perfil
- Historial de pedidos

## Pedidos
- Crear pedido
- Cambiar estado
- Consultar historial
- Repetir pedidos

## Admin
- Gestión de pedidos
- Gestión de productos
- Panel de cocina

---

# Mejoras futuras

## Sistema de cupones

```txt
discounts
```

## Fidelización

```txt
reward_points
```

## Repartidores

```txt
drivers
```

## Inventario

```txt
stock_movements
```

---

# Stack relacionado

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend
- Supabase
- PostgreSQL

## Hosting
- Vercel

## Pagos
- Stripe

