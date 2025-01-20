import { usePerformance } from "@/context/PerformanceProvider";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const parseText = (text) => {
    return text.split(/(<br\/>|<span>.*?<\/span>)/).filter(Boolean).map(segment => {
        if (segment === '<br/>') {
            return { type: 'break' };
        } else if (segment.startsWith('<span>')) {
            return {
                type: 'text',
                content: segment.replace(/<\/?span>/g, ''),
                highlighted: true
            };
        }
        return { type: 'text', content: segment, highlighted: false };
    });
};

const parseWords = (text) => {
    return text.split(/(<br\/>|<span>.*?<\/span>)/).filter(Boolean).map(segment => {
        if (segment === '<br/>') {
            return { type: 'break' };
        } else if (segment.startsWith('<span>')) {
            return {
                type: 'text',
                content: segment.replace(/<\/?span>/g, '').split(' '),
                highlighted: true
            };
        }
        return { type: 'text', content: segment.split(' '), highlighted: false };
    });
};

export default function SubText({text, className, initialColor = "#fff", secondaryColor = "#00F0FF"}) {
    // Performance
    const { shouldReduceAnimations } = usePerformance();
    
    const ref = useRef(null);
    const lastAnimatedIndex = useRef(0);
    const isAnimatingOut = useRef(false);
    
    const isInView = useInView(ref, {
        margin: "-2% 0px -2% 0px",
        amount: 0.2,
        once: false
    });

    useEffect(() => {
        if (!isInView) {
            isAnimatingOut.current = true;
            lastAnimatedIndex.current = 0;
        }
    }, [isInView]);
    if (shouldReduceAnimations) {
        const words = parseWords(text);
        return (
            <div ref={ref} className={className}>
                <motion.p>
                    {words.map((segment, i) => 
                        segment.type === 'break' ? (
                            <br key={`br-${i}`} />
                        ) : (
                            segment.content.map((word, j) => (
                                <motion.span
                                    key={`word-${i}-${j}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? {
                                        opacity: 1,
                                        y: 0
                                    } : {
                                        opacity: 0,
                                        y: 10
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: j * 0.1,
                                        ease: "easeOut",
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '0.25em',
                                        color: segment.highlighted ? secondaryColor : initialColor
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))
                        )
                    )}
                </motion.p>
            </div>
        );
    }

    // Updated segments parsing
    const segments = parseText(text);
    const characters = segments.reduce((acc, segment) => {
        if (segment.type === 'break') {
            acc.push({ char: '<br/>', type: 'break' });
        } else {
            segment.content.split('').forEach(char => {
                acc.push({ 
                    char, 
                    type: 'text',
                    highlighted: segment.highlighted 
                });
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
                                duration: 0.05,
                                delay: isAnimatingOut.current ? 
                                    Math.max(0, (characters.length - i) * 0.006) :
                                    i * 0.008,
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
                                marginRight: item.char === ' ' ? '0.1em' : '0.015em',
                                color: item.highlighted ? secondaryColor : initialColor
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