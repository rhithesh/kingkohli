// app/api/proxy/chat/route.ts
import { NextResponse } from "next/server";

export const runtime = "node"; // ensure node runtime for streaming if needed

export async function POST(req: Request) {
  try {
    // Read incoming request body (already parsed JSON by client)
    const body = await req.json();

    // Forward request to upstream model server
    const upstream = await fetch("http://52.202.187.180:8000/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // do NOT forward Origin/Referer from browser unless required by upstream
      },
      body: JSON.stringify(body),
    });

    // If upstream returned non-streaming or no body, return the text/json
    if (!upstream.body) {
      const text = await upstream.text();
      return NextResponse.json({ error: "No body from upstream", text }, { status: upstream.status });
    }

    // Stream upstream body back to client (preserve content-type)
    const headers: Record<string, string> = {};
    const ct = upstream.headers.get("content-type");
    if (ct) headers["Content-Type"] = ct;

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err: any) {
    console.error("proxy error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
