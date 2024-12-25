const cards = [
    {
        number: '01',
        content: 'Budete mít více času a klid díky plánování'
    },
    {
        number: '02',
        content: 'Kontrolujeme vaši situaci pravidelně'
    },
    {
        number: '03',
        content: 'Jsme vázáni zákonem a ČNB, máme zkušenosti i výsledky'
    }
]

export default function Benefits() {
    return(
        <div className="Benefits">
            <div className="text__container">
                <div className="header">
                    <h3>δ</h3>
                    <p>Budujeme finanční portfolia se sny těch, kteří věří v úspěch.</p>
                </div>
                <div className="subtext"> 
                    <p>Vaše finanční problémy nejsou jen čísla.<br /> Jsou to roky vašeho života, které můžete zachránit.</p>
                </div>
                <div className="story"
                    // WIP: this of how to animate this, maybe as absolute positioned small button "The Real Story"
                    style={{ display: 'flex'}}
                >
                    <h4>δ |</h4>
                    <p>
                        Velká většina rodin měli pocit, že nikdy neuvidí konec dluhů ani své špatné situace způsobené nezodpovědnými návyky. <br/> <br/> 
                        Společně jsme vytvořili plán, který nejen zlepšil jejich situaci, ale změnil jejich pohled na budoucnost. <br/> <br/> 
                        Dnes už řeší jen to, jak investovat své úspory a využít svůj volný čas s rodinou. Zní to dobře, že jo?
                    </p>
                </div>
            </div>
            <div className="cards__container">
                <div className="top__devider"/>
                {cards.map(( card, i) => {
                    const { number, content } = card
                    return(
                        <div className="card__wrapper" key={i}>
                            <div className="card">
                                <h3>{number}</h3>
                                <p>{content}</p>
                            </div>
                            <div className="devider"/>
                        </div>
                    )
                })}
            </div>
            <div className="divider"/>
        </div>
    )
}