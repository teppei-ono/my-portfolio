import { cmsFetch } from "@/libs/cmsFetch";

type PostsResponse = {
  items: Array<{
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string | null;
  }>;
};

export default async function BlogPage() {
  const data = await cmsFetch<PostsResponse>("/api/posts.json", {
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
    },
  });
  console.log('dataです',data);

  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>
      <ul>
        {data.items.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}