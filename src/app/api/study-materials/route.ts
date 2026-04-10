import { NextResponse } from "next/server";
import { getStudyMaterials, addStudyMaterial, deleteStudyMaterial } from "@/actions/content-actions";

export async function GET() {
  try {
    const data = await getStudyMaterials();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching study materials:", error);
    return NextResponse.json({ error: "Failed to fetch study materials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addStudyMaterial(body);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating study material:", error);
    return NextResponse.json({ error: "Failed to create study material" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteStudyMaterial(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting study material:", error);
    return NextResponse.json({ error: "Failed to delete study material" }, { status: 500 });
  }
}