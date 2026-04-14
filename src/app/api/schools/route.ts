import { NextResponse } from "next/server";
import { getSchools, addSchool, updateSchool, deleteSchool } from "@/actions/db-actions";

export async function GET() {
  try {
    const schools = await getSchools();
    return NextResponse.json(schools);
  } catch (error: any) {
    console.error("Error fetching schools:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const school = await addSchool(body);
    return NextResponse.json(school);
  } catch (error) {
    console.error("Error creating school:", error);
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    await updateSchool(id, data);
    const schools = await getSchools();
    const updatedSchool = schools.find((s: any) => s.id === id);
    return NextResponse.json(updatedSchool || { success: true });
  } catch (error) {
    console.error("Error updating school:", error);
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteSchool(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting school:", error);
    return NextResponse.json({ error: "Failed to delete school" }, { status: 500 });
  }
}