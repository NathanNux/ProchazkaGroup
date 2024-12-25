import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StatNumberVariable({ number, EndDuration, StartDuration, BreakPoint, delay = 0 }) {
  const paragraphRef = useRef();
  const count = useMotionValue(0);
  const Counting = useTransform(count, Math.round);
  const isInView = useInView(paragraphRef, { 
    margin: '-10% 0px -10% 0px',
    amount: 0.5 // Requires 50% of element to be visible
  });
 
  useEffect(() => {
    let controls;

    if (isInView) {
      count.set(0); // Reset when comes into view
      controls = animate(count, parseFloat(BreakPoint), {
        duration: StartDuration,
        ease: 'circInOut',
        delay: delay,
        onComplete: () => {
          animate(count, number, {
            duration: EndDuration,
            ease: 'circOut',
          })
        }
      });
    }

    return () => controls?.stop();
  }, [isInView, number, BreakPoint, StartDuration, EndDuration, delay, count]);

  return (
    <motion.h1 ref={paragraphRef}>{Counting}</motion.h1>
  );
}

// NOTE: This is so far the best version of the number animation component. It is versatile and can be used for any number and it will work. Just by observation

//This version can be also used for phones - does not take too much time to load or execute