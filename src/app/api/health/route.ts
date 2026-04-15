import { NextResponse } from "next/server";

export async function GET() {
  const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  const db = require("@/db/redis");
  
  let dataCount = { schools: 0, teachers: 0, students: 0, homework: 0, tests: 0 };
  
  try {
    const data = await db.getData();
    dataCount = {
      schools: data.schools?.length || 0,
      teachers: data.teachers?.length || 0,
      students: data.students?.length || 0,
      homework: data.homework?.length || 0,
      tests: data.tests?.length || 0
    };
  } catch (e) {
    console.error("Error getting data:", e);
  }
  
  return NextResponse.json({
    redisConfigured: hasRedis,
    dataCount
  });
}