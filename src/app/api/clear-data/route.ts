import { NextResponse } from "next/server";
import * as db from "@/db/redis";

export async function POST(request: Request) {
  try {
    // Clear all data from Redis
    await db.clearAllData();

    return NextResponse.json({
      success: true,
      message: "Database cleared successfully - all test data removed",
      cleared: {
        schools: "all",
        teachers: "all",
        students: "all",
        homework: "all",
        tests: "all",
        studyMaterials: "all",
        examTimetable: "all",
        weeklyTimetable: "all",
        announcements: "all",
        courses: "all",
        chat: "all",
        notifications: "all",
        pushSubscriptions: "all"
      },
      note: "Database is now ready for schools to start fresh"
    });
  } catch (error: any) {
    console.error("Error clearing data:", error);
    return NextResponse.json({ error: "Failed to clear data" }, { status: 500 });
  }
}