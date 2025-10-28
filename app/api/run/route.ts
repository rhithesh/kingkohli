import { NextRequest } from "next/server";

export const runtime = "nodejs"; // ensure streaming works

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const team = searchParams.get("team");
  const agent = searchParams.get("agent");

  const body = await req.json();

  const backend =
    process.env.CAGENT_BASE_URL ||
    "https://feelgood-backend.grayglacier-c164be2d.centralindia.azurecontainerapps.io";

  const resp = await fetch(
    `${backend}/api/sessions/${sessionId}/agent/${team}/${agent}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
