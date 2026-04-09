import styles from "./styles.module.scss";
import Container from "@/components/element/container/Container";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <Container variant="wide">
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroTitle}>TEPPEI ONO</h1>
            <p className={styles.heroSubtitle}>WEBフロントエンドエンジニア</p>
            <p className={styles.heroDescription}>
              フロントエンドとバックエンドを横断し、設計から実装までをリード。<br />
              チームマネジメントと保守性・可読性・拡張性の高いプロダクトを構築します。
            </p>
          </div>
        </Container>
        
      </div>
    </section>
  );
}