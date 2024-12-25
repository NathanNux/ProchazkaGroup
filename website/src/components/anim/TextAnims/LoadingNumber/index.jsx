import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function LoadingNumber({ number, staggers }) {
  const paragraphRef = useRef();
  const count = useMotionValue(0);
  const Counting = useTransform(count, Math.round);
  const isInView = useInView(paragraphRef, { margin: '0px' });

  //need to transform the values to %, and I can't make it as normal text
  const CountingWithPercent = useTransform(Counting, (latest) => `${latest}%`);
  useEffect(() => {
    let controls;


    if (isInView) {

      // I want also the time to be random 
      const minRunTime = 3;
      const maxRunTime = 6;
      const runTime = Math.random() * (maxRunTime - minRunTime) + minRunTime;
      // need to make it random so I need an array of numbers and it needs to be incremental, so I need to sort it
      const randomFloats = Array.from({ length: staggers }, () => Math.random() * number)
      .sort((a, b) => a - b)
      .concat(number);

      //then I need the random delays to simulate lag
      const randomDelays = Array.from({ length: staggers }, () => Math.random())
      .sort((a, b) => a - b)
      .concat(1);      // Start the animation when the component is in view
      controls = animate(count, [...randomFloats, number], {
        duration: runTime,
        times: randomDelays * 0.1,
        ease: "linear",
      },)
    } else {
      // Optionally reset the count when the component is out of view
      count.set(0);
    }

    return () => {
      // Clean up the animation when the component unmounts or when isInView changes
      if (controls) {
        controls.stop();
      }
    };
  }, [isInView, number, staggers]);

  return (
    <div className="Loading__Number__Container">
      <motion.h1 ref={paragraphRef}>{CountingWithPercent}</motion.h1>
    </div>
  );
}