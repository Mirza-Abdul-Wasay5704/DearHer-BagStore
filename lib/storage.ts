// lib/storage.ts — Image upload via Cloudinary API route (FREE: 25GB storage + 25GB bandwidth/month)

const UPLOAD_TIMEOUT_MS = 60_000; // 60 seconds for the whole batch

/**
 * Upload multiple product images via the /api/upload route (Cloudinary)
 * Images are compressed + optimized server-side by Cloudinary automatically.
 * @returns Array of CDN URLs
 */
export async function uploadProductImages(
  files: File[],
  productSlug: string
): Promise<string[]> {
  if (!files.length) return [];

  console.log(`[Storage] Uploading ${files.length} files for slug: ${productSlug}`);
  files.forEach((f, i) => console.log(`[Storage] File ${i}: ${f.name} (${(f.size/1024).toFixed(1)} KB, type: ${f.type})`));

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("folder", productSlug);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

  try {
    console.log("[Storage] Calling /api/upload...");
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    console.log("[Storage] Response status:", res.status);
    const data = await res.json();
    console.log("[Storage] Response data:", data);

    if (!res.ok) {
      throw new Error(data.error || `Upload failed (${res.status})`);
    }

    return data.urls as string[];
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Upload timed out. Try smaller images or fewer at once.");
    }
    const msg = error instanceof Error ? error.message : "Upload failed";
    throw new Error(msg);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Delete an image — with Cloudinary, images are managed via dashboard.
 * This is a no-op for now since Cloudinary free tier handles cleanup.
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  // Cloudinary images can be managed via their dashboard
  console.log("Image deletion requested for:", imageUrl);
}
