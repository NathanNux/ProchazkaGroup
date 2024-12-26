import MainText from "@/components/anim/TextAnims/MainText"
import SubText from "@/components/anim/TextAnims/SubText"
import { BenefitCards } from "@/constants/mainpage"
import { motion } from "framer-motion"


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3
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
        }
    }
};

export default function Benefits() {
    return(
        <div className="Benefits">
            <div className="text__container">
                <div className="header">
                    <h3>δ</h3>
                    <p>Budujeme finanční portfolia se sny těch, kteří věří v úspěch.</p>
                </div>
                <div className="subtext"> 
                    <MainText initialColor={'#050A10'} text={'Vaše finanční problémy nejsou jen čísla.<br /> Jsou to roky vašeho života, které můžete zachránit.'}/>
                </div>
                <div className="story"
                    // WIP: this of how to animate this, maybe as absolute positioned small button "The Real Story"
                    style={{ display: 'flex'}}
                >
                    <h4>δ |</h4>
                    <SubText text={'Velká většina rodin měli pocit, že nikdy neuvidí konec dluhů ani<br/> své špatné situace způsobené nezodpovědnými návyky. <br/> <br/>Společně jsme vytvořili plán, který nejen zlepšil jejich situaci,<br/> ale změnil jejich pohled na budoucnost. <br/> <br/>Dnes už řeší jen to, jak investovat své úspory a využít svůj volný <br/> čas s rodinou. Zní to dobře, že jo?'}/>
                </div>
            </div>
            <motion.div 
                className="cards__container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
            >
                <div className="top__devider"/>
                {BenefitCards.map(( card, i) => {
                    const { number, content } = card
                    return(
                        <motion.div 
                            className="card__wrapper" 
                            key={i}
                            variants={rectVariants}
                        >
                            <div className="card">
                                <h3>{number}</h3>
                                <p>{content}</p>
                            </div>
                            <div className="devider"/>
                        </motion.div>
                    )
                })}
            </motion.div>
            <div className="divider"/>
        </div>
    )
}