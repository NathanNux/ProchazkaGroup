import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import RotatingButton from "@/components/ui/stickyButtons/buttons/RotatingButton";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import MainText from "@/components/anim/TextAnims/MainText";
import PageHeading from "@/components/anim/TextAnims/PageHeading";
import SubText from "@/components/anim/TextAnims/SubText";

const draw = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i) => {
        const delay = i * 0.15;
        return {
            pathLength: 1.1,
            opacity: 1,
            transition: {
                ease: [ 0.76, 0, 0.24, 1 ],
                pathLength: {delay, duration: 1.5, type: 'spring', bounce: 0},
                opacity: {delay, duration: i * 0.5},
            }
        }
    },
}

export default function AboutInto( ){
    const introRef = useRef(null)
    const mainContentRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    const { scrollYProgress } = useScroll({
        target: mainContentRef,
        offset: [ 'start end', 'end end']
    })
    const rotation = useMemo(() => [0, 120, 240], []);
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const imageAnimX = useTransform(
        scrollYProgress,
        [0, 0.35, 0.45 , 0.55, 0.65, 1],
        ["-50%", "-50%", "-100%", "-100%", "-350%", "-350%"]
    )
    const imageAnimScale = useTransform(
        scrollYProgress,
        [0, 0.35, 0.45 , 0.55, 0.65, 1],
        [1, 1, 1.25, 1.25, 1.25, 1.25]
    )

    const sectionX = useTransform(
        scrollYProgress,
        [ 0.55, 1],
        [ "50%", "0%"] 
    )
    const sectionOpacity1 = useTransform(
        scrollYProgress,
        [ 0, 0.55, 1],
        [ 1, 1, 0] 
    )

    const sectionOpacity2 = useTransform(
        scrollYProgress,
        [ 0.65, 1],
        [ 0, 1] 
    )

    const buttonOpacity2 = useTransform(
        scrollYProgress,
        dimensions.width <= 740 
            ? [0.1, 0.45]  // Mobile breakpoints
            : [0.65, 1],    // Desktop breakpoints
        [1, 0]             // Opacity values
    )

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

    const introbutton = {
        initial: {
            y: '200%'
        },
        enter: {
            y: '0%',
            transition: {
                delay: 0.5,
                duration: 1,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }

    const circlePath = "M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0";

    
    return(
        <section className="About" ref={introRef}>
            <motion.div className="button__container__round"
                style={{
                    opacity: buttonOpacity2
                }}
            >
                <RoundButton href='/' text='Zájem o pozici?' disableLink={true}/>
            </motion.div>
            <motion.div 
                className="button__container"
                initial='initial'
                animate='enter'
                variants={introbutton}
                style={{
                    opacity: buttonOpacity2
                }}
            >
                <RotatingButton text=" - Nahlášení Pojistného - Nahlášení Pojistného" href="/"/>
            </motion.div>
            <motion.section className="AboutInto"
                initial='initial'
                animate='enter'
                variants={introAnim}
            >
                <div className="AboutInto__wrapper">
                    <div className="header">
                        <h2>η</h2>
                    </div>
                    <div className="cover"/>
                    <Image src='/assets/aboutBackground.png' alt="background-photo" fill={true}/>
                    <div className="mainHeader">
                        <PageHeading text="JSME TU PRO VÁS UŽ PŘES<br/><span>JEDNU DEKÁDU</span>"/>
                    </div>
                    <motion.div className="ImageFixed"
                        style={{
                            x: imageAnimX,
                            scale: imageAnimScale
                        }}
                    >
                        <Image  src='/assets/aboutPhoto.png' alt="team_photo" fill={true}/>
                    </motion.div>
                </div>
            </motion.section>
            <div className="AboutUs" ref={mainContentRef}>
                <div className="AboutUs__Sticky">
                    <motion.div className="AboutUs__Sticky__content"
                        style={{
                            x: sectionX
                        }}
                    >
                        <div className="AboutUs__Sticky__content__Container">
                            <div className="AboutUs__Sticky__content__Container__wrapper">
                                <motion.div className="AboutUs__Sticky__content__1"
                                    style={{
                                        opacity: sectionOpacity1
                                    }}
                                >
                                    <div className="Header">
                                        <div className="Header__container">
                                            <h2>ξ</h2>
                                            <p>Naše Historie skupiny</p>    
                                        </div>
                                        <div className="devider"/>
                                    </div>
                                    <div className="MainText">
                                        <MainText initialColor={'#fff'} text="LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT."/>
                                        <div className="devider"/>
                                    </div>
                                    <div className="subText">
                                        <div className="subText__text">
                                            <SubText text={'Ať už sníte o vlastním bydlení,<br/>cestování po světě nebo jen<br/>chcete mít klidný spánek,<br/>my Vám pomůžeme toho dosáhnout.'}/>
                                        </div>
                                        
                                        <div className="devider"/>
                                    </div>
                                </motion.div>
                                <motion.div className="AboutUs__Sticky__content__2"
                                    style={{
                                        opacity: sectionOpacity2
                                    }}
                                >
                                    <div className="Header">
                                        <div className="Header__container">
                                            <h2>ξ</h2>
                                            <p>Naše Historie skupiny</p>    
                                        </div>
                                        <div className="devider"/>
                                    </div>
                                    <div className="subText1">
                                        <div className="subText__text">
                                            <p>
                                                Ať už sníte o vlastním bydlení, cestování po světě nebo jen chcete mít klidný spánek, my Vám pomůžeme toho dosáhnout.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="MainText">
                                        <div  className="devider"/>
                                        <p>LOREM IPSUM DOLOR 
                                            SIT AMET, CONSECTETUR 
                                            ADIPISCING ELIT.
                                        </p>
                                        <div className="devider"/>
                                    </div>
                                    <div className="subText2">
                                        <div className="subText__text">
                                            <p>
                                                Ať už sníte o vlastním bydlení, cestování po světě nebo jen chcete mít klidný spánek, my Vám pomůžeme toho dosáhnout.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="AboutUs__Sticky__content__values">
                            <div className="Header">
                                <div className="Header__container">
                                    <h2>01</h2>
                                    <p>Máme nediskutabilní hodnoty <br /> a pevné zásady</p>    
                                </div>
                            </div>
                            <div className="Values__container">
                            <div className="svg__fillc__Ccontainer">
                                    {[0, 1, 2].map((index) => (
                                        <motion.svg 
                                            key={`circle-${index}`}
                                            viewBox="0 0 100 100" 
                                            initial='initial' 
                                            whileInView='animate'
                                            style={{
                                                transform: `rotate(${rotation[index]}deg)`,
                                                transformOrigin: "50% 50%"
                                            }}
                                        >
                                            <motion.path
                                                variants={draw} 
                                                custom={index + 1}
                                                d={circlePath}
                                                fill="none"
                                                strokeLinecap="round"
                                            />
                                        </motion.svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </motion.div>
                </div>
            </div>
        </section>
        
    )
}