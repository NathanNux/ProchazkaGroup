import SubText from "@/components/anim/TextAnims/SubText"
import { chartData, dataR } from "@/constants/mainpage"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { AreaChart } from "@tremor/react"
import { useState } from "react"

export default function Reality() {
    const [ isMobile, setIsMobile ] = useState(false)
    useOnWindowResize(() => {
        setIsMobile(window.innerWidth < 910)
    })
    return (
        <div className="Reality">
            <div className="Graph__container">
                <div className="header__text">
                    <h3>δ |</h3>
                    <SubText text='Představte si, že každá rodina na tomhle grafu, [kde jsou reální lidé] má a bude mít neskutečný stres, dilema a radost života jim úplně zmizí. Opravdu chcete zapadnout mezi ně?'/>
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
            <div className="Text__container">
                {dataR.map((data, i) => {
                    const { rate, text } = data
                    return(
                        <div className="Text__wrapper" key={i}>
                            <div className="divider"/>
                            <h3>{rate}</h3>
                            <p>{text}</p>
                        </div>
                    )
                })}
            </div>
            <div className="divider"/>
        </div>
    )
}