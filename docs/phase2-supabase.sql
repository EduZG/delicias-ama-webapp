-- Phase 2 Supabase setup for Delicias de la ama.
-- Run this in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  default_address text,
  role text not null default 'customer'
    check (role in ('customer', 'admin', 'kitchen')),
  created_at timestamp with time zone not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  category text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamp with time zone not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  delivery_method text not null check (delivery_method in ('pickup', 'delivery')),
  delivery_address text,
  status text not null default 'recibido'
    check (status in ('recibido', 'preparando', 'horneando', 'listo', 'entregado', 'cancelado')),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  total_amount numeric(10,2) not null check (total_amount >= 0),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_provider text,
  notes text,
  created_at timestamp with time zone not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0),
  total_price numeric(10,2) not null check (total_price >= 0)
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  address_line text not null,
  city text,
  postal_code text,
  created_at timestamp with time zone not null default now()
);

create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_products_slug on products(slug);

alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table addresses enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  );
$$;

drop policy if exists "Profiles are visible to owner or admin" on profiles;
create policy "Profiles are visible to owner or admin"
on profiles
for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "Public can view active products" on products;
create policy "Public can view active products"
on products
for select
using (is_active = true or public.is_admin());

drop policy if exists "Admins manage products" on products;
create policy "Admins manage products"
on products
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users and admins can view orders" on orders;
create policy "Users and admins can view orders"
on orders
for select
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users can create own orders" on orders;
create policy "Users can create own orders"
on orders
for insert
with check (auth.uid() = user_id);

drop policy if exists "Admins can update orders" on orders;
create policy "Admins can update orders"
on orders
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users and admins can view order items" on order_items;
create policy "Users and admins can view order items"
on order_items
for select
using (
  public.is_admin()
  or exists (
    select 1
    from orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "Users can create items for own orders" on order_items;
create policy "Users can create items for own orders"
on order_items
for insert
with check (
  exists (
    select 1
    from orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "Users can manage own addresses" on addresses;
create policy "Users can manage own addresses"
on addresses
for all
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());
