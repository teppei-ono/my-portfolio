import styles from "./styles.module.scss";
import Container from "@/components/element/container/Container";
import HeadingH2 from "@/components/element/heading/h2/HeadingH2";
import type { MediaLinkProps } from "@/components/element/mediaLink/types";
import MediaLink from "@/components/element/mediaLink/MediaLink";
import { Blogs } from "@/types/microcms";

export default function Blog({ BlogList }: { BlogList: Blogs[] }) {
  const blogPosts: MediaLinkProps[] = BlogList.map((b) => ({
    href: `/blog/${b.id}`,
    imageSrc: b.thumbnail?.url ?? "/assets/images/img_works_01.png",
    imageAlt: b.title,
    title: b.title,
  }));
  return (
    <section className={styles.blog} id="blog">
      <div className={styles.blogInner}>
        <Container variant="top">
          <HeadingH2>BLOG</HeadingH2>
          <p className={styles.blogDescription}>技術的なブログを投稿してます。日々の技術キャッチアップの内容をご確認ください。</p>
          <ul className={styles.blogList}>
            {blogPosts.map((post) => (
              <li key={post.href}>
                <MediaLink {...post} />
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <div className={styles.blogVideo}>
        <video src="/assets/movies/movie_blog.mp4" autoPlay muted loop />
      </div>
    </section>
  );
}