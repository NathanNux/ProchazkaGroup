const cards = [
    {
        number: '6 let',
        content: 'Dlouholeté spolupráce vyžadují naše nejlepší vysledky s klienty'
    },
    {
        number: '100%',
        content: 'Dochvilnost a připravenost zkrátí schůzky až na polovinu'
    },
    {
        number: '3 měsíce',
        content: 'Trvá než se člověk naučí správně používat svůj měsíční rozpočet'
    }
]

export default function Requirements () {
    return (
       <div className="Requirements">
            <div className="Text__container">
                <div className="Header">
                    <h3>ψ</h3>
                    <p>To, co by bežně zabralo dekády vybudovat, s námi dokážete během několika let </p>
                    <div className="devider"/>
                </div>
                <div className="Main__text">
                    <p>
                        JEDINÉ, CO OD VÁS CHCEME, JE VAŠE ČIRÁ POZORNOST A ODHODLÁNÍ.  
                        <br />A MY VÁM DÁME PRVOTŘÍDNÍ SERVIS<br />BEZ HLOUPÉ NÁMAHY.
                    </p>
                </div>
            </div>

            <div className="Cards__container">
                {cards.map(( card, i) => {
                    const { number, content } = card
                    return(
                        <div className="card__wrapper" key={i}>
                            <div className="card">
                                <h3>    
                                    {number}
                                </h3>
                                <p>
                                    {content}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
       </div> 
    )
}