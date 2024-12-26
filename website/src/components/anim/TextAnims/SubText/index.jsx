import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function SubText({text, className}) {
    const ref = useRef(null);
    const lastAnimatedIndex = useRef(0);
    const isAnimatingOut = useRef(false);
    
    const isInView = useInView(ref, {
        margin: "-2% 0px -2% 0px", // Tighter margin
        amount: 0.2, // Lower threshold
        once: false
    });

    useEffect(() => {
        if (!isInView) {
            isAnimatingOut.current = true;
            // Force immediate state update
            lastAnimatedIndex.current = 0;
        }
    }, [isInView]);

    // Split text into segments, preserving <br/> tags
    const segments = text.split(/(<br\/>)/).map((segment, index) => {
        return segment === '<br/>' ? { type: 'break' } : { type: 'text', content: segment };
    });

    // Create flat array of characters and breaks
    const characters = segments.reduce((acc, segment) => {
        if (segment.type === 'break') {
            acc.push({ char: '<br/>', type: 'break' });
        } else {
            segment.content.split('').forEach(char => {
                acc.push({ char, type: 'text' });
            });
        }
        return acc;
    }, []);

    return (
        <div ref={ref} className={className}>
            <motion.p>
                {characters.map((item, i) => (
                    item.type === 'break' ? (
                        <br key={`br-${i}`} />
                    ) : (
                        <motion.span
                            key={`brs${i}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0
                            } : {
                                opacity: 0,
                                y: 10
                            }}
                            transition={{
                                duration: 0.05,  // Faster base duration
                                delay: isAnimatingOut.current ? 
                                    Math.max(0, (characters.length - i) * 0.006) :  // Reduced delay
                                    i * 0.008,  // Reduced delay
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
                                marginRight: item.char === ' ' ? '0.1em' : '0.015em'
                            }}
                        >
                            {item.char === ' ' ? '\u00A0' : item.char}
                        </motion.span>
                    )
                ))}
            </motion.p>
        </div>
    );
}