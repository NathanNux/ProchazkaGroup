import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useContactForm } from '@/hooks/useContactForm'
import { useToast } from '@/hooks/use-toast'


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
export default function ContactModem({ 
    isOpen, 
    setIsOpen, 
    people,
    currentIndex,
    setCurrentIndex,
    activeIndex,
    previewIndex,
    setPreviewIndex
}) {
    const { toast } = useToast()
    const {
        formData,
        setFormData,
        loading,
        handleSubmit: handleContactSubmit
    } = useContactForm()
    const [menuOpen, setMenuOpen] = useState(false)
    // Set default person on mount
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            selectedPerson: people[0].name,
        }))
    }, [])

    const handleSubmit = async (e) => {
        e?.preventDefault()
        
        const result = await handleContactSubmit()
        
        toast({
            title: result.success ? "Úspěch!" : "Chyba!",
            description: result.message,
            variant: result.success ? "success" : "destructive"
        })

        if (result.success) {
            setIsOpen(false)
        }
    }

    return(
        <motion.section 
            className="ContactModem"
            initial={{ x: "100%", opacity: 0}}
            animate="open"
            exit="closed"
            variants={modemAnim}
        >
            <div className="button" onClick={() => setIsOpen(!isOpen)}>
                <SVGButton src='/svg/exit.svg' altText='close_icon'/>
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
                                            <Image  src='/svg/thumbsup.svg' alt="thumbsUp_icon" width={35} height={35} style={{ paddingBottom: 5}}/> 
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
                                            <Image  src='/svg/comment.svg' alt="reviews__icon" width={35} height={35} style={{ paddingBottom: 5}}/> 
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="map">
                    <div className="mapHeader">
                        <p>Kde nás najdete | mapa</p>
                        <Image  src='/svg/mapIcon.svg' alt='map_icon' width={35} height={35}/>
                    </div>
                    <div className="mapImage">
                                
                    </div>
                </div>
            </div>

            <div className="CheckUpForm">
                <div className="header">
                    <h3>
                        03
                    </h3>
                    <p>
                     Tolik spokojených lidí není náhoda - je to důkaž, že to opravdu funguje. Nic lepšího tu už není 
                    </p>
                </div>
                <div className="form">
                    <div className="form__inputs">
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="input__container">
                                <h3>Δ</h3>
                                <label>Jméno:</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                    placeholder="Vaše jméno"
                                />
                            </div>
                        </div>
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="input__container">
                                <h3>ζ</h3>
                                <label>E-mail:</label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                    placeholder="Váš email"
                                />
                            </div>
                        </div>
                        <div className="input__container">
                            <div className="form__devider"/>
                            <div className="input__container">
                                <h3>π</h3>
                                <label>Telefon:</label>
                                <input 
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))}
                                    placeholder="+420"
                                />
                            </div>
                        </div>
                        
                        <div className="person__selection">
                            <div className="form__devider"/>
                            <div className="input__container">
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
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            selectedPerson: person.name
                                                        }))
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
                                <label>Zpráva:</label>
                                <textarea 
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        message: e.target.value
                                    }))}
                                    placeholder="Vaše zpráva"
                                />
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
                    <RoundButton 
                        href='' 
                        text={loading ? 'Odesílám...' : 'Poslat Zprávu'} 
                        disableLink={true}
                        onClick={handleSubmit}
                    />
                    </div>
                    <div className="devider"/>
                </div>
            </div>

            <div className="addInfo">
                <div className="text">
                    <p>
                        Potřebujte nás hned?
                    </p>
                    <p>
                        | 8-16 
                    </p>
                </div>
                <div className="link">
                    <p>
                        +420 777 898 157
                    </p>
                </div>
            </div>
        </motion.section>
    )
}