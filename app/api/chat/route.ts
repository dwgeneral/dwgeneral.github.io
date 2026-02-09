import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "消息不能为空" },
        { status: 400 }
      );
    }

    // TODO: Connect to OpenClaw API
    // This is where you'll integrate with your OpenClaw instance
    // The message will be forwarded to Feishu or Telegram

    // Example integration structure:
    /*
    // 1. Send to OpenClaw
    const openclawResponse = await fetch(process.env.OPENCLAW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENCLAW_API_KEY}`,
      },
      body: JSON.stringify({
        message,
        source: "website_chat",
        timestamp: new Date().toISOString(),
      }),
    });

    // 2. OpenClaw will handle forwarding to Feishu/Telegram
    */

    // For now, log the message
    console.log("Chat message received:", {
      message,
      history: history?.length || 0,
      timestamp: new Date().toISOString(),
    });

    // Return a placeholder response
    // In production, this will come from OpenClaw
    return NextResponse.json({
      reply: "消息已发送给 Ryan，他会尽快查看并回复你！",
      status: "delivered",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "发送失败，请稍后重试" },
      { status: 500 }
    );
  }
}
