import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";

const ScrollInfinityX: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      await controls.start({
        x: ["0%", "-100%"], // Défile de droite à gauche
        transition: { duration: 20, ease: "linear", repeat: Infinity }, // Transition linéaire infinie
      });
    };

    loopAnimation();
  }, [controls]);

  return (
    <motion.div className="flex marquee-item" ref={itemRef} animate={controls}>
      {children}
    </motion.div>
  );
};

const InteractiveScrollX: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex marquee">
      <ScrollInfinityX>{children}</ScrollInfinityX>
      <ScrollInfinityX>{children}</ScrollInfinityX>
    </div>
  );
};

export default InteractiveScrollX;
