import StatNumberVariable from "@/components/anim/TextAnims/StatNumber";
import Image from "next/image";

const deals = [
    {
        number: '01',
        content: 'Ušetříme Vám min. 500,- hned po první schůzce,'
    },
    {
        number: '02',
        content: 'Hned druhý den začneme, do 5 dnů vyřešíme a zavoláme'
    },
    {
        number: '03',
        content: 'Nevyžadujeme žádné dlouhodobé smlouvy'
    }
]

const quarentees = [
    {
        number: '01',
        content: 'A když ne, dáme 500,- Vám ve slevách, nebo v hotovosti'
    },
    {
        number: '02',
        content: 'Zpoždění? dáme vám naši limitovanou slevu k tomu'
    },
    {
        number: '03',
        content: 'Ale jsme upřímní s naši pomocí, takže choďte na čas.'
    }
]

const offerStats = [
    {
        value: '3000+',
        name: 'spokoných klientů',
        breakingPoint: '2500'
    },
    {
        value: '9 500,-',
        name: ' ušetřených korun / klienta',
        breakingPoint: '9000'
    }
]

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
                        <Image src='/svg/trophy.svg' alt="trophy_icon" width={50} height={50}/>
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
                    <p>
                        VEŘÍME PEVNĚ V NAŠE SLUŽBY AŽ DO TAKOVÉHO EXTRÉMU, ŽE VÁM MŮŽEME GARANTOVAT PENÍZE ZPĚT, KDYŽ NEDODRŽÍME NAŠE SLOVO.
                    </p>
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
                                <p>
                                    {content}
                                </p>
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
                                <p>
                                    {content}
                                </p>
                            </div>
                        )
                    })}  
                </div>
            </div>
        </div>
    )
}