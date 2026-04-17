import { NextResponse } from "next/server";

export async function GET() {
  const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  const db = require("@/db/redis");

  console.log("Health check - Redis configured:", hasRedis);
  console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL ? process.env.UPSTASH_REDIS_REST_URL.substring(0, 20) + "..." : "NOT SET");
  console.log("Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN ? process.env.UPSTASH_REDIS_REST_TOKEN.substring(0, 20) + "..." : "NOT SET");

  let dataCount = { schools: 0, teachers: 0, students: 0, homework: 0, tests: 0 };
  let redisConnection = "unknown";
  let error = null;
  let redisClient = null;

  try {
    // Test Redis client creation
    const client = db.getClient ? db.getClient() : null;
    redisClient = !!client;

    const data = await db.getData();
    redisConnection = "connected";
    dataCount = {
      schools: data.schools?.length || 0,
      teachers: data.teachers?.length || 0,
      students: data.students?.length || 0,
      homework: data.homework?.length || 0,
      tests: data.tests?.length || 0
    };
    console.log("Redis data loaded successfully:", dataCount);
  } catch (e) {
    redisConnection = "failed";
    error = e instanceof Error ? e.message : String(e);
    console.error("Redis connection error:", e instanceof Error ? e.message : String(e));
  }

  return NextResponse.json({
    redisConfigured: hasRedis,
    redisClient,
    redisConnection,
    dataCount,
    error,
    envVars: {
      url: !!process.env.UPSTASH_REDIS_REST_URL,
      token: !!process.env.UPSTASH_REDIS_REST_TOKEN
    }
  });
}