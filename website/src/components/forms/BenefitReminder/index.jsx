import MainText from "@/components/anim/TextAnims/MainText"
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import { people as staticPeople } from "@/constants/people"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
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
export default function BenefitReminder() {
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [peopleData, setPeopleData] = useState(staticPeople)
    const { toast } = useToast()
    
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }, [])


    const activeIndex = previewIndex ?? currentIndex


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
                            // console.log(error)
                        }
                    }
                    loadPeopleData()
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
    return (
        <section className="BenefitReminder"> 
            <div className="BenefitReminder__Header">
                <div className="Main__text">
                    <MainText initialColor={"#050A10"} secondaryColor={'#00F0FF'} text='<span>ZAVOLEJTE NÁM HNED TEĎ! </span><br />OTEVÍRÁTEDVEŘE K <br /> LEPŠÍ BUDOUCNOSTI<br />SPOLEČNĚ S NÁMI.'/>
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
                            {peopleData.map(( person, i) => {
                                const { name, likes, reviews, moto, src, alt } = person

                                return (
                                    <div className="BenefitReminder__Personal__choice__wrapper" key={`wrappersfs${i}`}>
                                        <div className="BenefitReminder__Personal__choice__image__container" key={`wsarappersfs${i}`} style={{ zIndex: 1 + i}}>
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={activeIndex}
                                                    className="BenefitReminder__Personal__choice__image"
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
                                                        priority={false}
                                                        quality={80}
                                                        loading="lazy"
                                                        placeholder="blur"
                                                        blurDataURL="data:image/webp"
                                                    />
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
                                                            <p>| {peopleData[activeIndex].name}</p>
                                                            <p>{peopleData[activeIndex].tel}</p>
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
                                                                quality={60}
                                                                priority={false}
                                                                loading="lazy"
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
                                                        <p>{peopleData[activeIndex].likes}</p>
                                                        <Image  
                                                            src='/svg/thumbsupblack.svg' 
                                                            alt="thumbsUp_icon" 
                                                            width={50} 
                                                            height={50}
                                                            priority={false}
                                                            quality={60}
                                                            loading="lazy"
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
                                                            src='/svg/commentblack.svg' 
                                                            alt="review__icon" 
                                                            width={50} 
                                                            height={50}
                                                            priority={false}
                                                            quality={60}
                                                            loading="lazy"
                                                            placeholder="blur"
                                                            blurDataURL="data:image/webp"
                                                        /> 
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
                <div className="button__wrapper" onClick={handleCopyName}>
                    <RoundButton href='' text='Zapojit se hned' disableLink={true}/>
                </div> 
            </div>
                    
        
            <div className="Footer__wrapper">
                <h2>?</h2>
                <p>Nejste našimi Klienty?</p>
                <div className="svg__container">
                    <Image 
                        src='/svg/ArrowDown.svg' 
                        alt="arrow-down" 
                        height={60} 
                        width={30}
                        priority={false}
                        quality={60}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg"
                    />
                </div>
            </div>   
        </section>
    )
}