import PageHeading from "@/components/anim/TextAnims/PageHeading";
import FeedbackForm from "@/components/forms/feedback";
import { useScroll } from "framer-motion";
import { useRef } from "react";
//NOTE:FeedBack and contact are switched

export default function FeedbackIntro() {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [ 'start start', 'end end']
    })
    return (
        <section className="FeedbackIntro" ref={sectionRef}>
            <div className="pageIndex">
                <h2>η</h2>
            </div>
            <div className="Cover">
                <div className="MainText">
                    <PageHeading text={'NA COKOLIV, CO SE ZEPTÁTE,<br/><span>EXISTUJE 100% JISTÁ ODPOVĚĎ. </span> <br/>MY VÁM BĚHEM PÁR MOMENTŮ <br/> ODPOVÍME <span>S JEDNÍM ŘEŠENÍM.</span>'}/>
                </div>
                <div className="Header">
                    <div className="Header__text">
                        <h3>
                            σ
                        </h3>
                        <p>
                        Váš dotaz nebo jakoukoliv otázku nám napište sem: 
                        </p>
                    </div>
                </div>
            </div>
            <FeedbackForm scroll={scrollYProgress}/>
        </section>
    )
}