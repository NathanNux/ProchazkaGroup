import { motion, useTransform } from "framer-motion"
import Image from "next/image";
import { forwardRef,} from "react";

const InfoBenefitS = forwardRef(function InfoBenefitS({ scroll }, ref) {

    const firstContent = useTransform(
        scroll,
        [0, 0.35, 0.4 , 1],
        [1, 1, 0, 0]
    )
    const headerMove = useTransform(
        scroll,
        [0, 0.5, 0.6, 1],
        ['0vw', '0vw', '-50vw', '-50vw']
    );
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
                                <h2>DÁVÁME ZPĚT, ABYCHOM SPOLEČNĚ VYBUDOVALI VÍCE NEŽ JEN FINANČNÍ ÚSPĚCH</h2>
                                <p>
                                    Proč to děláme: Už 12 let tvoříme hodnoty, ne jen zisky. Když s vámi
                                    spolupracujeme, nejde o to, abychom &#39;dostali zaplaceno.&#39; Je to
                                    o změně, kterou můžeme přinést. Vaše doporučení a příběhy pomáhají růst
                                    naší vizi a vytvářejí opravdový dopad — a my chceme, aby to bylo stejně
                                    přínosné pro vás jako pro nás.                                
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
                                <h2>BUĎTE HRDINOU OSTATNÍCH A ZÁROVEŇ MĚŇTE ŽIVOT SOBĚ. </h2>
                                <p>
                                    Realita: Není to jen o tom, abyste měli něco jen pro sebe — jde o to zvedat i ostatní, a stát se tím, co jim změní život a vyléčí je finančně.
                                    Zamyslete se nad tím—co je mocnější než vědět, že vaše činy pomáhají ostatním, zatímco i Vy máte něco pro sebe?
                                    A tím to nekončí. Zní fér?                            
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
                                <h2>VAŠE ÚSPĚCHY, NAŠE POSLÁNÍ - PŘÍBĚH, KTERÝ PÍŠEME SPOLU</h2>
                                <p>
                                  Jak fungujeme: neplatíte nám nic předem. Naše &#39;odměna&#39; není jen plan na konci měsíce, ale naše opravdová odměna je vaše důvěra a výsledky, které společně dosáhneme. Každé doporučení, každá úspěšná spolupráce posiluje naši misi měnit životy skrze finanční svobodu. Chceme, aby tahle spolupráce měla smysl.
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
                                <h2>STAČÍ JEDEN KROK A ZAČNETE SBÍRAT REÁLNÉ ODMĚNY.
                                    ŽÁDNÉ KRAVINY. NENÍ ČAS OTÁLET, ZMĚNA ZAČÍNÁ TEĎ
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
                    <Image  src='/assets/backgroundSection.png' alt='background__section' fill={true}/>
                    <div className="mainHeader">
                        <h2>JDE O VYTVOŘENÍ NĚČEHO, CO VYDRŽÍ GENERACE—VĚTŠÍ NEŽ MY, VĚTŠÍ NEŽ VY,
                            VYTVOŘÍME TRVALÝ DOPAD</h2>
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