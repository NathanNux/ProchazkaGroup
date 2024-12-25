import LoopAnim from "@/components/anim/LoopAnims/GraphAnim";
import { chartData } from "@/constants/benefitpage";
import { useOnWindowResize } from "@/hooks/useOnWindowResize";
import { AreaChart } from "@tremor/react";
import { useState } from "react";


export default function Graph() {
    const [ isMobile, setIsMobile ] = useState(false)
    useOnWindowResize(() => {
        setIsMobile(window.innerWidth < 910)
    })
    return (
        <section className="Graph">
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
                        <div className="Anim__content__anim">
                            <LoopAnim />
                        </div>
                    </div> 
                </div>
                
            </div>
            <div className="Graph__Values">
                <div className="Graph__Values__header">
                    <h2>
                    Průměrný člověk za měsíc a získá 2 000 Kč zpět v poukázkách.
                    Top 10% V programu získá přes 25 000 Kč už za půl roku.
                    </h2>
                </div>
            </div>
        </section>
    )
}