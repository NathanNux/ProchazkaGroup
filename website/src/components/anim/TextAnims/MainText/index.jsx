import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";

// Linear Interpolation function
const lerp = (start, end, t) => start + t * (end - start);

const AnimatedWord = ({ char, progress, animationOffset, initialColor, isHighlighted }) => {
    const scale = useTransform(
        progress,
        [
            animationOffset,
            animationOffset + 0.15,
            animationOffset + 0.3,
            animationOffset + 0.45,
            animationOffset + 0.6
        ],
        [1, 1.1, 1.3, 1.1, 1]
    );
    const color = useTransform(
        progress,
        [
            animationOffset,
            animationOffset + 0.15,
            animationOffset + 0.3,
            animationOffset + 0.45,
            animationOffset + 0.6
        ],
        isHighlighted 
            ? ['#00F0FF', '#00F0FF', '#FF5733', '#00F0FF', '#00F0FF'] // Fixed color for highlighted text
            : [initialColor, '#00F0FF', '#FF5733', '#00F0FF', initialColor]
    );
    const opacity = useTransform(progress, [animationOffset + 0.1, animationOffset + 0.3], [0.65, 1]);

    return (
        <motion.span
            style={{
                display: 'inline-block',
                marginRight: '0.02em',
                scale,
                opacity,
                color
            }}
            className={isHighlighted ? 'highlighted' : ''}
        >
            {char}
        </motion.span>
    );
};

const parseText = (text) => {
    return text.split(/(<br \/>|<span>.*?<\/span>)/).filter(Boolean).map(segment => {
        if (segment === '<br />') {
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

const getCharsWithBrAndSpans = ({ text, initialColor, progress }) => {
    const segments = parseText(text);
    let allChars = [];
    let charIndex = 0;

    segments.forEach((segment, i) => {
        if (segment.type === 'break') {
            allChars.push({ char: '<br />', isHighlighted: false });
        } else {
            segment.content.split('').forEach(char => {
                allChars.push({ 
                    char, 
                    isHighlighted: segment.highlighted 
                });
                charIndex++;
            });
        }
    });

    const totalChars = allChars.length;
    const animationOffsets = allChars.map((_, i) => lerp(0, 1, i / totalChars) * 0.2);

    return (
        <>
            {allChars.map((item, charIndex) => (
                <Fragment key={charIndex}>
                    {item.char === '<br />' ? (
                        <br key={`br-${charIndex}`} />
                    ) : item.char === ' ' ? (
                        <span key={`space-${charIndex}`}>&nbsp;</span>
                    ) : (
                        <AnimatedWord
                            char={item.char}
                            progress={progress}
                            animationOffset={animationOffsets[charIndex]}
                            initialColor={initialColor}
                            isHighlighted={item.isHighlighted}
                        />
                    )}
                </Fragment>
            ))}
        </>
    );
};
export default function MainText({text, initialColor}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 1.1", "start start"]
    });

    return (
        <div className="MainTextV3__Main" ref={ref}>
            <div className="MainText__Container">
                <motion.p>
                    {getCharsWithBrAndSpans({ text, initialColor: initialColor, progress: scrollYProgress })}
                </motion.p>
            </div>
        </div>
    );
}
