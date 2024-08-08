"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Props = {
  children: JSX.Element;
  width?: string;
  delay?: number;
  stiffness?: number;
};

const Spring: React.FC<Props> = ({
  children,
  width = "w-fit",
  delay,
  stiffness = 100,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`relative ${width}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 75,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: delay,
          type: "spring",
          damping: 8,
          stiffness: stiffness,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Spring;
