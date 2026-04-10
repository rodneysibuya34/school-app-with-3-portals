import { NextResponse } from "next/server";
import { getExamTimetable, addExamTimetable, deleteExamTimetable } from "@/actions/content-actions";

export async function GET() {
  try {
    const data = await getExamTimetable();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching exam timetable:", error);
    return NextResponse.json({ error: "Failed to fetch exam timetable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addExamTimetable(body);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating exam timetable:", error);
    return NextResponse.json({ error: "Failed to create exam timetable" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteExamTimetable(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting exam timetable:", error);
    return NextResponse.json({ error: "Failed to delete exam timetable" }, { status: 500 });
  }
}