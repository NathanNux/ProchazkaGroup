import { useEffect, useState } from "react";
import LoopButton from "./Button";
import { motion, useAnimationControls } from 'framer-motion';

export default function LoopAnim() {
    const controls1 = useAnimationControls()
    const controls2 = useAnimationControls()

    useEffect(() => {
        // First button animation - scales down to 0
        controls1.start({
            scale: [1, 0.7, 0, 0, 0],
            times: [0, 0.4, 0.5, 0.6, 1],
            y: [-65, 65],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 2.5,
                ease: [[0.99, 0.01, -0.05, 0.6], [0.6, -0.28, 0.735, 0.045], 'linear', [0.735, 0.045, 0.6, -0.28], [0.6, -0.05, 0.01, 0.99]],
                type: 'tween',
            }
        })

        // Second button animation - scales up from 0
        controls2.start({
            scale: [0, 0, 0, 0.7, 1],
            times: [0, 0.4, 0.5, 0.6, 1],
            y: [-65, 65],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 2.5,
                ease: [[0.99, 0.01, -0.05, 0.6], [0.6, -0.28, 0.735, 0.045], 'linear', [0.735, 0.045, 0.6, -0.28], [0.6, -0.05, 0.01, 0.99]],
                type: 'tween',
            }
        })
    }, [controls1, controls2])

    return (
        <div className="loop__anim__main">
            <div className="loop__anim__button__container">
                <motion.div 
                    className="loop__anim__button__subcontainer" 
                    animate={controls1}
                    style={{ position: 'absolute' }}
                >
                    <LoopButton href='/' text='První Text' />
                </motion.div>
                <motion.div 
                    className="loop__anim__button__subcontainer" 
                    animate={controls2}
                    style={{ position: 'absolute' }}
                >
                    <LoopButton href='/' text='Druhý Text' />
                </motion.div>
            </div>
            <div className="loop__anim__devider__Container">
                <div className="loop__anim__devider"></div>
            </div>
        </div>
    )
}