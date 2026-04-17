import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? "SET" : "NOT SET",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}