import LoopAnim from "@/components/anim/LoopAnims/GraphAnim";
import { useOnWindowResize } from "@/hooks/useOnWindowResize";
import { AreaChart } from "@tremor/react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";

const values = [
    {
        number: '01',
        text: 'Za to, že se v životě nepohnete z místa'
    },
    {
        number: "02",
        text: "Za to, že platíte každý rok daně téměř za vše"
    },
    {
        number: "03",
        text: "Za to, že máte skvělé zdraví, volný čas a vztahy"
    }
]

const chartData = [
    {
      date: "2020",
      "Běžná cesta": 20000,
      "Naše cesta": 45000,
    },
    {
      date: "2025",
      "Běžná cesta": 35000,
      "Naše cesta": 85000,
    },
    {
      date: "2030",
      "Běžná cesta": 45000,
      "Naše cesta": 125000,
    },
    {
      date: "2035", 
      "Běžná cesta": 55000,
      "Naše cesta": 165000,
    }
]
//WIP: add here some form of transition. 
export default function TheWay() {
    const [ isMobile, setIsMobile ] = useState(false)
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    })

    const move1x = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 1],
        ['0%', '0%', '-100%', '-100%']
    )
    
    const move2x = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 1],
        ['100%', '100%', '0%', '0%']
    )
    useOnWindowResize(() => {
        setIsMobile(window.innerWidth < 910)
    })
    return (
        <section className="GraphTheWay" ref={sectionRef}>
            <div className="Graph__header">
                <h2>
                    naše stystémy garantují váš úspěch, udělali jsme je<br /> tak hloupě lehké, že není šance neusmět. 
                </h2>
                <div className="devider"/>
            </div>
            <div className="sticky__wrapper">
                <motion.div className="MainSection__wrapper" style={{ left: move1x}}>
                    <div className="Graph__wrapper">
                        <div className="Graph__wrapper__container">
                            <div className="Graph__content">
                                <div className="Graph__content__header">
                                    <h3>
                                        ψ
                                    </h3>
                                    <p>
                                        To, co by Vám bežně zabralo dekády,<br />
                                        s námi dokážete během několika let  
                                    </p>
                                </div>
                                <div className="Graph__content__graph">
                                    <AreaChart
                                        className={isMobile ? "h-60" : "h-full w-full"}
                                        data={chartData}
                                        index="date"
                                        categories={["Běžná cesta", "Naše cesta"]}
                                        colors={["customGray", "neonCyan"]}
                                        valueFormatter={(number) => 
                                            `${Intl.NumberFormat("cs").format(number)} Kč`
                                        }
                                        showLegend={!isMobile}
                                        showGridLines={false}
                                        showYAxis={!isMobile}
                                        showXAxis={true}
                                        startEndOnly={isMobile}
                                        fill='solid'
                                    />
                                </div>
                            </div>

                            <div className="Anim__content">
                                <div className="Anim__content__header">
                                    <h3>
                                        ψ
                                    </h3>
                                    <p>
                                        Radši pro náročnější <br /> ale rychlejší cestu? My jsme pro!
                                    </p>
                                </div>
                                <div className="Anim__content__anim">
                                    <LoopAnim />
                                </div>
                            </div> 
                        </div>
                        
                    </div>
                    <div className="Graph__Values">
                        <div className="Graph__Values__header">
                            <h2>
                                V životě zaplatíte nejvíc za tyhle 3 věci:
                            </h2>
                            <div className="devider"/>
                        </div>
                        <div className="Graph__Values__Cards">
                            { values.map((value, i) => {
                                const { number, text } = value;
                                return(
                                    <div className="Graph__Values__Card__item" key={i}>
                                        <h3>
                                            {number}
                                        </h3>
                                        <p>
                                            {text}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
                <motion.div className="SubSection__wrapper" style={{ left: move2x}}>
                    <div className="devider"/>
                    <div className="devider"/>
                    <div className="Anim__content">
                        <div className="Anim__content__header">
                            <h3>
                                ψ
                            </h3>
                            <p>
                                Jen jedna schůzka Vás dělí <br /> od lepší budoucnosti. 
                            </p>
                        </div>
                        <div className="Anim__content__anim">
                            <LoopAnim />
                        </div>
                    </div> 
                    <div className="text__content">
                        <div className="main__text">
                            <p>
                                PRVNÍ KROK? PŘIJĎTE NA SCHŮZKU. MY SE POSTARÁME O ZBYTEK – ŽÁDNÉ VELKÉ OBĚTI,  <br />
                                JEN SKUTEČNÝ PLÁN A KROK PO KROKU K VELKÉ ZMĚNĚ VPŘED - JEDNODUŠE
                            </p>
                            <div className="divider"/>
                            <div className="divider"/>
                        </div>
                        <div className="sub__text">
                            <p>
                                Nestojí za to udělat něco, co trvá <br /> jen 30 minut, když to může změnit celý váš život? <br />
                                <span>A nemyslíme to jako vtip</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}