import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files (PNG, JPG, WEBP) are supported" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract extension
    const originalExt = path.extname(file.name) || ".png";
    const ext = originalExt.startsWith(".") ? originalExt : `.${originalExt}`;
    const filename = `${uuidv4()}${ext}`;

    // Write to /tmp/[uuid].[ext]
    const tmpFilePath = path.join("/tmp", filename);
    await writeFile(tmpFilePath, buffer);

    // Also prepare base64 data URI in case caller needs local inline preview / Meshy base64
    const mimeType = file.type || "image/png";
    const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const serveUrl = `/api/upload/serve/${filename}`;

    return NextResponse.json({
      url: serveUrl,
      dataUrl: dataUri,
      filename,
      name: file.name,
      size: file.size,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "File upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
