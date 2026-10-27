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
create table if not exists public.app_admins (user_id uuid primary key references auth.users(id));
alter table public.app_admins enable row level security;
create policy "admin can read own membership" on public.app_admins for select to authenticated
  using (user_id = auth.uid());
create policy "only admin can insert" on public.products for insert to authenticated
  with check (exists (select 1 from public.app_admins where user_id = auth.uid()));
create policy "only admin can delete" on public.products for delete to authenticated
  using (exists (select 1 from public.app_admins where user_id = auth.uid()));
