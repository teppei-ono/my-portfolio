type CmsFetchOptions = Omit<RequestInit, "body"> & {
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
};

export async function cmsFetch<T>(path: string, options: CmsFetchOptions = {}): Promise<T> {
  const baseUrl = process.env.CMS_BASE_URL;
  if (!baseUrl) throw new Error("CMS_BASE_URL is not set");

  const url = new URL(path, baseUrl);

  if (options.query) {
    for (const [k, v] of Object.entries(options.query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      // 一旦は毎回最新が欲しい想定（必要なら後で revalidate にします）
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`CMS fetch failed: ${res.status} ${res.statusText} (${url}) ${text}`);
    }

    // JSONでない可能性も拾う
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`CMS response is not valid JSON (${url}): ${text.slice(0, 200)}`);
    }
  } catch (e) {
    // 呼び出し側で握りつぶさず原因が分かるように
    throw e;
  }
}