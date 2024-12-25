import { motion, useInView, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function SubText({text, className}) {
    const ref = useRef(null);
    const lastAnimatedIndex = useRef(0);
    const isAnimatingOut = useRef(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for reverse

    const isInView = useInView(ref, {
        margin: "-10% 0px -10% 0px",
        amount: 0.5
    });

    useEffect(() => {
        if (!isInView) {
            isAnimatingOut.current = true;
        }
    }, [isInView]);

    const characters = text.split("");

    return (
        <div ref={ref} className={className}>
            <motion.p>
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0
                        } : {
                            opacity: 0,
                            y: 10
                        }}
                        transition={{
                            duration: 0.1,
                            delay: isAnimatingOut.current ? 
                                Math.max(0, (characters.length - i) * 0.015) : 
                                i * 0.015,
                            ease: [0.215, 0.61, 0.355, 1],
                        }}
                        onAnimationComplete={() => {
                            lastAnimatedIndex.current = i;
                            if (i === characters.length - 1) {
                                isAnimatingOut.current = false;
                            }
                        }}
                        style={{
                            display: 'inline-block',
                            marginRight: char === ' ' ? '0.3em' : '0.02em'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.p>
        </div>
    );
}