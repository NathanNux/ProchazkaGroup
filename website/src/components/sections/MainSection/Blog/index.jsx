import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import MainText from "@/components/anim/TextAnims/MainText";
import SubText from "@/components/anim/TextAnims/SubText";
import RollingIcons from "@/components/anim/TextAnims/RollingIcons";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";


export default function Blog () {
    const sectionRef = useRef()

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const x = useTransform(
        scrollYProgress,
        [0, 0.5, 1], 
        [400, -100, -200]
    )

    return (
        <div className="Blog">
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
            <div className="Content__wrapper">
                <div className="header">
                    <h3>
                    δ
                    </h3>
                    <p>
                    A máme pro Vás další<br /> hromadu kvalitních článků 
                    </p>
                </div>
                <div className="button__container">
                    <motion.div className="button" style={{ x }}>
                        <RoundButton href='/blog' text='Chci Víc'/>
                    </motion.div>
                    <div className="devider"/>
                </div>
                <div className="main__Text">
                    <MainText initialColor={'#050A10'} text={'10 NEPŘÍJEMNÝCH VĚCÍ [ZDARMA], KTERÉ VÁM VÁŠ BANKÉŘ URČITĚ ZATAJIL A TAKY NIKDY NEŘEKNE. PROJDĚTE SI JE HNED TEĎ.'}/>
                    <div className="devider"/>
                </div>
            </div>
            <div className="logos__wrapper">
                <div className="header">
                    <SubText text={'BYLI JSME ZMÍNĚNI:'}/>
                </div>
                <div className="devider__wrapper"/>
                    <RollingIcons baseVelocity={1}/>
                <div className="devider__wrapper"/>
            </div>
        </div>
    )
}