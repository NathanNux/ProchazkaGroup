import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/LoadProvider";

const textExplosionHover = (initialColor, firstLoad, isHighlighted) => ({
    initial: {
        scale: 1,
        opacity: 0.65,
        color: isHighlighted ? '#00F0FF' : initialColor
    },
    enter: (i) => {
        const baseDelay = firstLoad ? 5.9 + i[0] : 2 + i[0];
        return {
            scale: [1, 1.3, 1], 
            opacity: 1,
            color: isHighlighted ? 
                ['#00F0FF', '#00F0FF', '#00F0FF'] : 
                [initialColor, '#00F0FF', initialColor],
            transition: {
                duration: 0.1,
                ease: [0.76, 0, 0.24, 1],
                delay: baseDelay,
                scale: { times: [0, 0.5, 1], duration: 0.2, ease: [0.76, 0, 0.24, 1], delay: baseDelay },
                color: { times: [0, 0.5, 1], duration: 0.2, ease: [0.76, 0, 0.24, 1], delay: baseDelay }
            }
        }
    },
    exit: (i) => {
        const baseDelay = firstLoad ? 6.4 + i[1] : 2.5 + i[1];
        return {
            opacity: 0.65,
            scale: [1, 1, 1.3],
            color: isHighlighted ? 
                ['#00F0FF', '#00F0FF', '#00F0FF'] : 
                [initialColor, initialColor, '#00F0FF'],
            transition: {
                duration: 0.2,
                ease: [0.76, 0, 0.24, 1],
                delay: baseDelay,
                scale: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: baseDelay },
                color: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: baseDelay }
            }
        }
    }
});

const parseText = (text) => {
    // Split text into segments (normal text, <br/>, and spans)
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

const getChars = ({ text, initialColor, firstLoad }) => {
    const segments = parseText(text);
    let charIndex = 0;
    
    return (
        <motion.p>
            {segments.map((segment, segIndex) => {
                if (segment.type === 'break') {
                    return <br key={`br-${segIndex}`} />;
                }
                
                return segment.content.split('').map((char, i) => {
                    if (char === ' ') {
                        charIndex++;
                        return (
                            <span
                                key={`space-${segIndex}-${i}`}
                                style={{
                                    display: 'inline-block',
                                    width: '0.3em'
                                }}
                            >
                                &nbsp;
                            </span>
                        );
                    }
                    
                    const currentIndex = charIndex++;
                    return (
                        <motion.span
                            key={`${char}-${segIndex}-${i}`}
                            variants={textExplosionHover(initialColor, firstLoad, segment.highlighted)}
                            custom={[currentIndex * 0.0125, (text.length - currentIndex) * 0.0125]}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            style={{ display: 'inline-block', marginRight: '0.02em' }}
                        >
                            {char}
                        </motion.span>
                    );
                });
            })}
        </motion.p>
    );
};

export default function PageHeading({ text }) {
    const initialColor = '#fff';
    const { firstLoad } = useGlobalContext();
    return (
        <div className="PageHeading__Container">
            {getChars({text, initialColor: initialColor, firstLoad: firstLoad})}
        </div>
    );
}