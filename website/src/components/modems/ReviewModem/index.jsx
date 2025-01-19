
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton"
import { people as staticPeople} from "@/constants/people"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useReviewForm } from '@/hooks/useReviewForm'
import { useToast } from '@/hooks/use-toast'
import { useFetchDatabase } from "@/hooks/useFetchDatabase"
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

//WIP: Nahradit Jména Jménama z databáze

export default function ReviewModem ({ isOpen, setIsOpen}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)
    const [peopleData, setPeopleData] = useState(staticPeople) // Přidáno

    const activeIndex = previewIndex ?? currentIndex

    const { toast } = useToast()
    const {
        formData,
        setFormData,
        loading,
        handleSubmit: handleReviewSubmit
    } = useReviewForm()

    
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
                        reviews: typeof fetchedPerson?.reviews === 'number' ? fetchedPerson.reviews : person.reviews
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
            }
        }
        loadPeopleData()
    }, [])

    const handleSubmit = async (e) => {
        e?.preventDefault()
        
        const result = await handleReviewSubmit()
        
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
            className="ReviewModem"
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
                                        src={peopleData[activeIndex].src} 
                                        alt={peopleData[activeIndex].alt} 
                                        fill={true}
                                        sizes="50vw"
                                        quality={100}
                                        priority={false}
                                        loading="lazy"
                                        placeholder="blur"
                                        blurDataURL="data:image/webp"
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
                                            {peopleData[activeIndex].moto}
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
                                            {peopleData[activeIndex].name}
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
                                            <p>{peopleData[activeIndex].likes}</p>
                                            <Image  
                                                src='/svg/thumbsUp.svg' 
                                                alt="thumbsUp_icon" 
                                                width={35} 
                                                height={35} 
                                                style={{ paddingBottom: 5}}
                                                priority={false}
                                                loading="lazy"
                                                quality={60}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg"
                                            /> 
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
                                            <Image  
                                                src='/svg/comment.svg' 
                                                alt="reviews__icon" 
                                                width={35} 
                                                height={35} 
                                                style={{ paddingBottom: 5}}
                                                priority={false}
                                                loading="lazy"
                                                quality={60}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg"
                                            /> 
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
                                <input 
                                    type="text" 
                                    value={formData.customerName}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        customerName: e.target.value
                                    }))}
                                    placeholder="Vaše jméno"
                                />
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
                                            <Image 
                                                src='/svg/arrow-left.svg' 
                                                alt="arrow" 
                                                width={30} 
                                                height={30} 
                                                priority={false}
                                                loading="lazy"
                                                quality={60}
                                            />
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
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            consultantName: person.name,
                                                            reviewType: person.name === 'benefitprogram' ? 'benefitprogram' : 'poradce'
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
                                <label>Váš Názor:</label>
                                <textarea 
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        message: e.target.value
                                    }))}
                                    placeholder="Váš názor"
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
                            text={loading ? 'Odesílám...' : 'Poslat Recenzi'} 
                            disableLink={true}
                            onClick={handleSubmit}
                        />
                    </div>
                    <div className="devider"/>
                </div>
            </div>
        </motion.section>
    )
}