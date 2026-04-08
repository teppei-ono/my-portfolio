import ContainerTop from "@/components/variant/container/top/ContainerTop";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ContainerTop variant="top" className={styles.footerContainer}>
        <p className={styles.footerCopyright}><small>&copy; 2026 TEPPEI ONO Portfolio. All Rights Reserved.</small></p>
      </ContainerTop>
    </footer>
  );
}