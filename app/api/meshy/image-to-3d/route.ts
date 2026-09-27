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
    const {
      image_url,
      ai_model = "meshy-7",
      enable_image_enhancement = true,
      topology = "triangle",
    } = body;

    if (!image_url || typeof image_url !== "string") {
      return NextResponse.json({ error: "image_url is required" }, { status: 400 });
    }

    // Demo/simulated fallback if no live API key is configured
    if (!apiKey || apiKey === "your_meshy_api_key_here" || apiKey === "demo") {
      const mockTaskId = `mock_3d_${Date.now()}`;
      return NextResponse.json({ result: mockTaskId, isDemo: true });
    }

    // Meshy OpenAPI v2 Image to 3D
    const payload = {
      image_url,
      ai_model: ai_model === "Meshy 6" || ai_model === "meshy-6" ? "meshy-6" : "meshy-7",
      enable_image_enhancement: Boolean(enable_image_enhancement),
      topology: topology.toLowerCase() === "quad" ? "quad" : "triangle",
      target_polycount: 300000,
    };

    const response = await fetch("https://api.meshy.ai/openapi/v2/image-to-3d", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || `Meshy 3D API error (${response.status})` },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image-to-3d request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
