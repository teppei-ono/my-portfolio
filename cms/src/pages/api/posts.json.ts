import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async ({ request }) => {
  const expected = process.env.PUBLIC_API_TOKEN; // Workersの環境変数に入れる
  if (!expected) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";

  if (token !== expected) return unauthorized();

  const { entries } = await getEmDashCollection("posts");

  const items = entries.map((e) => ({
    slug: e.id,
    title: e.data.title,
    excerpt: e.data.excerpt ?? "",
    publishedAt: e.data.publishedAt,
  }));

  return new Response(JSON.stringify({ items }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};