import { NextResponse } from "next/server";
import { getNotifications, addNotification, markNotificationAsRead, deleteNotification, getUnreadNotificationsCount } from "@/actions/db-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userType = searchParams.get('userType');
    const action = searchParams.get('action');

    if (!userId || !userType) {
      return NextResponse.json({ error: "userId and userType required" }, { status: 400 });
    }

    if (action === 'unread-count') {
      const count = await getUnreadNotificationsCount(userId, userType);
      return NextResponse.json({ count });
    }

    const notifications = await getNotifications(userId, userType);
    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const notification = await addNotification(body);
    return NextResponse.json(notification);
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, action } = await request.json();

    if (action === 'mark-read') {
      await markNotificationAsRead(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error updating notification:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteNotification(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}