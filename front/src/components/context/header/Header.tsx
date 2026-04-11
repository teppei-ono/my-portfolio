import ContainerWide from "@/components/variant/container/wide/ContainerWide";
import HeaderPc from "./HeaderPc";
import HeaderSp from "./HeaderSp";
import HeaderScrollClass from "@/components/context/header/HeaderScrollClass";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header} data-header>
      <HeaderScrollClass />
      <ContainerWide variant="wide" className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <a href="" className={styles.headerLogoLink}>
            <Image src="/assets//images/common/img_logo.svg" alt="logo" width={130} height={42} loading="eager" />
          </a>
          <HeaderPc />
          <HeaderSp />
        </div>
      </ContainerWide>
    </header>
  );
}