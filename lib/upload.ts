import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure upload directories exist
async function ensureDirectories() {
  const dirs = [
    path.join(UPLOAD_DIR, "projects"),
    path.join(UPLOAD_DIR, "team"),
    path.join(UPLOAD_DIR, "gallery"),
    path.join(UPLOAD_DIR, "news"),
    path.join(UPLOAD_DIR, "banner"),
  ];
  
  for (const dir of dirs) {
    try {
      await mkdir(dir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }
}

export async function uploadImage(
  file: File,
  category: "projects" | "team" | "gallery" | "news" | "banner"
): Promise<string> {
  await ensureDirectories();
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filename = `${timestamp}-${originalName}`;
  const filepath = path.join(UPLOAD_DIR, category, filename);
  
  await writeFile(filepath, buffer);
  
  return `/uploads/${category}/${filename}`;
}

export function deleteImage(imagePath: string): void {
  const fs = require("fs");
  const fullPath = path.join(process.cwd(), "public", imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
