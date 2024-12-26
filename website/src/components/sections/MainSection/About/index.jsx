import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import MainText from "@/components/anim/TextAnims/MainText";
import SubText from "@/components/anim/TextAnims/SubText";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";


export default function About() {
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
    return(
        <div className="About__Section">
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
            <div className="Text__container">
                <div className="header">
                    <div className="devider"/>
                    <h3>
                        02
                    </h3>
                    <p>Náš tým roste a zraje s jediným cílem:<br/> přinášet vám výsledky, a splnit naši misi.</p>
                </div>
                <div className="Main__text">
                    <MainText initialColor={'#050A10'} text={'SKRZE FINANČNÍ SEKTOR UMOŽŇUJEME<br />VYVÍJET NOVÉ ÚSPĚŠNÉ PŘÍBĚHY, <br />A TO NEJEN TY VAŠE.<br />SPOLEČNĚ MĚNÍME KAŽDODENNÍ SNY VE SKUTEČNOST.'}/>
                </div>
                <div className="Button__container">
                    <SubText className={'add__Text'} text={'Každý den přicházíme s řešeními, kteránašim klientům otevírají nové možnosti, a vytváříme hodnotu, která přetrvává.'}/>
                    <motion.div className="button" style={{ x }}>
                        <RoundButton href="/o-nas" text="náš tým"/>
                    </motion.div>
                    <div className="devider"/>
                </div>
            </div>
        </div>
    )
}