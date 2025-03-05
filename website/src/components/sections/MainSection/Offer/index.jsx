import { useRef } from "react";
import BecomeAclient from "./BecomeClient";
import Benefits from "./Benefits";
import IntroOffer from "./Intro";
import OurDeal from "./OurDeal";
import Reality from "./Reality";
import Requirements from "./Requirements";
import Testimonials from "./Testimonials";
import TheWay from "./TheWay";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Offer() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    });
    const move1x = useTransform(
        scrollYProgress,
        [0.25, 0.75],
        ['0%', '-100%']
    )
    
    const move2x = useTransform(
        scrollYProgress,
        [0.25, 0.75],
        ['100%', '0%']
    )
    return(
        <section className="Offer">
            <div className="sticky__wrapper" ref={sectionRef}>
                <motion.div className="sticky">
                    <motion.div className="mainPageSection__content" 
                        style={{ 
                            x: move1x,  // Change from left to transform
                        }}
                    >
                        <IntroOffer />
                    </motion.div>
                    <motion.div className="mainPageSection__content" 
                        style={{ 
                            x: move2x,  // Change from left to transform
                        }}
                    >
                        <Reality />
                    </motion.div>
                </motion.div>
            </div>
            {/* <BecomeAclient /> */}
            <Benefits />
            <TheWay />
            <Requirements />
            <Testimonials />
            <OurDeal />
        </section>
    )
}