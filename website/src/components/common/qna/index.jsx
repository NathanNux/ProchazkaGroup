import MainText from "@/components/anim/TextAnims/MainText"
import { qnas } from "@/constants/pages/qna"
import { AnimatePresence, motion, useInView } from "framer-motion"
import Image from "next/image"
import { useState, useRef } from "react"
import GetChars from "../navbar/body/getChars"
import { usePerformance } from "@/context/PerformanceProvider"

const contentVariants = {
    open: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
}

export default function QNA() {
    const [openStates, setOpenStates] = useState(new Array(qnas.length).fill(false));
    const [selectedItem, setSelectedItem] = useState({ isActive: false, index: 0 });

    const toggleQNA = (index) => {
        setOpenStates(prev => {
            const newStates = [...prev]
            newStates[index] = !newStates[index]
            return newStates
        })
    }
    return (
        <section className="QNA">
            <div className="QNA__Intro">
                <div className="QNA__MainText">
                    <MainText initialColor={'#050A10'} secondaryColor={'#FF5733'} text="<span>MÁTE NĚJAKÝ DOTAZ?</span> NĚKTERÉ<br />Z NICH JSME UŽ ZODPOVĚZELI." />
                </div>
                <div className="QNA__Header">
                    <div className="QNA__Header__container">
                        <h2>04</h2>
                        <p>
                            Vše, na co se naši klienti <br /> nejčastěji ptají 
                        </p>
                    </div>
                    <div className="devider"/>
                </div>
            </div>
            <div className="QNA__wrapper">
                {qnas.map((qna, index) => (
                    <motion.div 
                        key={`qna${index}`} 
                        className="QNA__item"
                        initial={false}
                    >
                        <motion.div 
                            className="QNA__item__header"
                            onMouseEnter={() => setSelectedItem({ isActive: true, index })}
                            onMouseLeave={() => setSelectedItem({ isActive: false, index })}
                        >
                            <motion.h3 onClick={() => toggleQNA(index)}>
                                <GetChars
                                    text={qna.question}
                                    selectedLink={selectedItem}
                                    index={index}
                                    initialColor={'#fff'}
                                />
                            </motion.h3>
                            <motion.div 
                                className="QNA__item__header__icon"
                                animate={{ rotate: openStates[index] ? 90 : 0 }}
                                onClick={() => toggleQNA(index)}
                            >
                                <Image src='/assets/QNA.png' alt='icon' width={25} height={25} priority={false} quality={60} loading="lazy"/>
                            </motion.div>
                        </motion.div>
                        <AnimatePresence initial={false}>
                            {openStates[index] && (
                                <motion.div 
                                    className="QNA__item__content"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={contentVariants}
                                >
                                    <div className="devider"/>
                                    <SubText text={qna.answer} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
const parseWords = (text) => {
    return text.split(/(<br\/>)/).map((segment, index) => {
        return segment === '<br/>' ? 
            { type: 'break' } : 
            { type: 'text', content: segment.split(' ') };
    });
};

function SubText({text, className}) {
    // Performance
    const { shouldReduceAnimations } = usePerformance();

    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-2% 0px -2% 0px",
        amount: 0.2,
        once: false
    });

    const segments = text.split(/(<br\/>)/).map((segment, index) => {
        return segment === '<br/>' ? { type: 'break' } : { type: 'text', content: segment };
    });

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
                                        marginRight: '0.25em'
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
                                delay: i * 0.004, // Forward animation only
                                ease: [0.215, 0.61, 0.355, 1],
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