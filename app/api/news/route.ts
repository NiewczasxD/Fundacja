import { NextRequest, NextResponse } from "next/server";
import {
  getNews,
  createNewsItem,
  updateNewsItem,
  deleteNewsItem,
  reorderNews,
} from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET() {
  try {
    const news = getNews();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !excerpt || !date || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "news");
    }

    const newsItem = createNewsItem({
      title,
      excerpt,
      content: content || undefined,
      date,
      slug,
      image: imagePath,
    });

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;
    const deleteImageFlag = formData.get("deleteImage") === "true";

    if (!id) {
      return NextResponse.json({ error: "Missing news ID" }, { status: 400 });
    }

    const updates: any = {};
    if (title) updates.title = title;
    if (excerpt) updates.excerpt = excerpt;
    if (content !== null) updates.content = content;
    if (date) updates.date = date;
    if (slug) updates.slug = slug;

    if (deleteImageFlag) {
      const newsItem = getNews().find((n) => n.id === id);
      if (newsItem?.image) {
        deleteImage(newsItem.image);
      }
      updates.image = undefined;
    } else if (imageFile && imageFile.size > 0) {
      const newsItem = getNews().find((n) => n.id === id);
      if (newsItem?.image) {
        deleteImage(newsItem.image);
      }
      updates.image = await uploadImage(imageFile, "news");
    }

    const updated = updateNewsItem(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update news item" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const order = body?.order;
    if (!Array.isArray(order) || order.some((x) => typeof x !== "string")) {
      return NextResponse.json(
        { error: "Body must be { order: string[] }" },
        { status: 400 }
      );
    }
    reorderNews(order);
    const news = getNews();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reorder news" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing news ID" }, { status: 400 });
    }

    const newsItem = getNews().find((n) => n.id === id);
    if (newsItem?.image) {
      deleteImage(newsItem.image);
    }

    const deleted = deleteNewsItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete news item" },
      { status: 500 }
    );
  }
}
