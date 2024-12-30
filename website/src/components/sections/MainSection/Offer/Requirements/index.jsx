import MainText from "@/components/anim/TextAnims/MainText"
import { cardsRequirements } from "@/constants/mainpage"
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


export default function Requirements () {
    return (
       <div className="Requirements">
            <div className="Text__container">
                <div className="Header">
                    <h3>ψ</h3>
                    <p>To, co by bežně zabralo dekády vybudovat, s námi dokážete během několika let </p>
                    <div className="devider"/>
                </div>
                <div className="Main__text">
                    <MainText initialColor={'#050A10'} secondaryColor={'#FF5733'} text={'JEDINÉ, CO OD VÁS CHCEME, <span>JE VAŠE</span><br /><span>ČIRÁ POZORNOST A ODHODLÁNÍ.</span><br />A MY VÁM DÁME PRVOTŘÍDNÍ SERVIS<br />BEZ HLOUPÉ NÁMAHY.'}/>
                </div>
            </div>

            <motion.div 
                className="Cards__container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
            >
                {cardsRequirements.map(( card, i) => {
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
                        </motion.div>
                    )
                })}
            </motion.div>
       </div> 
    )
}