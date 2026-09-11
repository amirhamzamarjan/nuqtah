import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Uploads an image file to Supabase Storage if configured,
 * or converts to a local base64 Data URL for instant offline/standalone preview.
 */
export async function uploadImageFile(
  file: File,
  folder: string = 'products'
): Promise<string> {
  // 1. If Supabase Storage is available, attempt cloud upload
  if (isSupabaseConfigured && supabase) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('nuqtah-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('nuqtah-media')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('Supabase storage upload failed or bucket missing, falling back to base64 Data URL:', err);
    }
  }

  // 2. High-fidelity FileReader fallback (Data URL)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
