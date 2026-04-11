import HeadingH2 from "@/components/element/heading/h2/HeadingH2";
import Container from "@/components/element/container/Container";
import styles from "./styles.module.scss";
import { skills } from "@/data/skills";
import Image from "next/image";

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">

      <Container variant="top">
        <HeadingH2 isCentered={true}>Skills</HeadingH2>
        <p className={styles.skillsDescription}>
          実務経験に基づく技術スタックと習熟度です。<br />
          プロジェクトの規模や要件に応じた適切な技術選定と実装が可能です。
        </p>
        <ul className={styles.skillsCategoryList}>
          {skills.map((category, index) => (
            <li key={category.title} className={styles.skillsCategoryItem} data-io style={{ "transition-delay": `${index * 0.2}s` } as React.CSSProperties}>
              <div className={styles.skillsCategoryHeader}>
                <div className={styles.skillsCategoryIcon}>
                  <Image
                    src={category.icon}
                    alt={category.title}
                    width={category.iconWidth}
                    height={category.iconHeight}
                  />
                  <h3 className={styles.skillsCategoryTitle}>{category.title}</h3>
                </div>
              </div>
              <ul className={styles.skillsItemList}>
                {category.items.map((item) => {
                  const value = Math.max(0, Math.min(10, item.level)); // 0〜10にクランプ
                  const percent = (value / 10) * 100;
                  return (
                    <li key={item.name} className={styles.skillsItem}>
                      <div className={styles.skillsItemTop}>
                        <p className={styles.skillsItemName}>{item.name}</p>
                        <p className={styles.skillsItemYear}>{item.year}</p>
                      </div>
                      <div className={styles.skillsGauge} aria-label={`${item.name} level ${value} / 10`}>
                        <span className={styles.skillsGaugeTrack} />
                        <span
                          className={styles.skillsGaugeFill}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className={styles.skillsItemDescription}>{item.description}</p>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}