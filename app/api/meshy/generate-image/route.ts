import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    auth();
  } catch {
    // Guest or demo session allowed
  }

  const apiKey = process.env.MESHY_API_KEY;

  try {
    const body = await req.json();
    const { prompt, style = "realistic", aspect_ratio } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Demo/simulated fallback if no valid Meshy key configured
    if (!apiKey || apiKey === "your_meshy_api_key_here" || apiKey === "demo") {
      const mockTaskId = `mock_img_${Date.now()}`;
      return NextResponse.json({ result: mockTaskId, isDemo: true });
    }

    // Official Meshy API v1 AI Image Generator
    const response = await fetch("https://api.meshy.ai/openapi/v1/ai-image-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        style: style || "realistic",
        ...(aspect_ratio ? { aspect_ratio } : {}),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || `Meshy API error (${response.status})` },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image generation request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
