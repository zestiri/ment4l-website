"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Telt soepel van 0 naar `to` zodra het component in beeld komt. */
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, reduce, inView]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
