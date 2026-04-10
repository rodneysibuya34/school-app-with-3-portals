import { NextResponse } from "next/server";
import { getStudents, addStudent, updateStudent, deleteStudent, loginStudent } from "@/actions/db-actions";

export async function GET() {
  try {
    const students = await getStudents();
    return NextResponse.json(students);
  } catch (error: any) {
    console.error("Error fetching students:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.type === "login") {
      const result = await loginStudent(body.username, body.password);
      return NextResponse.json(result);
    }
    
    const student = await addStudent(body);
    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Error creating student:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    await updateStudent(id, data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating student:", error);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteStudent(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}