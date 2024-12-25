import LoopButton from "./Button";
import { motion } from 'framer-motion';

const loopAnim = {
    animate: {
        scale: [1, 0.7, 0, 0.7, 1],
        times: [0, 0.4, 0,5, 0.6, 1],
        y: [-65, 65],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2.5,
            // ease: [[0.99, 0.01, -0.05, 0.6], 'anticipate', 'anticipate', 'anticipate', [0.6, -0.05, 0.01, 0.99]],
            ease: [[0.99, 0.01, -0.05, 0.6], [0.6, -0.28, 0.735, 0.045], 'linear', [0.735, 0.045, 0.6, -0.28], [0.6, -0.05, 0.01, 0.99]],
            // ease: ['linear', [0.6, -0.28, 0.735, 0.045], 'linear', [0.735, 0.045, 0.6, -0.28], 'linear'],

            type: 'tween',
        }
    }
}

export default function LoopAnim() {
    return (
        <div className="loop__anim__main">
            <div className="loop__anim__button__container">
                <motion.div className="loop__anim__button__subcontainer" variants={loopAnim} animate='animate'>
                    <LoopButton href='/' text='Test' textChange='Change'/>
                </motion.div>
            </div>
            <div className="loop__anim__devider__Container">
                <div className="loop__anim__devider"></div>
            </div>
        </div>
    )
}