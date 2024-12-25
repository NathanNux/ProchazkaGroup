import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StatNumberVariable({ number, EndDuration, StartDuration, BreakPoint, delay = 0 }) {
  const paragraphRef = useRef();
  const count = useMotionValue(0);
  const lastValue = useRef(0);
  const isAnimatingOut = useRef(false);
  const Counting = useTransform(count, Math.round);
  
  const isInView = useInView(paragraphRef, { 
    margin: '-10% 0px -10% 0px',
    amount: 0.5
  });
 
  useEffect(() => {
    let controls;

    if (isInView) {
      if (isAnimatingOut.current) {
        // Resume from last value when re-entering view
        controls = animate(count, parseFloat(BreakPoint), {
          duration: StartDuration * (1 - (lastValue.current / parseFloat(BreakPoint))),
          ease: 'circInOut',
          delay: delay,
          onComplete: () => {
            animate(count, number, {
              duration: EndDuration,
              ease: 'circOut',
            });
          }
        });
      } else {
        // Start fresh animation
        count.set(0);
        controls = animate(count, parseFloat(BreakPoint), {
          duration: StartDuration,
          ease: 'circInOut',
          delay: delay,
          onComplete: () => {
            animate(count, number, {
              duration: EndDuration,
              ease: 'circOut',
            });
          }
        });
      }
      isAnimatingOut.current = false;
    } else {
      // Track current value when leaving viewport
      lastValue.current = count.get();
      isAnimatingOut.current = true;
      
      // Animate back to 0
      controls = animate(count, 0, {
        duration: StartDuration * (lastValue.current / parseFloat(BreakPoint)),
        ease: 'circIn'
      });
    }

    return () => controls?.stop();
  }, [isInView, number, BreakPoint, StartDuration, EndDuration, delay, count]);

  return (
    <motion.h1 ref={paragraphRef}>{Counting}</motion.h1>
  );
}