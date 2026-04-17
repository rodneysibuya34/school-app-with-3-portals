import { NextResponse } from "next/server";

export async function GET() {
  const allEnvVars = Object.keys(process.env).filter(key =>
    key.includes('REDIS') || key.includes('UPSTASH')
  );

  return NextResponse.json({
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? "SET" : "NOT SET",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "NOT SET",
    allRedisVars: allEnvVars,
    envValues: {
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL?.substring(0, 30) + "...",
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN?.substring(0, 30) + "..."
    },
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}