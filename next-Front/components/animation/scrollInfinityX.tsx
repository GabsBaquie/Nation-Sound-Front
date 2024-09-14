import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ScrollInfinityX: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      await controls.start({
        x: ["0%", "-100%"], // Défile de droite à gauche
        transition: { duration: 15, ease: "linear", repeat: Infinity }, // Transition linéaire infinie
      });
    };

    loopAnimation();
  }, [controls]);

  return (
    <motion.div className="flex space-x-4" animate={controls}>
      {children}
    </motion.div>
  );
};

export default ScrollInfinityX;
