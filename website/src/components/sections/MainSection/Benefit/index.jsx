import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import SubText from "@/components/anim/TextAnims/SubText";
import MainText from "@/components/anim/TextAnims/MainText";


export default function Benefit() {
    return(
        <section className="Benefit">
            <div className="Header">
                <div className="Index">
                    <h3>01</h3>
                    <p>Doporučte nás, přiveďte klienta, získejte až 25 000 Kč. Tak jednoduché to je.</p>
                </div>
                <div className="devider"/>
                <div className="MainText">
                    <MainText initialColor={'#fff'} text={'ŽÁDNÉ KOMPLIKACE. ŽÁDNÁ BYROKRACIE.<br />STAČÍ, ABY SE Z VAŠEHO<br />DOPORUČENÍ STAL NOVÝ KLIENT,<br />A PENÍZE JSOU VAŠE.<br />VYHRÁVÁTE VY, VYHRÁVÁ I ON.'}/>
                </div>
                <div className="Button__container">
                    <div className="button">
                        <RoundButton href='#' text='Zobrazit Program'/>
                    </div>
                </div>
            </div>

            <div className="Details">
                <div className="Image__container"
                >
                    <CustomImage altText='benefit__image' src='/assets/reviewsBackground.png'/>
                </div>
                <div className="subText">
                    <SubText text={'Ať už chcete splatit hypotéku, zajistit lepší<br/>budoucnost pro děti, nebo si dopřát něco<br/>navíc. Benefit program vám k tomu pomůže.<br/>Prostě doporučte, a sledujte, jak roste<br/>nejen váš úspěch, ale i jejich díky Vám.'}/>
                </div>
            </div>
        </section>
    )
}