import MainText from "@/components/anim/TextAnims/MainText";
import RollingIcons from "@/components/anim/TextAnims/RollingIcons";
import SubText from "@/components/anim/TextAnims/SubText";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";


export default function Sales() {
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
        <div className="Sales">
            <div className="Content__Sales">
                <div className="Header">
                    <h3>Φ</h3>
                    <p>Máme pro naše klienty <br />
                        unique offres s našimi partnery
                    </p>
                    <div className="divider"/>
                </div>
                <div className="Main__Text">
                    <MainText initialColor={'#050A10'} secondaryColor={'#FF5733'} text={'<span>VYJEDNALI JSME</span> PRO NAŠE KLIENTY<br />SLEVY A SKVĚLÉ NABÍDKY TAKY MIMO<br />NAŠÍ OBLAST, ABYSTE UŠETŘILI<br /><span>I U KAŽDODENNÍCH POTŘEB.</span>'}/>
                </div>
                <div className="Button__container">
                    <motion.div className="button" style={{ x }}>
                        <RoundButton href='/nabidky' text='Zobrazit Slevy'/>
                    </motion.div>
                    <div className="divider"/>
                </div>
            </div>
            <div className="Image__container">
                <CustomImage altText='Sales-image' src='/assets/reviewsBackground.webp'/>
            </div>
            <div className="Logo__container">
                <SubText className={'subtext'} initialColor="#050A10" text={'NAŠI PARTNEŘI:'}/>
                <RollingIcons baseVelocity={2.5}/>
            </div>
        </div>
    )
}