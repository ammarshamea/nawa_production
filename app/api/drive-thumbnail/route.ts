import { driveThumbnailUrls } from "@/lib/drive";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^[\w-]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  for (const url of driveThumbnailUrls(id)) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; NawaProduction/1.0)" },
        next: { revalidate: 86400 },
      });

      const type = res.headers.get("content-type") ?? "";
      if (res.ok && type.startsWith("image/") && res.body) {
        return new NextResponse(res.body, {
          status: 200,
          headers: {
            "Content-Type": type,
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
          },
        });
      }
    } catch {
      /* try next URL */
    }
  }

  return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
}
