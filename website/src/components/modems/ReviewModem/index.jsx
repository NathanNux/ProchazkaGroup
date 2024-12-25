import RoundButton from "@/components/Sticky/buttons/RoundButton"
import SVGButton from "@/components/Sticky/buttons/SvgButton"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
const people = [
    {
        name: 'Václav Procházka',
        likes: '506',
        reviews: '25',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/cactus.webp',
        alt: 'person1',
    },
    {
        name: 'Ondřej Efenberk',
        likes: '340',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/house.webp',
        alt: 'person2',
    },
    {
        name: 'Michaela Marková',
        likes: '400',
        reviews: '30',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/rock.webp',
        alt: 'person2',
    },
    {
        name: 'Tereza Marková',
        likes: '200',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/water.webp',
        alt: 'person3',
    },
    {
        name: 'Zdeněk Kafka',
        likes: '158',
        reviews: '18',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/tree.webp',
        alt: 'person4',
    }
]
const modemAnim = {
    open: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        },
    },
    closed: {
        x: "-100%",
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        },
    }
}


const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

const menuVariants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        scaleX: 1,
        scaleY: 1,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
            // Sequence the animations
            scaleX: { duration: 0.3, ease: "circOut" },
            scaleY: { duration: 0.4, delay: 0.2, ease: "circOut" }
        }
    },
    closed: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
        scaleX: 0,
        scaleY: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
        }
    }
}

export default function ReviewModem ({ isOpen, setIsOpen}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)

    const activeIndex = previewIndex ?? currentIndex
    return(
        <motion.section 
            className="ReviewModem"
            initial={{ x: "100%", opacity: 0}}
            animate="open"
            exit="closed"
            variants={modemAnim}
        >
            <div className="button" onClick={() => setIsOpen(!isOpen)}>
                <SVGButton src='/svg/arrow-left.svg' altText='close_icon'/>
                <p>Zrušit</p>
            </div>

            <div className="checkUp">
                <div className="Personal">
                    <div className="Personal__container">
                        <div className="ImageConatiner">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={activeIndex}
                                    className="image"
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Image 
                                        src={people[activeIndex].src} 
                                        alt={people[activeIndex].alt} 
                                        fill={true}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="Info__container">
                            <div className="moto">
                                
                                <div className="moto__text">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {people[activeIndex].moto}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                <div className="moto__name">
                                    <div className="devider"/>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {people[activeIndex].name}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <div className="stats">
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={activeIndex}
                                            className="ThumsUp"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ 
                                                duration: 0.2,
                                                delay: 0.1
                                            }}
                                        >
                                            <p>{people[activeIndex].likes}</p>
                                            <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={35} height={35} style={{ paddingBottom: 5}}/> 
                                        </motion.div>
                                    </AnimatePresence>

                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={activeIndex}
                                            className="Comments"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ 
                                                duration: 0.2,
                                                delay: 0.15
                                            }}
                                        >
                                            <p>{people[activeIndex].reviews}</p>
                                            <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={35} height={35} style={{ paddingBottom: 5}}/> 
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="CheckUpForm">
                <div className="form">
                    <div className="form__inputs">
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="input__container">
                                <h3>Δ</h3>
                                <label>Jméno:</label>
                                <input type="text" placeholder="Vaše jméno"/>
                            </div>
                        </div>
                        
                        <div className="person__selection">
                            <div className="form__devider"/>
                            <div className="input__container__wrapper">
                                <div className="header__input">
                                    <div className="index">
                                        <h3>Γ</h3>
                                    </div>
                                    <p>Na Koho (#):</p>
                                </div>
                                <div className="person__container">
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={activeIndex} 
                                            className="name"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ 
                                                duration: 0.2,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <p>{people[activeIndex].name}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                
                                <div className="buttons">
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="menu__button"
                                    >
                                        <motion.div
                                            variants={{
                                                open: { rotate: 180 },
                                                closed: { rotate: 90 }
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Image src='/svg/arrow-left.svg' alt="arrow" width={30} height={30} />
                                        </motion.div>
                                    </motion.button>
                    
                                    <motion.nav
                                        initial={false}
                                        animate={menuOpen ? "open" : "closed"}
                                        className="person__menu"
                                        variants={menuVariants}
                                    >
                                        <motion.ul
                                            variants={menuVariants}
                                            className="menu__list"
                                        >
                                            {people.map((person, index) => (
                                                <motion.li
                                                    key={index}
                                                    variants={itemVariants}
                                                    onHoverStart={() => setPreviewIndex(index)}
                                                    onHoverEnd={() => setPreviewIndex(null)}
                                                    onClick={() => {
                                                        setCurrentIndex(index)
                                                        setMenuOpen(false)
                                                        setPreviewIndex(null)
                                                    }}
                                                >
                                                    {person.name}
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.nav>
                                </div>
                            </div>
                        </div>
                
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="input__container">
                                <h3>λ</h3>
                                <label>Váš Názor:</label>
                                <textarea placeholder="Váš Názor"/>
                            </div>
                        </div>
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="text__container">
                                <p>Klinutím na “poslat žádost” souhlasíte se zpracováním vašich osobních údajů</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cta">
                    <div className="button">
                        <RoundButton href='' text='Poslat Zprávu'/>
                    </div>
                    <div className="devider"/>
                </div>
            </div>
        </motion.section>
    )
}