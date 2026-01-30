import { NextRequest, NextResponse } from "next/server";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as "aktywny" | "planowany" | "zakończony";
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "projects");
    }

    const project = createProject({
      title,
      description,
      status,
      image: imagePath,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as "aktywny" | "planowany" | "zakończony";
    const imageFile = formData.get("image") as File | null;
    const deleteImageFlag = formData.get("deleteImage") === "true";

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const updates: any = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (status) updates.status = status;

    if (deleteImageFlag) {
      const project = getProjects().find((p) => p.id === id);
      if (project?.image) {
        deleteImage(project.image);
      }
      updates.image = undefined;
    } else if (imageFile && imageFile.size > 0) {
      const project = getProjects().find((p) => p.id === id);
      if (project?.image) {
        deleteImage(project.image);
      }
      updates.image = await uploadImage(imageFile, "projects");
    }

    const updated = updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
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
    reorderProjects(order);
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const project = getProjects().find((p) => p.id === id);
    if (project?.image) {
      deleteImage(project.image);
    }

    const deleted = deleteProject(id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
