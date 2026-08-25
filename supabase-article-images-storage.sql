-- Article images live in Supabase Storage so editors never have to commit
-- pictures to the repo. Run once against the project.

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

-- Anyone can read: the URLs are embedded in published articles.
drop policy if exists "Public read of article images" on storage.objects;
create policy "Public read of article images"
  on storage.objects for select
  using (bucket_id = 'article-images');

-- Only signed-in admins (the editor requires a session) can add or change them.
drop policy if exists "Authenticated upload of article images" on storage.objects;
create policy "Authenticated upload of article images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'article-images');

drop policy if exists "Authenticated update of article images" on storage.objects;
create policy "Authenticated update of article images"
  on storage.objects for update to authenticated
  using (bucket_id = 'article-images');

drop policy if exists "Authenticated delete of article images" on storage.objects;
create policy "Authenticated delete of article images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'article-images');
