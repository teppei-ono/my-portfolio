import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchMicroCMSList , fetchMicroCMSDetail } from '@/libs/microcms';
import { Blogs } from '@/types/microcms';
import BlogsDetail from './components/BlogsDetail';

// 動的ルートパラメータの型定義（Next15）
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const generateDynamicTitle = (title: string) => title;

// generateStaticParams に存在しない slug は 404
export const dynamicParams = false;

/* =========================
 * 動的メタデータ生成
 * ========================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    const blogs = await fetchMicroCMSDetail<Blogs>('blogs', slug);

    if (!blogs) {
      return {
        title: 'ページが存在しません。',
        description: 'ページが存在しません。',
      };
    }

    return {
      title: generateDynamicTitle(blogs.title),
      description: blogs.title,
      openGraph: {
        title: blogs.title,
        description: blogs.title,
        images: blogs.thumbnail ? [{ url: blogs.thumbnail.url }] : undefined,
      },
    };
  } catch {
    return {
      title: 'ページが存在しません。',
      description: 'ページが存在しません。',
    };
  }
}

/* =========================
 * 静的パス生成（SSG）
 * ========================= */
export async function generateStaticParams() {
  try {
    const { contents } = await fetchMicroCMSList<Blogs>('blogs');

    return contents.map(blog => ({
      slug: blog.id,
    }));
  } catch (error) {
    console.error('ニュース静的パス生成エラー:', error);
    return [];
  }
}

/* =========================
 * ページ本体
 * ========================= */
export default async function BlogsDetailPage ({ params }: PageProps) {
  const { slug } = await params;

  const blogs = await fetchMicroCMSDetail<Blogs>('blogs', slug);

  if (!blogs) {
    notFound();
  }

  return <BlogsDetail blogs={blogs} />;
};
