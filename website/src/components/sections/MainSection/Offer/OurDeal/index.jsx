import MainText from "@/components/anim/TextAnims/MainText";
import StatNumberVariable from "@/components/anim/TextAnims/StatNumber";
import SubText from "@/components/anim/TextAnims/SubText";
import { deals, offerStats, quarentees } from "@/constants/mainpage";
import Image from "next/image";

export default function OurDeal() {
    const parseValue = (value) => {
        // Remove currency symbol and commas
        const cleanValue = value.replace(/[^0-9]/g, '');
        return parseInt(cleanValue, 10);
    }
    return (
        <div className="OurDeal">
            <div className="The__deal__container">
                <div className="stats__container">
                    <div className="header">
                        <h3>ψ</h3>
                        <p>Takže jdeme k věci: Tady jsou naše výsledky, dobrý ne?</p>
                        <Image 
                            src='/svg/trophy.svg' 
                            alt="trophy_icon" 
                            width={50} 
                            height={50}
                            priority={false}
                            quality={60}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg"
                        />
                    </div>
                    <div className="devider"/>
                    <div className="stats__wrapper">
                        {offerStats.map(( stat, i) =>{
                            const { value, name, breakingPoint } = stat
                            const numericValue = parseValue(value);

                            return(
                                <div className="stat__container" key={i}>
                                    <div className="number__wrapper">
                                        <StatNumberVariable
                                            number={numericValue}  
                                            EndDuration={4} 
                                            StartDuration={2} 
                                            BreakPoint={breakingPoint}
                                            delay={0}
                                            // WIP: fix the animation so it only animates onView
                                        />
                                        {value.includes(',-') && <span className="currency">,-</span>}
                                    </div>
                                    <p>{name}</p>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>

                <div className="mainText">
                    <MainText initialColor={'#050A10'} secondaryColor={'#FF5733'} text={'VĚŘÍME PEVNĚ V NAŠE SLUŽBY AŽ DO TAKOVÉHO EXTRÉMU, ŽE VÁM<br /> MŮŽEME <span>GARANTOVAT PENÍZE ZPĚT, KDYŽ NEDODRŽÍME NAŠE SLOVO.</span>'}/>
                </div>
            </div>
            <div className="Quarentees__wrapper">
                <div className="deals__wrapper">
                    {deals.map(( deal, i) =>{
                        const { number, content } = deal

                        return(
                            <div className="deal__container" key={i}>
                                <h3>
                                    {number}
                                </h3>
                                <SubText initialColor="#050A10" text={content}/>
                            </div>
                        )
                    })}
                </div>
                <div className="devider"/>
                <div className="quarantees__wrapper">
                    {quarentees.map(( quarentee, i) =>{
                        const { number, content } = quarentee

                        return(
                            <div className="deal__container" key={i}>
                                <h3>
                                    {number}
                                </h3>
                                <SubText initialColor="#050A10" text={content}/>
                            </div>
                        )
                    })}  
                </div>
            </div>
        </div>
    )
}