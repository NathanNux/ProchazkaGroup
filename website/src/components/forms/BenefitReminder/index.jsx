import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const people = [
    {
        name: 'Václav Procházka',
        tel: '+420 776 127 934',
        likes: '506',
        reviews: '25',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/cactus.webp',
        alt: 'person1',
    },
    {
        name: 'Ondřej Efenberk',
        tel: '+420 606 564 934',
        likes: '340',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/house.webp',
        alt: 'person2',
    },
    {
        name: 'Michaela Marková',
        tel: '+420 776 827 244',
        likes: '400',
        reviews: '30',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/rock.webp',
        alt: 'person2',
    },
    {
        name: 'Tereza Marková',
        tel: '+420 776 425 389',
        likes: '200',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/water.webp',
        alt: 'person3',
    },
    {
        name: 'Zdeněk Kafka',
        tel: '+420 774 213 546',
        likes: '158',
        reviews: '18',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/tree.webp',
        alt: 'person4',
    }
]

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

export default function BenefitReminder() {
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)

    const activeIndex = previewIndex ?? currentIndex
    return (
        <section className="BenefitReminder"> 
            <div className="BenefitReminder__Header">
                <div className="Main__text">
                    <h2>NEPŘEDSTAVUJETE JIM JENOM TENHLE PROGRAM — OTEVÍRÁTE JIM DVEŘE K LEPŠÍ BUDOUCNOSTI SPOLEČNĚ S NÁMI.</h2>
                </div>
                <div className="Header">
                    <div className="Header__wrapper">
                        <h3>
                            01
                        </h3>
                        <p>
                            80 % našich členů získá svou první odměnu do dvou týdnů. Co vás zpomaluje? Nečekejte. Přidejte se, doporučte a začněte získávat.
                        </p>
                    </div>
                </div>
            </div>
            <div className="BenefitReminder__Personal__wrapper">
                <div className="BenefitReminder__Personal__choice">
                    <div className="devider"/>
                    <div className="devider__bottom"/>
                        <div className="BenefitReminder__Personal__choice__container">
                            {people.map(( person, i) => {
                                const { name, likes, reviews, moto, src, alt } = person

                                return (
                                    <div className="BenefitReminder__Personal__choice__wrapper" key={i}>
                                        <div className="BenefitReminder__Personal__choice__image__container" key={i} style={{ zIndex: 1 + i}}>
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={activeIndex}
                                                    className="BenefitReminder__Personal__choice__image"
                                                    initial={{ opacity: 0, x: -100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Image src={people[activeIndex].src} alt={people[activeIndex].alt} fill={true}/>
                                                </motion.div>
                                                </AnimatePresence>
                                                
                                        </div>
                                        <div className="BenefitReminder__Personal__choice__Data__container">
                                            <div className="BenefitReminder__choice__Input">
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
                                                            <p>| {people[activeIndex].name}</p>
                                                            <p>{people[activeIndex].tel}</p>
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
                                            <div className="Reviews_stats">
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
                                                        <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={50} height={50} style={{ backgroundColor: '#000'}}/> 
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
                                                        <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={50} height={50} style={{ backgroundColor: '#000'}}/> 
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    
                    </div>
            </div>  

            <div className="CTA__Wrapper">
                <div className="devider__line"/>
                <div className="button__wrapper">
                    <RoundButton href='#' text='Zapojit se hned'/>
                </div> 
            </div>
                    
        
            <div className="Footer__wrapper">
                <h2>?</h2>
                <p>Nejste našimi Klienty?</p>
                <div className="svg__container">
                    <Image src='/svg/ArrowDown.svg' alt="arrow-down" height={60} width={30}/>
                </div>
            </div>   
        </section>
    )
}