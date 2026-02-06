// app/api/upload/route.ts — Cloudinary image upload API (FREE tier: 25GB storage, 25GB bandwidth/month)
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

// Increase body size limit for image uploads
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    console.log("[Upload API] Request received");

    const formData = await request.formData();
    const rawFiles = formData.getAll("files");
    const folder = (formData.get("folder") as string) || "products";

    console.log("[Upload API] Raw files count:", rawFiles.length);
    console.log("[Upload API] Folder:", folder);

    // Filter to only actual File/Blob objects with content
    const files = rawFiles.filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    console.log("[Upload API] Valid files count:", files.length);

    if (files.length === 0) {
      console.log("[Upload API] No valid files found. Raw entries:", rawFiles.map(f => ({
        type: typeof f,
        isFile: f instanceof File,
        size: f instanceof File ? f.size : "N/A",
        name: f instanceof File ? f.name : String(f),
      })));
      return NextResponse.json({ error: "No valid image files provided" }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local" },
        { status: 500 }
      );
    }

    const urls: string[] = [];

    for (const file of files) {
      console.log(`[Upload API] Uploading: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `dearher/${folder}`,
            resource_type: "image",
            quality: "auto:good",
            fetch_format: "auto",
            transformation: [{ width: 1200, height: 1600, crop: "limit" }],
          },
          (error, result) => {
            if (error) {
              console.error("[Upload API] Cloudinary error:", error.message);
              reject(new Error(error.message));
            } else {
              console.log("[Upload API] Uploaded:", result!.secure_url);
              resolve(result!.secure_url);
            }
          }
        );
        stream.end(buffer);
      });

      urls.push(url);
    }

    console.log("[Upload API] All uploads complete. URLs:", urls.length);
    return NextResponse.json({ urls });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("[Upload API] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
