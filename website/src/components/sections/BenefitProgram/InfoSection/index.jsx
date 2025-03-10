import SubText from "@/components/anim/TextAnims/SubText";
import { motion, useTransform } from "framer-motion"
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

const InfoBenefitS = forwardRef(function InfoBenefitS({ scroll }, ref) {

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        isLandscape: false
    });

    const firstContent = useTransform(
        scroll,
        [0, 0.35, 0.4, 1],
        [1, 1, 0, 0]
    );

    const headerMove = useTransform(
        scroll,
        [0, 0.5, 0.6, 1],
        dimensions.isLandscape
            ? ['0vw', '0vw', '-50vw', '-50vw']  // Landscape mode
            : dimensions.width >= 740
                ? ['0vw', '0vw', '-50vw', '-50vw']  // Portrait mode above 740px
                : ['0vw', '0vw', '-20vw', '-20vw']  // Default
    );
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isLandscape = width/height >= 1;
            
            setDimensions({
                width,
                height,
                isLandscape
            });
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const secondContent = useTransform(
        scroll,
        [0, 0.35, 0.4 , 0.55, 0.6, 1],
        [0, 0, 1, 1, 0 ,0 ]
    )
    const thirdContent = useTransform(
        scroll,
        [0, 0.25, 0.3 , 0.55, 0.6, 1],
        [0, 0, 0, 0, 1 ,1 ]
    )
    const wrapperMove = useTransform(
        scroll,
        [0, 0.7, 0.8, 1],
        ['0vw', '0vw', '100vw', '100vw']

    )
    const coverMove = useTransform(
        scroll,
        [0, 0.7, 0.8, 1],
        ['-100vw', '-100vw', '0vw', '0vw']

    )

    return (
        <section className="InfoBenefitS" ref={ref}>
            <div className="InfoBenefitS__sticky">
                <motion.div 
                    className="InfoBenefitS__sticky__Wrapper"
                    style={{x: wrapperMove}}
                >
                    <div className="InfoBenefitS__sticky__Header">
                        <motion.div 
                            className="InfoBenefitS__sticky__Header__container"
                            style={{x: headerMove}}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 30,
                                mass: 1,
                            }}
                        >
                            <div className="InfoBenefitS__sticky__Header__container__text">
                                <h3>01</h3>
                                <p>Přidejte se k revoluci - Měňte životy, zatímco měníte ten váš.</p>
                            </div>
                            <div className="devider"/>
                        </motion.div>
                        
                    </div>
                    <div className="InfoBenefitS__sticky__Content">
                        <div className="InfoBenefitS__sticky__Content__div">
                            <motion.div 
                                className="InfoBenefitS__sticky__Content__div__content" 
                                style={{zIndex: 2, opacity: firstContent}} 
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2
                                }}
                            >
                                <h2>PŘINESTE ZMĚNU A ZÍSKEJTE ZPĚT</h2>
                                <p>
                                    Proč to děláme: Už 12 let tvoříme hodnoty, ne jen zisky. Když s vámi
                                    spolupracujeme, nejde o to, abychom &#39;dostali zaplaceno.&#39; Představte si, 
                                    že jste tím, kdo lidem otevírá dveře k finanční jistotě. Vy budujete jejich příběhy - a přitom posilujete svůj vlastní.          
                                </p> 
                            </motion.div>
                            <motion.div 
                                className="InfoBenefitS__sticky__Content__div__content" 
                                style={{zIndex: 1, opacity: secondContent}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5
                                }}
                            >
                                <h2>STAŇTE SE PŘÍKLADEM SVÉHO OKOLÍ</h2>
                                <p>
                                    Realita: Není to jen o tom, abyste měli něco jen pro sebe — 
                                    Vaše doporučení je víc než jen gesto. Je to klíč, který zajišťuje lepší život ostatním a vám přináší respekt a výsledky.                     
                                </p> 
                            </motion.div>
                        </div>
                        <div className="InfoBenefitS__sticky__Content__div">
                            <motion.div 
                                className="InfoBenefitS__sticky__Content__div__content" 
                                style={{zIndex: 2, opacity: firstContent}} 
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5
                                }}
                            >
                                <h2>CO DOSTANETE VY: ODMĚNY NEJEN FYZIČNÉ</h2>
                                <p>
                                  Jak fungujeme: neplatíte nám nic předem. Každý krok, který uděláte, přináší okamžitou hodnotu. Žádné složité podmínky, jen čistý zisk a uznání za váš přínos.
                                </p>                            
                            </motion.div>
                            <motion.div 
                                className="InfoBenefitS__sticky__Content__div__content" 
                                style={{zIndex: 1, opacity: secondContent}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5
                                }}
                            >
                                <h2>REALNÝ DOPAD VE VAŠEM OKOLÍ: NENÍ ČAS OTÁLET, ZMĚNA ZAČÍNÁ TEĎ
                                </h2>
                                <p>Co kdyby každý krok, který uděláte, nejen ovlivnil váš život, ale také otevřel dveře někomu jinému? Když přivádíte lidi, doslova měníte životy. Doslova.
                                    Jste to vy, kdo otevírá nové možnosti pro ostatní, zatímco za svůj dopad získáváte odměny — Není tohle skvělé?
                                </p> 
                            </motion.div>
                            <motion.div 
                                className="InfoBenefitS__sticky__Content__div__content" 
                                style={{zIndex: 1, opacity: thirdContent}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5
                                }}
                            >
                                <h2>NABÍZÍME OKAMŽITÉ ODMĚNY, KTERÉ MŮŽETE OPRAVDU VYUŽÍT
                                    — NE JEN BODY NA KARTIČKU
                                </h2>
                                <p>Tento program je první svého druhu. Nejde o obyčejné body, věrnostní karty nebo nudné benefity. 
                                    Je to o reálných odměnách, které můžete použít ihned, co je dostanete, IHNED.
                                    ZAJMULI JSME VÁS? ANO? TO JE DOBŘE. KOUKNĚTĚ NÍŽE:
                                </p> 
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="InfoBenefitS__sticky__Cover"
                    style={{x: coverMove}}
                >
                    <div  className="cover"/>
                    <Image  
                        src='/assets/backgroundSection.webp' 
                        alt='background__section' 
                        fill={true}
                        sizes="100vw"
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="data:image/webp"
                    />
                    <div className="mainHeader">
                        <SubText initialColor="#fff" text={'JDE O VYTVOŘENÍ NĚČEHO, CO<br/> VYDRŽÍ GENERACE—VĚTŠÍ<br/> NEŽ MY, VĚTŠÍ NEŽ VY,<br/> SPOLEČNĚ'}/>
                    </div>
                    <div className="subHeader">
                        <h3>01</h3>
                        <p>Jedno rozhodnutí, jeden krok - s obrovskými odměnami.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
});

export default InfoBenefitS;