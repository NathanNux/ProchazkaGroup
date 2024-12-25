import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StatNumberVariable({ number, EndDuration, StartDuration, BreakPoint, delay = 0 }) {
  const paragraphRef = useRef();
  const count = useMotionValue(0);
  const Counting = useTransform(count, Math.round);
  const isInView = useInView(paragraphRef, { margin: '0px' });
 
  useEffect(() => {
    let controls;

    if (isInView) {
 
      // Start the animation when the component is in view
      controls = animate(count, BreakPoint, {
        duration: StartDuration,
        ease: 'circInOut',
        delay: delay,
        onComplete: () => {
          animate(count, number, {
            duration: EndDuration,
            ease: 'circOut',
          })
        }

      },)
    } else {
      // Optionally reset the count when the component is out of view
      count.set(0);
    }

    // this anim is now versatile and works really well - so stupid I didn't think of it before - I can now use it for any number and it will work


    return () => {
      // Clean up the animation when the component unmounts or when isInView changes
      if (controls) {
        controls.stop();
      }
    };
  }, [isInView, number]);

  return (
    <motion.h1 ref={paragraphRef}>{Counting}</motion.h1>
  );
}


// NOTE: This is so far the best version of the number animation component. It is versatile and can be used for any number and it will work. Just by observation

//This version can be also used for phones - does not take too much time to load or execute