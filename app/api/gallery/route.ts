import { NextRequest, NextResponse } from "next/server";
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    
    let images = getGalleryImages();
    
    // Jeśli podano projectId, filtruj zdjęcia
    if (projectId) {
      images = images.filter((img) => img.projectId === projectId);
    }
    
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as string;
    const projectId = formData.get("projectId") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!alt || !category || !imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const imagePath = await uploadImage(imageFile, "gallery");

    const image = createGalleryImage({
      src: imagePath,
      alt,
      category,
      projectId: projectId || undefined,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create gallery image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing image ID" }, { status: 400 });
    }

    const image = getGalleryImages().find((img) => img.id === id);
    if (image?.src) {
      deleteImage(image.src);
    }

    const deleted = deleteGalleryImage(id);
    if (!deleted) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
