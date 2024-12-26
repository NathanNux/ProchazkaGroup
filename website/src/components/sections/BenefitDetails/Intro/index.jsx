import MainText from "@/components/anim/TextAnims/MainText";
import RollingText from "@/components/anim/TextAnims/RollingText";
import SubText from "@/components/anim/TextAnims/SubText";
import { IntroRects } from "@/constants/benefitpage";
import { motion } from "framer-motion";


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
        staggerChildren: 0.3, 
        }
    }
};
  
const rectVariants = {
    hidden: {
        x: "50vw",
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren" 
        }
    }
};
  
const textVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.5,
        delay: 0.2 
        }
    }
};
export default function Intro() {
    return(
        <div className="Intro">
            <div className="Intro__header">
                <div className="Index">
                    <h3>
                        01
                    </h3>
                    <p>
                        Okamžitá hodnota, realné odměny: Jak to funguje. 
                    </p>
                </div>
                <div className="mainText">
                    <RollingText text='- DOPORUČ - VYTVOŘ - VYDĚLÁŠ -' baseVelocity={''} textsCount='13'/>
                </div>
                <div className="devider"/>
            </div>

            <div className="Intro__content">
                <div className="Texts__container">
                    <div className="mainText">
                        <MainText initialColor={'#050A10'} text='ZÍSKEJ ODMĚNY ZA NĚCO<br />TAK JEDNODUCHÉHO, ŽE<br />SE TI NEBUDE CHTÍT VĚŘIT'/>
                    </div>
                    <div className="subText__container">
                        <div className="ps">
                            <h3>
                                PS:
                            </h3>
                            <p>
                                Vypadá to jako klasický model? No, popravdě ano, vypadá. 
                                Ale můžete pomoc a být hrdinou vašich nejbližších. A to zní už úžasně, ne?
                            </p>
                        </div>
                        <div className="pss">
                            <h3>
                                PSS:
                            </h3>
                            <p>
                                A ano, nám to bere na výdělky z komisí, ale na tom nám nezáleží, my si stojíme na svém - kvalita služeb. 
                            </p>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="Rects__container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {IntroRects.map(( rect, i) => {
                        const { number, header, content} = rect
                        return (
                            <motion.div 
                                className="rect"
                                key={i}
                                variants={rectVariants}
                            >
                                <motion.div 
                                    className="header"
                                    variants={textVariants}
                                >
                                    <h2>{number}</h2>
                                    <h3>{header}</h3>
                                </motion.div>
                                <motion.div 
                                    className="content"
                                    variants={textVariants}
                                >
                                    <SubText text={content}/>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}