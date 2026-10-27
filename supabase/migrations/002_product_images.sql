insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
create policy "public can read product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "only admin can upload product images" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and exists (select 1 from public.app_admins where user_id = auth.uid()));
create policy "only admin can delete product images" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and exists (select 1 from public.app_admins where user_id = auth.uid()));
