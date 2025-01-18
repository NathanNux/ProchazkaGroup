
import SubText from "@/components/anim/TextAnims/SubText"
import ContactModem from "@/components/modems/ContactModem"
import CopyText from "@/components/ui/copyText"
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton"
import CustomImage from "@/components/ui/stickyImage"
import { people as staticPeople } from "@/constants/people"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useFetchDatabase } from "@/hooks/useFetchDatabase"

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
//WIP: Nahradit Jména Jménama z databáze

export default function Contact() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)
    const [peopleData, setPeopleData] = useState(staticPeople)
    const sectionRef = useRef()
    
    const { scrollYProgress: phoneScrollProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end 0.7'],
    })

    const { scrollYProgress: messageScrollProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end 0.7'],
    })

    const phoneX = useTransform(
        phoneScrollProgress,
        [0, 0.5, 1], 
        [400, -100, -200]
    )

    const messageX = useTransform(
        messageScrollProgress,
        [0, 0.6, 1], // Slightly delayed
        [500, -50, -150] // Different positions
    )

    const activeIndex = previewIndex ?? currentIndex
    const [isMobile, setIsMobile] = useState(false)
    const { toast } = useToast()
    
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }, [])

    const handleCopyName = async () => {
        if (isMobile) {
            window.location.href = `tel:${peopleData[activeIndex].tel}`
            return
        }

        try {
            await navigator.clipboard.writeText(peopleData[activeIndex].name)
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


    const {fetchPeople} = useFetchDatabase()
            
                // Set default person on mount
                useEffect(() => {
                    const loadPeopleData = async () => {
                        try {
                            const fetchedData = await fetchPeople() // Načtení dat ze supabase
                            const updatedPeople = staticPeople.map(person => {
                                const fetchedPerson = fetchedData.find(p => p.name === person.name)
                                // console.log(fetchedPerson)
                                return {
                                    ...person,
                                    moto: fetchedPerson?.moto ?? person.moto,
                                    likes: typeof fetchedPerson?.likes === 'number' ? fetchedPerson.likes : person.likes,
                                    reviews: typeof fetchedPerson?.reviews === 'number' ? fetchedPerson.reviews : person.reviews,
                                    tel: fetchedPerson?.tel ?? person.tel
                                }
                            })
                            setPeopleData(updatedPeople)
                            // console.log(updatedPeople)
                        } catch (error) {
                            toast({
                                title: "Chyba!",
                                description: "Nepodařilo se načíst data.",
                                variant: "destructive"
                            })
                            // console.log(error)
                        }
                    }
                    loadPeopleData()
                }, [])



    const handleMessage = () => {
        const activePerson = peopleData[activeIndex]
        
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
        <section className="ContactMain" ref={sectionRef}>
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
                        {peopleData.map(( person, i) => {
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
                                                <Image src={peopleData[activeIndex].src} alt={peopleData[activeIndex].alt} fill={true}/>
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
                                                <CopyText text={peopleData[activeIndex].name} type={'phone'} />
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
                                                    <p>{peopleData[activeIndex].likes}</p>
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
                                                    <p>{peopleData[activeIndex].reviews}</p>
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
                                    <p>{peopleData[activeIndex].name}</p>
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
                                    {peopleData.map((person, index) => (
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
                            <motion.div 
                                className="cta__button"
                                style={{ x: phoneX }}
                                onClick={handleCopyName}
                            >
                                <SVGButton src='/svg/phoneIcon.svg' altText='CallIcon' />
                            </motion.div>
                            <motion.div 
                                className="cta__button"
                                style={{ x: messageX }}
                                onClick={handleMessage}
                            >
                                <SVGButton src='/svg/MessageIcon.svg' altText='TextIcon' />
                            </motion.div>
                        </div>
                        <div className="devider"/>
                    </div>

                    <div className="additional__wrapper">
                        <div className="Contact__CTA__optional">
                            <p className="infoText">Jste více tradiční?</p>
                            <div className="devider__vertical"/>
                            <div className="Button" onClick={() => setIsOpen(true)}>
                                <RoundButton href='#' text='Použít E-mail' disableLink={true}/>
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
                    <SubText initialColor="#fff" secondaryColor="#00F0FF" text={'Je to na vás... <span>Finanční nezávislost,</span><br/>nebo další roky na místě?<br/><span>Přidejte se k našim 3000+ klientům</span>,<br/>kteří už dávno <span>začali vyhrávat.</span>'}/>
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
                        people={peopleData}
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