"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.reveal` element when it scrolls into view.
 * Fail-safe: if IntersectionObserver is unavailable, or anything is still
 * hidden shortly after load, everything is revealed so content never sticks.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    if (reveals.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    reveals.forEach((el) => observer.observe(el));

    const safety = window.setTimeout(() => {
      reveals.forEach((el) => el.classList.add("in"));
    }, 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
}
