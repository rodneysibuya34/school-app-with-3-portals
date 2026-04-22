import { NextResponse } from "next/server";
import { getExamTimetable, addExamTimetable, deleteExamTimetable } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const data = await getExamTimetable(school);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching exam timetable:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch exam timetable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addExamTimetable(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error creating exam timetable:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create exam timetable" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteExamTimetable(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting exam timetable:", error);
    return NextResponse.json({ error: "Failed to delete exam timetable" }, { status: 500 });
  }
}