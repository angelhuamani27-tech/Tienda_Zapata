create table if not exists public.products (
  id uuid primary key,
  name text not null check (char_length(name) between 1 and 100),
  description text not null check (char_length(description) between 1 and 1000),
  price numeric(10,2) not null check (price > 0),
  image_path text not null,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "public can read products" on public.products for select using (true);
create policy "authenticated admin can insert" on public.products for insert to authenticated with check (true);
create policy "authenticated admin can delete" on public.products for delete to authenticated using (true);
