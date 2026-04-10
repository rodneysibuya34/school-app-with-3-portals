import { NextResponse } from "next/server";
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from "@/actions/content-actions";

export async function GET() {
  try {
    const data = await getAnnouncements();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching announcements:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addAnnouncement(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteAnnouncement(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}