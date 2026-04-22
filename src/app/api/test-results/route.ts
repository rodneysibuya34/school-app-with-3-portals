import { NextResponse } from "next/server";
import { getTestResults, addTestResult } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const data = await getTestResults(school);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching test results:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch test results" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await addTestResult(body);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error saving test result:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to save test result" }, { status: 500 });
  }
}