import { NextResponse } from "next/server";
import { getChat, addChatMessage, deleteChatMessage, updateChatMessage } from "@/actions/content-actions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school") || undefined;
    const grade = searchParams.get("grade") ? parseInt(searchParams.get("grade")!) : undefined;
    const messages = await getChat(school, grade ? grade : undefined);
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("Error fetching chat:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await addChatMessage(body);
    return NextResponse.json(message);
  } catch (error: any) {
    console.error("Error creating chat message:", error);
    if (error.message?.includes("not configured")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to create chat message" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    await updateChatMessage(id, data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating chat message:", error);
    return NextResponse.json({ error: "Failed to update chat message" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteChatMessage(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting chat message:", error);
    return NextResponse.json({ error: "Failed to delete chat message" }, { status: 500 });
  }
}