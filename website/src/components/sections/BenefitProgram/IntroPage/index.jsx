import ONViewLogo from "@/components/anim/LogoAnims/onView";
import PageHeading from "@/components/anim/TextAnims/PageHeading";
import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function IntroPageBenefit() {
    const sectionRef = useRef(null);
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0
    });
    //WIP: Fix the main header to have a better responsive design, to brake it in half for tablets and phones

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        // Initial dimensions
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const height = useTransform(
        scrollYProgress,
        [0,1],
        windowDimensions.width >= 1000 && windowDimensions.height > windowDimensions.width
            ? ['120vh','90vh']
            : ['140vh','100vh']
    );

    const borderRadiusValue = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        windowDimensions.width >= 1000 && windowDimensions.height > windowDimensions.width
            ? ['30%', "0%", '0%']
            : ['45%', "0%", '0%']
    );

    return(
        <motion.section 
            className="IntroPageBenefit" 
            ref={sectionRef}
            style={{
                height,
                borderBottomLeftRadius: borderRadiusValue,
                borderBottomRightRadius: borderRadiusValue,
            }}
        > 
            <Image 
                src="/background/benefit.webp" 
                alt="Benefit Program Intro Page" 
                fill={true}
                priority={true}
                quality={100}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/webp"
                className="background-image"
            />
            <div className="cover"/>
            <div className="text">
                <PageHeading text="BENEFIT PROGRAM"/>
                <div className="Logo">
                    <ONViewLogo />
                </div>
            </div>
        </motion.section>
    );
}