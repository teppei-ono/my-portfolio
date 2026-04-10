import Image from "next/image";
import Link from "next/link";
import { isHttpUrl } from "@/utils/isHttpUrl";
import Label from "@/components/element/label/Label";
import type { MediaLinkProps } from "./types";
import styles from "./styles.module.scss";

function MediaLinkInner({ imageSrc, imageAlt, labels, title }: MediaLinkProps) {
  return (
    <>
      <div className={styles.media}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={440}
          height={240}
          sizes="(min-width: 960px) 480px, 100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        {labels && (
          <ul className={styles.labels}>
            {labels?.map((label) => (
              <li key={label.text}>
                <Label text={label.text} size={label.size} />
              </li>
            ))}
          </ul>
        )}
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
}

export default function MediaLink(props: MediaLinkProps) {
  const { href, className } = props;
  const classes = [styles.linkMedia, className].filter(Boolean).join(" ");

  if (isHttpUrl(href)) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MediaLinkInner {...props} />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <MediaLinkInner {...props} />
    </Link>
  );
}