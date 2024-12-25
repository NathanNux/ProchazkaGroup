import { useEffect } from "react";
import LoopButton from "./Button";
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

export default function AdvcAnim() {
  const progress = useMotionValue(0);
  const y = useTransform(progress, [0, 1], [-65, 65]);
  const scaleY = useTransform(
    progress, 
    [0, 0.45, 0.5, 0.55, 1],
    [1, 0.1, 1.5, 0.1, 1]
  );
  const scaleX = useTransform(
    progress, 
    [0, 0.45, 0.5, 0.55, 1],
    [1, 1.8, 0, 1.8, 1]
  );

  useEffect(() => {
    const controls = animate(progress, 1, {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1,
        repeatType: 'reverse',
        ease: [.38,.84,.61,.12],
        type: 'tween',
    })
    

    return controls.stop
  }, [progress])



    return (
        <div className="loop__anim__main">
            <div className="loop__anim__button__container">
                <motion.div 
                    className="loop__anim__button__subcontainer" 
                    style={{ y, scaleY, scaleX }}
                    >
                    <LoopButton href='/' text='Test' textChange='Change'/>
                </motion.div>
            </div>
            <div className="loop__anim__devider__Container">
                <div className="loop__anim__devider"></div>
            </div>
        </div>
    )
}