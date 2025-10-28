// app/api/create-session/route.ts
import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_CAGENT_BASE_URL || "http://localhost:8000";

export async function POST() {
  try {
    const res = await fetch(`${BACKEND}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // You can also omit "id" to let backend assign
      body: JSON.stringify({ id: `sess-${Date.now()}` }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
