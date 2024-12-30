
import SubText from "@/components/anim/TextAnims/SubText"
import ContactModem from "@/components/modems/ContactModem"
import CopyText from "@/components/ui/copyText"
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton"
import CustomImage from "@/components/ui/stickyImage"
import { people } from "@/constants/people"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

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

export default function Contact() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)

    const activeIndex = previewIndex ?? currentIndex
    const [isMobile, setIsMobile] = useState(false)
    const { toast } = useToast()
    
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }, [])

    const handleCopyName = async () => {
        if (isMobile) {
            window.location.href = `tel:${people[activeIndex].tel}`
            return
        }

        try {
            await navigator.clipboard.writeText(people[activeIndex].name)
            toast({
                title: "Úspěch!",
                description: "Jméno bylo zkopírováno do schránky",
                variant: "success"
            })
        } catch (err) {
            toast({
                title: "Chyba!",
                description: "Kopírování se nezdařilo",
                variant: "destructive"
            })
        }
    }

    const handleMessage = () => {
        const activePerson = people[activeIndex]
        
        if (!activePerson || !activePerson.tel) {
            toast({
                title: "Chyba!",
                description: "Telefonní číslo není k dispozici",
                variant: "destructive"
            })
            return
        }
    
        const message = `Dobrý den, mám zájem o více informací o vašich službách.`
        const phoneNumber = activePerson.tel.replace(/\s/g, '')
        
        try {
            if (isMobile) {
                window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            } else {
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
            }
        } catch (err) {
            toast({
                title: "Chyba!",
                description: "Nepodařilo se otevřít WhatsApp",
                variant: "destructive"
            })
        }
    }



    return (
        <section className="ContactMain">
            <div className="Contact__Personal">
                <div className="Contact__Personal__header">
                    <h3>
                        03
                    </h3>
                    <p>
                        Tolik spokojených lidí není náhoda - je to důkaz, že <br /> to opravdu funguje. Nic lepšího tu už není 
                    </p>
                </div>

                <div className="Contact__Personal__choice">
                    <div className="Contact__Personal__choice__container">
                        {people.map(( person, i) => {
                            const { name, likes, reviews, moto, src, alt } = person

                            return (
                                <div className="Contact__Personal__choice__wrapper" key={i}>
                                    <div className="Contact__Personal__choice__image__container" key={i} style={{ zIndex: 1 + i}}>
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={activeIndex}
                                                className="Contact__Personal__choice__image"
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Image src={people[activeIndex].src} alt={people[activeIndex].alt} fill={true}/>
                                            </motion.div>
                                            </AnimatePresence>
                                            
                                    </div>
                                    <div className="Contact__Personal__choice__Data__container">
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={activeIndex}
                                                className="Moto"
                                                initial={{ opacity: 0, y: -50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -50 }}
                                                transition={{ 
                                                    duration: 0.2,
                                                    delay: 0.05
                                                }}
                                            >
                                                <CopyText text={people[activeIndex].name} type={'phone'} />
                                            </motion.div>
                                        </AnimatePresence>
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
                                                    <Image  src='/svg/thumbsup.svg' alt="thumbsUp_icon" width={50} height={50}/> 
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
                                                    <Image  src='/svg/comment.svg' alt="reviews__icon" width={50} height={50}/> 
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                   
                    <div className="Contact__choice__Input">
                        <div  className="devider"/>
                        <div className="header">
                            <div className="index">
                                <h3>Γ</h3>
                            </div>
                            <p>Váš Poradce:</p>
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
                                        open: { rotate: -90 },
                                        closed: { rotate: 0 }
                                    }}
                                    initial="closed"
                                    animate={menuOpen ? "open" : "closed"}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                        <div  className="devider"/>
                    </div>
                </div>

                <div className="contact__wrapper">
                    <div className="Contact__CTA__buttons">
                        <div className="Contact__CTA__buttons__container">
                            <div className="cta__button" onClick={handleCopyName}>
                                <SVGButton src='/svg/phoneIcon.svg' altText='CallIcon' />
                            </div>
                            <div className="cta__button" onClick={handleMessage}>
                                <SVGButton src='/svg/MessageIcon.svg' altText='TextIcon' />
                            </div>
                        </div>
                        <div className="devider"/>
                    </div>

                    <div className="additional__wrapper">
                        <div className="Contact__CTA__optional">
                            <p className="infoText">Jste více tradiční?</p>
                            <div className="devider__vertical"/>
                            <div className="Button" onClick={() => setIsOpen(true)}>
                                <RoundButton href='/' text='Použít E-mail' />
                            </div>
                        </div>
                        <div className="Contact__Personal__addInfo">
                            <div className="addInfo__text">
                                <p>Potřebujete Poradit?</p>
                                <p> | 8-16</p>
                            </div>
                            <div className="addInfo__phoneNumber">
                                <CopyText text={'+420 777 898 157'} type={'phone'} />                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Contact__CTA">
                <div className="Contact__CTA__Header">
                    <SubText initialColor="#fff" secondaryColor="#00F0FF" text={'Je to na vás... <span>Finanční nezávislost,</span><br/>nebo další roky na místě?<br/><span>Přidejte se k našim 3000+ klientům</span>, kteří už dávno <span>začali vyhrávat.</span>'}/>
                </div>

                <div className="map__container">
                    <div className="header">
                        <p>Kde nás najdete | mapa</p>

                        <Image src='/svg/mapIcon.svg' alt="map_icon" width={40} height={40}/>
                    </div>
                    <div className="map">
                        <div className="map_sim">
                            <CustomImage src='/svg/house.webp' altText='map'/>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <ContactModem 
                        setIsOpen={setIsOpen} 
                        isOpen={isOpen}
                        people={people}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        activeIndex={activeIndex}
                        previewIndex={previewIndex}
                        setPreviewIndex={setPreviewIndex}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}