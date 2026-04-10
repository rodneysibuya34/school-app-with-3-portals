import { NextResponse } from "next/server";
import { getHomework, addHomework, deleteHomework } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const data = await getHomework(school);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching homework:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch homework" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addHomework(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error creating homework:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create homework" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteHomework(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting homework:", error);
    return NextResponse.json({ error: "Failed to delete homework" }, { status: 500 });
  }
}