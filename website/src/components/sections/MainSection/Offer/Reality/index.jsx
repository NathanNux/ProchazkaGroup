import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { useState } from "react"
import { AreaChart } from "@tremor/react";

const dataR = [
    {
        rate: '8/10',
        text: 'Domácností jsou v dluzích nebo je ignorují'
    },
    {
        rate: '3/10',
        text: 'Domácností zachraňuje Budgeting a správné praktiky před dluhy'
    },
    {
        rate: '1/10',
        text: 'Domácností má profesionála, který skutečně léčí jejich finance'
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
                    <p>Představte si, že každá rodina na tomhle grafu, <span>[kde jsou reální lidé]</span> má a bude mít neskutečný stres, dilema a radost života jim úplně zmizí. Opravdu chcete zapadnout mezi ně? </p>
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