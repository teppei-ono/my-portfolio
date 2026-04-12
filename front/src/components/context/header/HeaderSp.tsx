"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_LOWER_NAV_LIST, HEADER_TOP_NAV_LIST } from "@/constants/header";
import styles from "./styles.module.scss";

type HeaderNavItem = { label: string; href: string };
type Props = {
  navList: HeaderNavItem[];
};

export default function HeaderSp({ navList }: Props) {
  const [open, setOpen] = useState(false);

  const drawerId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="isSp">
      <button
        type="button"
        className={styles.headerSpButton}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((v) => !v)}
      >
        MENU
      </button>

      <>
        <div
          className={[
            styles.headerSpOverlay,
            open && styles.isOpen,
          ].filter(Boolean).join(" ")}
          onClick={() => setOpen(false)}
          aria-hidden
        />

        <div
          id={drawerId}
          className={[
            styles.headerSpDrawer,
            open && styles.isOpen,
          ].filter(Boolean).join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="menu"
        >
          <nav className={styles.headerSpNav} aria-label="メニュー">
            <ul className={styles.headerSpNavList}>
              {navList.map((item) => (
                <li key={item.label} className={styles.headerSpNavItem}>
                  <Link
                    href={item.href}
                    className={styles.headerSpNavLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className={styles.headerSpClose}
            onClick={() => setOpen(false)}
          >
            CLOSE
          </button>
        </div>
      </>
    </div>
  );
}