import styles from "./styles.module.scss";
import Container from "@/components/element/container/Container";
import HeadingH2 from "@/components/element/heading/h2/HeadingH2";
import { STRENGTH } from "@/data/strength";
import { setSanitizeRichText } from "@/utils/setSanitizeRichText";
import Image from "next/image";

export default function Strength() {
  return (
    <section className={styles.strength} id="strength">
      <Container variant="top">
        <HeadingH2>Strength</HeadingH2>
        <ul className={styles.strengthList}>
          {STRENGTH.map((strength) => (
            <li key={strength.title} className={styles.strengthItem}>
              <div className={styles.strengthIcon}>
                <Image src={strength.icon} alt={strength.title} width={48} height={48} />
              </div>
              <h3 className={styles.strengthTitle}>{strength.title}</h3>
              <p
                className={styles.strengthDescription}
                dangerouslySetInnerHTML={{ __html: setSanitizeRichText(strength.description) }}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}