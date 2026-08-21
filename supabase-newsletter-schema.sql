-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Adds the newsletter feature: a table for metadata + a storage bucket for the PDFs.

-- 1. Create the newsletters table
CREATE TABLE newsletters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  issue TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes INTEGER NOT NULL DEFAULT 0,
  original_size_bytes INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_newsletters_slug ON newsletters(slug);
CREATE INDEX idx_newsletters_published ON newsletters(published);
CREATE INDEX idx_newsletters_created_at ON newsletters(created_at DESC);

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published newsletters"
  ON newsletters FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can read all newsletters"
  ON newsletters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert newsletters"
  ON newsletters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update newsletters"
  ON newsletters FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete newsletters"
  ON newsletters FOR DELETE
  TO authenticated
  USING (true);

CREATE TRIGGER newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 2. Create a public storage bucket for the PDF files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('newsletters', 'newsletters', true, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies: public read, authenticated write
CREATE POLICY "Public can read newsletter PDFs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'newsletters');

CREATE POLICY "Authenticated users can upload newsletter PDFs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'newsletters');

CREATE POLICY "Authenticated users can update newsletter PDFs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'newsletters')
  WITH CHECK (bucket_id = 'newsletters');

CREATE POLICY "Authenticated users can delete newsletter PDFs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'newsletters');
