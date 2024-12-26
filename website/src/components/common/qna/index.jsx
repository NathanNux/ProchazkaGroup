import MainText from "@/components/anim/TextAnims/MainText"
import { qnas } from "@/constants/pages/qna"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

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
    const [openStates, setOpenStates] = useState(new Array(qnas.length).fill(false))

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
                    <MainText initialColor={'#050A10'} text="MÁTE NĚJAKÝ DOTAZ? NĚKTERÉ Z NICH JSME UŽ ZODPOVĚZELI." />
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
                        onClick={() => toggleQNA(index)}
                        initial={false}
                    >
                        <motion.div 
                            className="QNA__item__header"
                        >
                            <h3>{qna.question}</h3>
                            <motion.div 
                                className="QNA__item__header__icon"
                                animate={{ rotate: openStates[index] ? 90 : 0 }}
                            >
                                <Image src='/assets/QNA.png' alt='icon' width={25} height={25}/>
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
                                    <p>{qna.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}