// app/(child)/news/[slug]/_components/blogsDetail.tsx
import Image from 'next/image';
import styles from './styles.module.scss';
import { Blogs } from '@/types/microcms';
import { formatDateToJST } from '@/utils/formatDateToJST';
import { getImageSrc } from '@/utils/getImageSrc';
import Container from '@/components/element/container/Container';
import { setSanitizeRichText } from '@/utils/setSanitizeRichText';
// import { ROUTES } from '@/data/routes';

type Props = {
  blogs: Blogs;
};

export default function blogsDetail({ blogs }: Props) {
  return (
    <div className={styles.blogsDetail}>
      <section className={styles.blogsDetailMv}>
        <Container variant="lower">
          {/* タイトル */}
          <h1 className={styles.blogsDetailTitle}>{blogs.title}</h1>

          {/* 日付 */}
          <time className={styles.blogsDetailDate}>{formatDateToJST(blogs.publishedAt)}</time>

          {/* サムネイル */}
          <figure className={styles.blogsDetailThumbnail}>
            <Image
              src={getImageSrc(blogs.thumbnail?.url)}
              alt=""
              width={372}
              height={217}
              className={styles.blogsDetailImg}
            />
          </figure>
        </Container>
      </section>
      <article className={styles.blogsDetailContents}>
        <Container variant="lower">
          {/* 本文（HTML） */}
          <div
            className={styles.blogsDetailMain}
            dangerouslySetInnerHTML={{
              __html: setSanitizeRichText(blogs.content),
            }}
          />
        </Container>
      </article>
    </div>
  );
}
