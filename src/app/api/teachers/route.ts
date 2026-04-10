import { NextResponse } from "next/server";
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from "@/actions/db-actions";

export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json(teachers);
  } catch (error: any) {
    console.error("Error fetching teachers:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teacher = await addTeacher(body);
    return NextResponse.json(teacher);
  } catch (error: any) {
    console.error("Error creating teacher:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    await updateTeacher(id, data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating teacher:", error);
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteTeacher(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
  }
}