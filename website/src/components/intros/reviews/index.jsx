
import Image from "next/image";
import { motion } from "framer-motion";
import ONViewLogo from "@/components/anim/LogoAnims/onView";
import RotatingButton from "@/components/ui/stickyButtons/buttons/RotatingButton";
import PageHeading from "@/components/anim/TextAnims/PageHeading";

const stats = [
    {
        name: 'clients',
        number: '1928',
        src: '/thumbsUp.svg',
        alt: 'clients_icon'
    },
    {
        name: 'likes',
        number: '428',
        src: '/thumbsUp.svg',
        alt: 'clients_icon'
    },
    {
        name: 'comments',
        number: '28',
        src: '/thumbsUp.svg',
        alt: 'clients_icon'
    }
]

export default function ReviewsIntro () {

    const introAnim = {
        initial: {
            scale: 1.5
        },
        enter: {
            scale: 1,
            transition: {
                delay: 0.5,
                duration: 0.3,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    
    const rectAnim = (i) => ({
        initial: {
            x: '100%'
        },
        enter: () => ({
            x: '0%',
            transition:{
                delay: 0.5 + (i * 0.2),
                duration: 1.5,
                ease: [ 0.76, 0, 0.24, 1],
            }
        })
    })
    const introText = {
        initial: {
            opacity: 0,
            x: '100%'
        },
        enter: {
            opacity: 1,
            x: '0%',
            transition: {
                delay: 1.3,
                duration: 1,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    const introbutton = {
        initial: {
            y: '200%'
        },
        enter: {
            y: '0%',
            transition: {
                delay: 0.9,
                duration: 1,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    
    return (
        <section className="ReviewsIntro">
            <motion.div 
                className="ReviewsIntro__Wrapper"
                initial="initial"
                animate="enter"
                variants={introAnim}

            >
                <motion.div 
                    className="Heading"
                    initial='initial'
                    animate='enter'
                    variants={introText}
                >
                    <PageHeading text="BUDUJEME PRO LIDI <br/> STABILNÍ A KVALITNÍ <br/> FINANČNÍ PORADENSTVÍ <br/> UŽ PŘES <span>JEDNU DEKÁDU</span>" />
                </motion.div>
                
                <div className="cover"/>
                <Image src='/assets/reviewsBackground.png' alt="background" fill={true}/>
                <div className="rect__container">
                    <div className="rect__Wrapper">
                        {Array.from({length: 3}, (_, i) => (
                            <motion.div
                            className="rect"
                            key={i}
                            initial="initial"
                            animate="enter"
                            variants={rectAnim(i)}
                        />
                        ))}
                    </div>
                    
                    <div className="rect__bottom">
                        <ONViewLogo />
                        <div className="background"/> 
                        <div className="stats__container">
                            {stats.map(( sta, i) => {
                                const { name, number, src, alt } = sta
                                return(
                                    <div className="stat" key={i}>
                                        <p>{number}</p>
                                        <Image src={src} alt={alt} width={50} height={50}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                    className="button__container"
                    initial='initial'
                    animate='enter'
                    variants={introbutton}
                >
                    <RotatingButton text=" - Nahlášení Pojistného - Nahlášení Pojistného" href="/"/>
            </motion.div>
        </section>
    )
}