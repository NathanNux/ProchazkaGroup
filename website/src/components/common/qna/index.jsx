import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const qnas = [
    {
        question: "What services do you specialize in?",
        answer: "We specialize in web development, mobile app development, and digital transformation solutions. Our expertise spans across frontend and backend development, UI/UX design, and cloud infrastructure."
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while complex applications can take 3-6 months. We provide detailed timeline estimates during our initial consultation."
    },
    {
        question: "Do you offer ongoing support after project completion?",
        answer: "Yes, we provide comprehensive post-launch support and maintenance packages. This includes bug fixes, security updates, performance optimization, and feature enhancements based on your needs."
    },
    {
        question: "What technologies do you work with?",
        answer: "We work with modern tech stacks including React, Node.js, Python, AWS, and various other frameworks. Our team stays current with industry trends to deliver cutting-edge solutions."
    },
    {
        question: "What is your project development process?",
        answer: "Our process follows an agile methodology with clear phases: Discovery, Planning, Design, Development, Testing, and Deployment. We maintain transparent communication and regular updates throughout the project lifecycle."
    }
]

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
                    <h3>
                        MÁTE NĚJAKÝ DOTAZ? 
                        NĚKTERÉ Z NICH JSME UŽ ZODPOVĚZELI.
                    </h3>
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
                        key={index} 
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