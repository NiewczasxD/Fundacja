import { NextRequest, NextResponse } from "next/server";
import { getBanners, createBanner, deleteBanner } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET() {
  try {
    const banners = getBanners();
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { error: "Missing or empty image file" },
        { status: 400 }
      );
    }

    const src = await uploadImage(imageFile, "banner");
    const banners = getBanners();
    const order = banners.length;

    const banner = createBanner({ src, order });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing banner ID" }, { status: 400 });
    }

    const banner = getBanners().find((b) => b.id === id);
    if (banner?.src) {
      deleteImage(banner.src);
    }

    const deleted = deleteBanner(id);
    if (!deleted) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
