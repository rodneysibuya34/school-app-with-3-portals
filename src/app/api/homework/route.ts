import { NextResponse } from "next/server";
import { getHomework, addHomework, deleteHomework } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const grade = searchParams.get("grade") ? parseInt(searchParams.get("grade")!) : undefined;
    const data = await getHomework(school, grade);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching homework:", error);
    return NextResponse.json({ error: "Failed to fetch homework" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addHomework(body);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating homework:", error);
    return NextResponse.json({ error: "Failed to create homework" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteHomework(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting homework:", error);
    return NextResponse.json({ error: "Failed to delete homework" }, { status: 500 });
  }
}