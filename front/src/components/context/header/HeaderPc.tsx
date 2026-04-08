import styles from "./styles.module.scss";
import { HEADER_TOP_NAV_LIST } from "@/constants/header";

export default function HeaderPc() {
  return (
    <div className="isPc">
      <nav className={styles.headerPcNav}>
        <ul className={styles.headerPcNavList}>
          {HEADER_TOP_NAV_LIST.map((item) => (
            <li key={item.label} className={styles.headerPcNavItem}>
              <a href={item.href} className={styles.headerPcNavLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
}