import type { Variants } from "framer-motion";

export const SECTION_EASE = [0.22, 1, 0.36, 1] as const;

export function fadeUp(distance = 20): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };
}
