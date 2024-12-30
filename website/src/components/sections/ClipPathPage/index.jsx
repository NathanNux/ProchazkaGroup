import MainText from "@/components/anim/TextAnims/MainText";
import PageHeading from "@/components/anim/TextAnims/PageHeading";
import SubText from "@/components/anim/TextAnims/SubText";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";
import { projects } from "@/constants/nabidkypage";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";


export default function ClipPathPage() {
    return (
        <section className="ClipPathPage">
            <div className="header">
                <h2>Σ</h2>
            </div>
            <div className="devider"></div>
            <div className="cover">
                <div className="cover__header">
                    <PageHeading text="SLEVY A VÝHODNÉ NABÍDKY <span> EXCLUSIF ET SEULEMENT </span><br/>PRO NAŠE KLIENTY.  " />
                </div>
                <div className="cover__desc">
                        <h3>
                            Σ
                        </h3>
                        <p>
                            Domlouváme exklusivní nabídky pro lepší podmínky
                        </p>
                </div>
            </div>
            {projects.map((project, index) => {
                const { number, title, description, href, src, alt, text } = project;
                return (
                    <Galery 
                        number={number} 
                        title={title} 
                        description={description} 
                        href={href}
                        src={src}
                        alt={alt}
                        text={text}
                        key={index}
                    />
                )
            })}
        </section>
    )
}


const Galery = ({ number, title, description, href, src, alt, text }) => {
    const sectionRef = useRef();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(
        scrollYProgress,
        [ 0, 0.5, 1 ], 
        [ 400, -100, -200 ]
    );


    return (
        <div className="ClipPathPage__Galery" ref={sectionRef}>
            <motion.div
                className="ClipPathPage__Galery__Image"
                style={{
                    position: 'fixed',
                    top: '25%',
                    left: '5%',
                    width: '40vw',
                    height: '60vh',
                    zIndex: 1,
                    clipPath: useTransform(
                        scrollYProgress,
                        [0, 0.3, 0.7, 1],
                        [
                            'inset(100% 0 0 0)',    // Start clipped from top
                            'inset(0 0 0 0)',       // Fully visible
                            'inset(0 0 0 0)',       // Stay visible
                            'inset(0 0 100% 0)'     // Clip to bottom
                        ]
                    )
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                }}
            >
                <CustomImage src={src} altText={alt} />
            </motion.div>

            <div className="ClipPathPage__Galery__Content">
                <div className="ClipPathPage__Galery__Content__Header">
                    <p>
                        {number}
                    </p>
                    <p>
                        {title}
                    </p>
                </div>
                <div className="ClipPathPage__Galery__Content__devider"/>
                <MainText text={description} initialColor={'#050A10'} />
                <SubText initialColor="#050A10" className={'ClipPathPage__Galery__Content__p'} text={text} />
                <div className="ClipPathPage__Galery__Content__Button">
                    <motion.div
                        style={{ x }}
                    >   
                        <RoundButton href={href} text="Více informací" />
                    </motion.div>
                    <div className="ClipPathPage__Galery__Content__Button__devider"/>
                </div>
            </div>
        </div>
    );
};