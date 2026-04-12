import styles from "./styles.module.scss";

type HeaderNavItem = { label: string; href: string };
type Props = {
  navList: HeaderNavItem[];
};

export default function HeaderPc({ navList }: Props) {
  return (
    <div className="isPc">
      <nav className={styles.headerPcNav}>
        <ul className={styles.headerPcNavList}>
          {navList.map((item) => (
            <li key={item.label} className={styles.headerPcNavItem}>
              <a href={item.href} className={styles.headerPcNavLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
}