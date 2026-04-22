import { NextResponse } from "next/server";
import { getStudyMaterials, addStudyMaterial, deleteStudyMaterial } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const data = await getStudyMaterials(school);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching study materials:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch study materials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addStudyMaterial(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error creating study material:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create study material" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteStudyMaterial(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting study material:", error);
    return NextResponse.json({ error: "Failed to delete study material" }, { status: 500 });
  }
}