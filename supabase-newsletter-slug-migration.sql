-- Run this in the Supabase SQL Editor if you already created the `newsletters`
-- table from supabase-newsletter-schema.sql before it included a `slug` column.
-- Adds slug-based URLs (/newsletter/<slug>) to match how articles work.

ALTER TABLE newsletters ADD COLUMN IF NOT EXISTS slug TEXT;

-- Backfill existing rows with a slug derived from their title, disambiguating
-- duplicates by appending the row's short id.
UPDATE newsletters
SET slug = lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
    || '-' || left(id::text, 8)
WHERE slug IS NULL;

ALTER TABLE newsletters ALTER COLUMN slug SET NOT NULL;
ALTER TABLE newsletters ADD CONSTRAINT newsletters_slug_unique UNIQUE (slug);
CREATE INDEX IF NOT EXISTS idx_newsletters_slug ON newsletters(slug);
