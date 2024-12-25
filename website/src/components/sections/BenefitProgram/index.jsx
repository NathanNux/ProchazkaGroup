import Image from "next/image";
import IntroPageBenefit from "./IntroPage";
import InfoBenefitS from "./InfoSection";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function BenefitProgramKeyframes() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const headerMove = useTransform(
        scrollYProgress,
        [0, 0.5, 0.6, 0.7, 0.8, 1],
        ['0vw', '0vw', '-20vw', '-20vw', '100vw', '100vw']
    );

    return(
        <section className="BenefitProgramKeyFrames">
            <IntroPageBenefit />
            <motion.div 
                className="BenefitProgramKeyFramesImage"
                style={{
                    x: headerMove,
                }}
            >
                <Image  src='/assets/small-tree.png' alt="small-tree" fill={true}/>
            </motion.div>
            <div className="devider" />
            <InfoBenefitS ref={sectionRef} scroll={scrollYProgress}/>
        </section>
    )
}