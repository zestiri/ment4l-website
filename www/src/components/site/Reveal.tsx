"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-reveal met de spring-parameters van de live site.
 * `size="block"` (default) voor hele secties (80px, zachte spring),
 * `size="item"` voor losse elementen binnen een sectie (16px, snappy).
 */
export function Reveal({
  children,
  delay = 0,
  size = "block",
  className,
}: {
  children: ReactNode;
  delay?: number;
  size?: "block" | "item";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const y = size === "block" ? 80 : 16;
  const transition =
    size === "block"
      ? { type: "spring" as const, stiffness: 150, damping: 40, mass: 1, delay }
      : { type: "spring" as const, stiffness: 580, damping: 50, mass: 1, delay: delay || 0.1 };

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
