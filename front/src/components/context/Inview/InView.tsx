"use client";

import { useEffect } from "react";
import { setInViewClass } from "@/utils/setInViewClass";

export default function InViewInit() {
  useEffect(() => {
    return setInViewClass();
  }, []);

  return null;
}