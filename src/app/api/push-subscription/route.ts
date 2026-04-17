import { NextResponse } from "next/server";
import { getPushSubscriptions, addPushSubscription, removePushSubscription } from "@/actions/db-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userType = searchParams.get('userType');

    if (!userId || !userType) {
      return NextResponse.json({ error: "userId and userType required" }, { status: 400 });
    }

    const subscriptions = await getPushSubscriptions(userId, userType);
    return NextResponse.json(subscriptions);
  } catch (error: any) {
    console.error("Error fetching push subscriptions:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subscription = await addPushSubscription(body);
    return NextResponse.json(subscription);
  } catch (error: any) {
    console.error("Error creating push subscription:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, userType } = await request.json();
    await removePushSubscription(userId, userType);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting push subscription:", error);
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 });
  }
}