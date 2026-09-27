import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    auth();
  } catch {
    // Guest or demo session allowed
  }

  const { taskId } = params;
  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  // Handle mock/demo simulation if running without live API key
  if (taskId.startsWith("mock_img_")) {
    const creationTime = parseInt(taskId.replace("mock_img_", ""), 10) || Date.now();
    const elapsedSeconds = (Date.now() - creationTime) / 1000;

    if (elapsedSeconds < 2.5) {
      return NextResponse.json({
        id: taskId,
        status: "IN_PROGRESS",
        progress: 25,
      });
    } else if (elapsedSeconds < 5) {
      return NextResponse.json({
        id: taskId,
        status: "IN_PROGRESS",
        progress: 75,
      });
    } else {
      return NextResponse.json({
        id: taskId,
        status: "SUCCEEDED",
        progress: 100,
        image_urls: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        ],
      });
    }
  }

  const apiKey = process.env.MESHY_API_KEY;
  if (!apiKey || apiKey === "your_meshy_api_key_here") {
    return NextResponse.json(
      { error: "MESHY_API_KEY is not configured" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.meshy.ai/openapi/v1/ai-image-generator/${taskId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || `Polling failed (${response.status})` },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to poll image task";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
