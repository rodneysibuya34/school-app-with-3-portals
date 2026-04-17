import { NextResponse } from "next/server";
import { getNotifications } from "@/actions/db-actions";

export async function GET() {
  const allEnvVars = Object.keys(process.env).filter(key =>
    key.includes('REDIS') || key.includes('UPSTASH')
  );

  try {
    // Test notification function
    const notifications = await getNotifications("1", "student");
    return NextResponse.json({
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? "SET" : "NOT SET",
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "NOT SET",
      allRedisVars: allEnvVars,
      envValues: {
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL?.substring(0, 30) + "...",
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN?.substring(0, 30) + "..."
      },
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      notificationsTest: notifications
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}