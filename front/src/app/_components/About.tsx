import styles from "./styles.module.scss";
import Container from "@/components/element/container/Container";
import HeadingH2 from "@/components/element/heading/h2/HeadingH2";
export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <Container variant="top" className={styles.aboutContentContainer}>
          <HeadingH2 variant="en">ABOUT</HeadingH2>
          <p className={styles.aboutContentText}>
            私は7年間、Webサイト・オウンドメディア制作の設計から実装、<br />
            運用までを行なってきたフロントエンドエンジニアです。<br />
            直近では Next.js／Nuxt.js を用いた開発を中心に、<br />
            CMS設計やAPI設計、バックエンド実装まで横断して携わっています。<br />
            単なる実装に留まらず、技術選定やアーキテクチャ設計、<br />
            ディレクトリ構成の標準化など、拡張性と再利用性を<br />
            意識した開発基盤の構築を主導しております。将来的な運用フェーズを見据え、保守性・可読性・拡張性の高い<br />
            プロダクト開発を実践しています。<br />
            また、ディレクター・デザイナーと連携しながら仕様を整理し、<br />
            技術的観点から最適解を提案するなど他職種とのコミュニケーションや連携が得意です。<br />
            AI活用による開発効率化も推進やチーム内の勉強会開催など能動的に活動することができ、<br />
            技術の素早いキャッチアップや業務効率化などを行うことができます。
          </p>
        </Container>
      </div>
      <div className={styles.aboutMovie}>
        <video src="/assets/movies/movie_about.mp4" autoPlay muted loop playsInline className={styles.aboutMovieVideo}></video>
      </div>
    </section>
  );
}