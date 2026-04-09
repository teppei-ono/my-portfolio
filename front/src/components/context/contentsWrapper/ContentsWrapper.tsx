import styles from "./styles.module.scss";

export default function ContentsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.contentsWrapper}>
      {children}
    </div>
  );
}