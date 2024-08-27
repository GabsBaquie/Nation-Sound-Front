import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";

const ScrollInfinity: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      await controls.start({
        y: ["0%", "-100%"],
        transition: { duration: 15, ease: "linear", repeat: Infinity },
      });
    };

    loopAnimation();
  }, [controls]);

  return (
    <motion.div className="marquee-item" ref={itemRef} animate={controls}>
      {children}
    </motion.div>
  );
};

const InteractiveScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="marquee">
      <ScrollInfinity>{children}</ScrollInfinity>
      <ScrollInfinity>{children}</ScrollInfinity>
    </div>
  );
};

export default InteractiveScroll;
