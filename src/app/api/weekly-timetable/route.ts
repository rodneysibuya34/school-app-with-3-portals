import { NextResponse } from "next/server";
import { getWeeklyTimetable, addWeeklyTimetable, deleteWeeklyTimetable } from "@/actions/content-actions";

export async function GET() {
  try {
    const data = await getWeeklyTimetable();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weekly timetable:", error);
    return NextResponse.json({ error: "Failed to fetch weekly timetable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addWeeklyTimetable(body);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating weekly timetable:", error);
    return NextResponse.json({ error: "Failed to create weekly timetable" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteWeeklyTimetable(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting weekly timetable:", error);
    return NextResponse.json({ error: "Failed to delete weekly timetable" }, { status: 500 });
  }
}