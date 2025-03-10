import SubText from "@/components/anim/TextAnims/SubText"
import { chartData, dataR } from "@/constants/mainpage"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { AreaChart } from "@tremor/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePerformance } from "@/context/PerformanceProvider"

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


export default function Reality() {
    // Performance
    const { shouldReduceAnimations } = usePerformance();

    const [ isMobile, setIsMobile ] = useState(false)
    useOnWindowResize(() => {
        setIsMobile(window.innerWidth < 910)
    })
    return (
        <div className="Reality">
            <div className="Graph__container">
                <div className="header__text">
                    <h3>δ |</h3>
                    <p>
                        Představte si, že každá rodina na tomhle grafu, <br/>
                        <span>[kde jsou reální lidé]</span> má a bude mít neskutečný stres, dilema a radost života jim úplně zmizí. <br/>
                        Opravdu chcete zapadnout mezi ně?
                    </p>
                </div>
                <div className="graph__wrapper">
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
                        showTooltip={true}
                        enableLegendSlider={true}
                    />
                </div>
                <div className="addText">
                    <h3>CNB |</h3>
                    <p>Statistiky</p>
                </div>
            </div>
            <motion.div 
                className="Text__container"
                variants={shouldReduceAnimations ? {} : containerVariants}
                initial={shouldReduceAnimations ? { opacity: 1 } : "hidden"}
                whileInView={shouldReduceAnimations ? {} : "visible"}
                viewport={{ once: false, margin: "-100px" }}
            >
                {dataR.map((data, i) => {
                    const { rate, text } = data;
                    return(
                        <motion.div 
                            className="Text__wrapper" 
                            key={i}
                            variants={shouldReduceAnimations ? {} : rectVariants}
                            initial={shouldReduceAnimations ? { opacity: 1, x: 0 } : {}}
                        >
                            <div className="divider"/>
                            <h3>{rate}</h3>
                            <p>{text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <div className="divider"/>
        </div>
    )
}