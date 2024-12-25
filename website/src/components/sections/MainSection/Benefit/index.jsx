import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";


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
                    <p>
                        ŽÁDNÉ KOMPLIKACE. ŽÁDNÁ BYROKRACIE. STAČÍ, ABY SE Z VAŠEHO DOPORUČENÍ STAL NOVÝ KLIENT, A PENÍZE JSOU VAŠE. 
                        VYHRÁVÁTE VY, VYHRÁVÁ I ON.
                    </p>
                </div>
                <div className="Button__container">
                    <div className="button">
                        <RoundButton href='#' text='Zobrazit Program'/>
                    </div>
                </div>
            </div>

            <div className="Details">
                <div className="Image__container"
                    //WIP: Create translate expand anim for the image container onView
                >
                    <CustomImage altText='benefit__image' src='/assets/reviewsBackground.png'/>
                </div>
                <div className="subText">
                    <p>
                        Ať už chcete splatit hypotéku, zajistit lepší budoucnost pro děti, nebo si dopřát něco navíc. Benefit program vám k tomu pomůže
                        Prostě doporučte, a sledujte, jak roste nejen váš úspěch, ale i jejich díky Vám.
                    </p>
                </div>
            </div>
        </section>
    )
}