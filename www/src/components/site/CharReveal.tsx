"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Letter-voor-letter blur-in, zoals de H1 op de live site.
 * Neemt platte tekst en/of losse React-elementen (bv. het icoon-tegeltje):
 * strings worden per karakter geanimeerd, elementen als geheel.
 */
export function CharReveal({
  children,
  className,
  startDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;

  let i = 0;
  const anim = (node: ReactNode, key: string | number): ReactNode => {
    if (typeof node === "string") {
      // per woord bij elkaar houden zodat afbreken netjes blijft
      return node.split(" ").map((woord, w, arr) => (
        <span key={`${key}-w${w}`} className="inline-block whitespace-nowrap">
          {[...woord].map((teken, c) => (
            <motion.span
              key={`${key}-w${w}-c${c}`}
              className="inline-block"
              initial={{ opacity: 0.001, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 1, delay: startDelay + i++ * 0.02 }}
            >
              {teken}
            </motion.span>
          ))}
          {w < arr.length - 1 ? " " : null}
        </span>
      ));
    }
    return (
      <motion.span
        key={key}
        className="inline-block"
        initial={{ opacity: 0.001, filter: "blur(10px)", y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 1, delay: startDelay + i++ * 0.02 }}
      >
        {node}
      </motion.span>
    );
  };

  const kinderen = Array.isArray(children) ? children : [children];
  return <span className={className}>{kinderen.map((k, n) => anim(k, n))}</span>;
}
