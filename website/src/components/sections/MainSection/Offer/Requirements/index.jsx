import MainText from "@/components/anim/TextAnims/MainText"
import { cardsRequirements } from "@/constants/mainpage"


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
                    <MainText initialColor={'#050A10'} text={'JEDINÉ, CO OD VÁS CHCEME, JE VAŠE ČIRÁ POZORNOST A ODHODLÁNÍ. <br />A MY VÁM DÁME PRVOTŘÍDNÍ SERVIS<br />BEZ HLOUPÉ NÁMAHY.'}/>
                </div>
            </div>

            <div className="Cards__container">
                {cardsRequirements.map(( card, i) => {
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