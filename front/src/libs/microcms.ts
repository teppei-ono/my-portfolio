import { createClient, MicroCMSQueries } from 'microcms-js-sdk';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

// microCMSクライアントを初期化
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMSのサービスドメインまたはAPIキーが設定されていません。');
}

export const microcmsClient = createClient({
  serviceDomain,
  apiKey,
});

// リスト取得（一覧API）
export async function fetchMicroCMSList<T = unknown>(
  endpoint: string,
  queries?: MicroCMSQueries,
  customRequestInit?: RequestInit,
): Promise<MicroCMSListResponse<T>> {
  if (queries?.limit) {
    return microcmsClient.getList<T>({
      endpoint,
      queries,
      customRequestInit,
    });
  } else {
    const contents = await microcmsClient.getAllContents<T>({
      endpoint,
      queries,
      customRequestInit,
    });

    return {
      contents,
      totalCount: contents.length,
      limit: contents.length,
      offset: 0,
    };
  }
}

export async function fetchMicroCMSAll<T = unknown>(
  endpoint: string,
  queries?: Omit<MicroCMSQueries, 'limit' | 'offset'>,
  customRequestInit?: RequestInit,
): Promise<MicroCMSListResponse<T>> {
  const contents = await microcmsClient.getAllContents<T>({
    endpoint,
    queries,
    customRequestInit,
  });

  return {
    contents,
    totalCount: contents.length,
    limit: contents.length,
    offset: 0,
  };
}

// 詳細取得（ID指定）
export async function fetchMicroCMSDetail<T = unknown>(
  endpoint: string,
  contentId: string,
  queries?: MicroCMSQueries,
  customRequestInit?: RequestInit,
): Promise<T> {
  return microcmsClient.getListDetail<T>({
    endpoint,
    contentId,
    queries,
    customRequestInit,
  });
}

// 詳細取得（post_slug指定）
export async function fetchMicroCMSDetailBySlug<T>(
  endpoint: string,
  slug: string,
  customRequestInit?: RequestInit,
): Promise<T | null> {
  const res = await microcmsClient.getList<T>({
    endpoint,
    queries: {
      filters: `post_slug[equals]${slug}`,
      limit: 1,
    },
    customRequestInit,
  });

  return res.contents[0] ?? null;
}

// オブジェクト型取得（object API）
export async function fetchMicroCMSObject<T = unknown>(
  endpoint: string,
  queries?: MicroCMSQueries,
  customRequestInit?: RequestInit,
): Promise<T> {
  return microcmsClient.getObject<T>({
    endpoint,
    queries,
    customRequestInit,
  });
}
