import { NextResponse } from "next/server";
import { getTests, addTest, updateTest, deleteTest } from "@/actions/content-actions";

export async function GET() {
  try {
    const data = await getTests();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching tests:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addTest(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error creating test:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create test" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    await updateTest(id, data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating test:", error);
    return NextResponse.json({ error: "Failed to update test" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteTest(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting test:", error);
    return NextResponse.json({ error: "Failed to delete test" }, { status: 500 });
  }
}