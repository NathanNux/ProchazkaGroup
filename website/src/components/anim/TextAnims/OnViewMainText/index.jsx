import { motion } from "framer-motion";


const textExplosionHover = (initialColor) => ({
    initial: {
        scale: 1,
        opacity: 0.65,
        color: initialColor
    },
    enter: (i) => ({
        scale: [1, 1.3, 1], // Increased scale value for more pronounced effect
        opacity: 1,
        color: [initialColor, '#00F0FF', initialColor],
        transition: {
            duration: 0.1,
            ease: [0.76, 0, 0.24, 1],
            delay: i[0],
            scale: { times: [0, 0.5, 1], duration: 0.2, ease: [0.76, 0, 0.24, 1], delay: i[0] },
            color: { times: [0, 0.5, 1], duration: 0.2, ease: [0.76, 0, 0.24, 1], delay: i[0] }
        }
    }),
    exit: (i) => ({
        opacity: 0.65,
        scale: [1, 1, 1.3], // Increased scale value for more pronounced effect
        color: [initialColor, initialColor, '#00F0FF'],
        transition: {
            duration: 0.2,
            ease: [0.76, 0, 0.24, 1],
            delay: i[1],
            scale: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1] + 0.3 },
            color: { times: [1, 0.5, 0], duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1] + 0.3 }
        }
    }),
});

const getChars = ({ text, initialColor }) => {
    let chars = [];

    text.split('').forEach((char, i) => {
        if (char === ' ') {
            // Render a non-animated space
            chars.push(
                <span
                    key={`space-${i}`}
                    style={{
                        display: 'inline-block',
                        width: '0.3em', // Adjust spacing as needed
                    }}
                >
                    &nbsp;
                </span>
            ) 
        } else {
            chars.push(
                <motion.span
                    key={char + i}
                    variants={textExplosionHover(initialColor)}
                    custom={[i * 0.02, (text.length - i) * 0.02]}
                    initial="initial"
                    whileInView='enter'
                    exit='exit'
                    viewport={{ once: true }}
                    style={{ display: 'inline-block', marginRight: '0.02em' }}
                >
                    {char}
                </motion.span>
            );
        }
    });
    return chars;
};


export default function onViewMainText() {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    const initialColor = '#fff';
    return (
        <div className="PageHeading__Container">
            <motion.p>
                {getChars({text, initialColor: initialColor})}
            </motion.p>
        </div>
    )
}