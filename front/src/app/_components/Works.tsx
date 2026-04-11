import styles from "./styles.module.scss";
import Container from "@/components/element/container/Container";
import HeadingH2 from "@/components/element/heading/h2/HeadingH2";
import MediaLink from "@/components/element/mediaLink/MediaLink";
import type { MediaLinkProps } from "@/components/element/mediaLink/types";

export const WORKS: MediaLinkProps[] = [
  {
    href: "/blog/",
    imageSrc: "/assets/images/img_works_01.png",
    imageAlt: "作品のサムネイル",
    labels: [
      { text: "Next.js", size: "sm" },
      { text: "TypeScript", size: "sm" },
    ],
    title: <>プリントプロダクトHONEY GO<br />WEB販売プラットフォーム</>,
  },
];

export default function Works() {
  return (
    <section className={styles.works} id="works">
      <Container variant="top">
        <HeadingH2 variant="en">WORKS</HeadingH2>
        <ul className={styles.worksList}>
          {WORKS.map((work) => (
            <li key={work.href}>
              <MediaLink {...work} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}