import { supabase } from './supabase';

// Article images live in Supabase Storage, not in the repo — editors upload
// from the admin editor and the article stores only the resulting public URL.
export const ARTICLE_IMAGE_BUCKET = 'article-images';

const MAX_BYTES = 10 * 1024 * 1024;

/** Uploads one image and returns its public URL. Throws with a message fit to show. */
export async function uploadArticleImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured');
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image`);
  if (file.size > MAX_BYTES) throw new Error('Images must be smaller than 10 MB');

  const ext = (file.name.split('.').pop() ?? 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
  // Random suffix so two editors uploading "figure1.png" never collide.
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(ARTICLE_IMAGE_BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) {
    // The bucket is created by supabase-article-images-storage.sql; say so
    // rather than surfacing a bare "Bucket not found".
    if (/bucket/i.test(error.message)) {
      throw new Error(`Storage bucket "${ARTICLE_IMAGE_BUCKET}" is missing — run supabase-article-images-storage.sql`);
    }
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Pulls image files out of a paste or drop, ignoring anything else carried along. */
export function imageFilesFrom(list: FileList | DataTransferItemList | null): File[] {
  if (!list) return [];
  const files: File[] = [];
  for (let i = 0; i < list.length; i++) {
    const entry: any = list[i];
    const file: File | null = typeof entry.getAsFile === 'function' ? entry.getAsFile() : entry;
    if (file && file.type?.startsWith('image/')) files.push(file);
  }
  return files;
}
