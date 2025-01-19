
import Image from "next/image";
import { motion } from "framer-motion";
import ONViewLogo from "@/components/anim/LogoAnims/onView";
import RotatingButton from "@/components/ui/stickyButtons/buttons/RotatingButton";
import PageHeading from "@/components/anim/TextAnims/PageHeading";
import { stats } from "@/constants/pages/reviews";
import { useFetchDatabase } from "@/hooks/useFetchDatabase";
import { useEffect, useState } from "react";



export default function ReviewsIntro () {
    const [localStats, setLocalStats] = useState(stats);
    const {fetchTotal} = useFetchDatabase();
    useEffect(() => {
        (async () => {
          const data = await fetchTotal();
          if (data) {
            const updated = localStats.map(item => {
              if(item.name === "clients") return {...item, number: data.totalpeople};
              if(item.name === "likes") return {...item, number: data.likes};
              if(item.name === "comments") return {...item, number: data.reviews};
              return item;
            });
            setLocalStats(updated);
          }
        })();
      }, []);

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
                    <PageHeading text="BUDUJEME PRO LIDI<br/>STABILNÍ A KVALITNÍ<br/>FINANČNÍ PORADENSTVÍ<br/>UŽ PŘES<span>JEDNU DEKÁDU</span>" />
                </motion.div>
                
                <div className="cover"/>
                <Image 
                    src='/assets/reviewsBackground.webp' 
                    alt="background" 
                    fill={true}
                    sizes="100vw"
                    quality={100}
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/webp"
                />
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
                            {localStats.map(( sta, i) => {
                                const { name, number, src, alt } = sta
                                return(
                                    <div className="stat" key={i}>
                                        <p>{number}</p>
                                        <Image 
                                            src={src} 
                                            alt={alt} 
                                            width={50} 
                                            height={50}
                                            quality={60}
                                            loading='lazy'
                                            placeholder='blur'
                                            blurDataURL='data:image/svg'
                                            priority={false}
                                        />
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