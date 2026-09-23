import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    const parsed = new URL(imageUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return new NextResponse("Invalid protocol", { status: 400 });
    }

    const upstreamRes = await fetch(imageUrl, {
      headers: {
        Accept: "image/*",
      },
    });

    if (!upstreamRes.ok) {
      return new NextResponse(
        `Failed to fetch upstream image: ${upstreamRes.statusText}`,
        { status: upstreamRes.status }
      );
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const contentType =
      upstreamRes.headers.get("content-type") || "image/png";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Proxy image error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
