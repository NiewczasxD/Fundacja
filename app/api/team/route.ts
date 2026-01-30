import { NextRequest, NextResponse } from "next/server";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET() {
  try {
    const members = getTeamMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "team");
    }

    const member = createTeamMember({
      name,
      position,
      image: imagePath,
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const imageFile = formData.get("image") as File | null;
    const deleteImageFlag = formData.get("deleteImage") === "true";

    if (!id) {
      return NextResponse.json({ error: "Missing member ID" }, { status: 400 });
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (position) updates.position = position;

    if (deleteImageFlag) {
      const member = getTeamMembers().find((m) => m.id === id);
      if (member?.image) {
        deleteImage(member.image);
      }
      updates.image = undefined;
    } else if (imageFile && imageFile.size > 0) {
      const member = getTeamMembers().find((m) => m.id === id);
      if (member?.image) {
        deleteImage(member.image);
      }
      updates.image = await uploadImage(imageFile, "team");
    }

    const updated = updateTeamMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing member ID" }, { status: 400 });
    }

    const member = getTeamMembers().find((m) => m.id === id);
    if (member?.image) {
      deleteImage(member.image);
    }

    const deleted = deleteTeamMember(id);
    if (!deleted) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
