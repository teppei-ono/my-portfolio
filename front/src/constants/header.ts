import { ROUTES } from "@/data/routes";

export const HEADER_TOP_NAV_LIST = [
  {
    label: "ABOUT",
    href: ROUTES.ABOUT,
  },
  {
    label: "SKILLS",
    href: ROUTES.SKILLS,
  },
  {
    label: "WORKS",
    href: ROUTES.WORKSTOP,
  },
  {
    label: "BLOG",
    href: ROUTES.TOPBLOG,
  },
  {
    label: "STRENGTH",
    href: ROUTES.STRENGTH,
  },
];

export const HEADER_LOWER_NAV_LIST = [
  {
    label: "ABOUT",
    href: `${ROUTES.HOME}${ROUTES.ABOUT}`,
  },
  {
    label: "SKILLS",
    href: `${ROUTES.HOME}${ROUTES.SKILLS}`,
  },
  {
    label: "WORKS",
    href: `${ROUTES.HOME}${ROUTES.WORKS}`,
  },
  {
    label: "BLOG",
    href: ROUTES.BLOG,
  },
  {
    label: "STRENGTH",
    href: `${ROUTES.HOME}${ROUTES.STRENGTH}`,
  },
];