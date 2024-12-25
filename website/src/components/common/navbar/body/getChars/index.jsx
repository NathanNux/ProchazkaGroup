import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef } from 'react';

const textExplosionHover = (initialColor) => ({
    initial: {
        scale: 1,
        opacity: 0.65,
        color: initialColor
    },
    enter: (i) => ({
        scale: [1, 1.1, 1], // Increased scale value for more pronounced effect
        opacity: 1,
        color: [initialColor, '#00F0FF', initialColor],
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: i[0],
            scale: { times: [0, 0.5, 1], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[0] + 0.2 },
            color: { times: [0, 0.5, 1], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[0] + 0.2 }
        }
    }),
    exit: (i) => ({
        opacity: 0.65,
        scale: [1, 1, 1.1], // Increased scale value for more pronounced effect
        color: [initialColor, initialColor, '#00F0FF'],
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: i[1],
            scale: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1] + 0.2 },
            color: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1] + 0.2 }
        }
    }),
});

const GetChars = ({ text, selectedLink, index, initialColor }) => {
    const charRefs = useRef([]);
    let chars = [];

    useEffect(() => {
        // Initialize refs array
        charRefs.current = charRefs.current.slice(0, text.length);
    }, [text]);

    text.split('').forEach((char, i) => {
        if (char === ' ') {
            // Render a non-animated space
            chars.push(
                <span
                    key={`space-${i}`}
                    style={{
                        display: 'inline-block',
                        width: '0.3em',
                    }}
                >
                    &nbsp;
                </span>
            );
        } else {
            chars.push(
                <motion.span
                    key={`${char}-${i}`}
                    ref={(el) => (charRefs.current[i] = el)}
                    variants={textExplosionHover(initialColor)}
                    custom={[i * 0.02, (text.length - i) * 0.02]}
                    initial="initial"
                    animate={
                        selectedLink.isActive && selectedLink.index === index
                            ? 'enter'
                            : 'exit'
                    }
                    onAnimationComplete={() => {
                        if (
                            !selectedLink.isActive ||
                            selectedLink.index !== index
                        ) {
                            if (charRefs.current[i]) {
                                charRefs.current[i].style.color = initialColor;
                                charRefs.current[i].style.transform = 'scale(1)';
                            }
                        }
                    }}
                    style={{ display: 'inline-block', marginRight: '0.02em' }}
                >
                    {char}
                </motion.span>
            );
        }
    });

    return <Fragment>{chars}</Fragment>;
};

export default GetChars;