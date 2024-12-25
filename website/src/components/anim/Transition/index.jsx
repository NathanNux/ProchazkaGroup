'use client'
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from "@/context/LoadProvider";
import Preloader from "../PreLoader";


const childrenWrapper = {
    initial: {
        opacity: 1,
        y: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 1,
        y: 20,
        transition: {
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.5
        }
    }
}
const background = {
    initial: {
        x: '0'
    },
    enter: {
        x: '-100%',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.5}
    },
    exit: {
        x: '0',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
    }
}

const PathnameText = {
    initial: {
        x: '0',
        opacity: 1,
    },
    enter: {
        x: '-800%',
        opacity: 0,
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3},
    },
    exit: {
        x: '0',
        opacity: 1,
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.5}
    }
}

const rowSlide = {
    initial: {
      x: '0',
    },
    enter: (i) => ({
      x: '-100%',
      transition: { 
        duration: 0.5, 
        ease: [0.76, 0, 0.24, 1], 
        delay: ((rows.length - i - 1) * 0.1 ) + 0.3 },
    }),
    exit: (i) => ({
      x: '0',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: (i * 0.15 ) + 0.3  },
    }),
};
const textExplosionHover = (initialColor) => ({
    initial: {
        scale: 1,
        opacity: 0.5,         // Start with opacity 0.5
        color: initialColor,
        y: 50                 // Start positioned below
    },
    enter: (i) => ({
        scale: 1,             // Maintain scale during enter
        opacity: 1,           // Fade in to full opacity
        color: initialColor,
        y: 0,                 // Move up to original position
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
            delay: i[0],
            opacity: { 
                duration: 0.4, 
                ease: 'easeOut',
                delay: i[0] 
            },
            y: { 
                duration: 0.4, 
                ease: 'easeOut',
                delay: i[0] 
            }
        }
    }),
    exit: (i) => ({
        scale: 1,             // Maintain scale during exit
        opacity: [1, 1, 0.5], // Fade out to opacity 0.5 in the last 10%
        color: [initialColor, initialColor, '#00F0FF'],
        y: [0, 25, 50],       // Move down from midpoint to y:50 in the last 10%
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
            delay: i[1],
            opacity: { 
                times: [0, 0.9, 1], // Trigger opacity change in the last 10%
                duration: 0.4, 
                ease: 'easeIn',
                delay: i[1] 
            },
            y: { 
                times: [0, 0.9, 1], // Trigger y movement in the last 10%
                duration: 0.4, 
                ease: 'easeIn',
                delay: i[1] 
            }
        }
    })
});

const getChars = ({ text, initialColor }) => {
    if (!text) {
        console.warn('getChars: "text" is undefined or null.');
        return null; // Or return a default value/component
    }

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
            );
        } else {
            chars.push(
                <motion.span
                    key={`${char}-${i}`}
                    variants={textExplosionHover(initialColor)}
                    custom={[i * 0.02, (text.length - i) * 0.02]}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="char"
                    style={{ display: 'inline-block', marginRight: '0.02em' }}
                >
                    {char}
                </motion.span>
            );
        }
    });

    return chars;
};

const routes = {
    '/': 'Domov',
    '/benefit-program': 'Benefit program',
    '/prilezitosti': 'Příležitosti',
    '/nas-pribeh': 'Náš příběh',
    '/recenze': 'Recenze',
    '/kontakt': 'Kontakt',
}
const rows = [
    {
        number: 0,
    },
    {
        number: 1,
    },
    {
        number: 2,
    }
]


export default function Transition ({ children }) {
    const pathname = usePathname();
    const routeText = routes[pathname] || 'Not Loaded';
    const { preloaderRun, firstLoad } = useGlobalContext();

  return (
    <AnimatePresence mode="wait">
        <motion.div 
            className="Transition__main"
            key={pathname}
        >
            <motion.div
                className='Transition__body__background'
                variants={background}
                initial='initial'
                animate='enter'
                exit='exit'
            ></motion.div>
            <motion.div 
                className='Transition__rows__container'
                variants={background}
                initial='initial'
                animate='enter'
                exit='exit'
            >
                {rows.map((row, index) => {
                    const { number } = row;
                    return (
                    <motion.div
                        key={number}
                        className='navbar__body__row'
                        variants={rowSlide}
                        initial='initial'
                        animate='enter'
                        exit='exit'
                        custom={index} //ensure the index is passed as a custom prop
                    ></motion.div>
                    );
                })}
            </motion.div>
            {/* Page Text */}
            <motion.div 
                className="Transition__PageText"
                variants={PathnameText}
                initial='initial'
                animate='enter'
                exit='exit'
            >
                <p>
                    {getChars({ text: routeText, initialColor: '#fff' })}
                </p>
            </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
            {firstLoad && pathname === '/' && <Preloader number={100} staggers={8} key='preloader'/>}
        </AnimatePresence>
            {children}  
    </AnimatePresence>
  );
}