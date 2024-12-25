import CustomImage from "@/components/ui/stickyImage";

export default function IntroOffer(){
    return(
        <div className="IntroOffer">
            <div className="divider"/>
            <div className="IntroOffer__header">
                <div className="header__wrapper">
                    <h3>δ</h3>
                    <p>Náš sen je, aby všichni lidé <br /> byli finančně nezávislý: </p>
                </div>
                <div className="devider"/>
            </div>
            <div className="IntroOffer__MainText">
                <p>
                    NEMÁTE NA VAŠE FINANCE PROSTOR?<br /> <br />

                    30 MINUT VÁS DRŽÍ OD TAKOVÉHO ABSURDNÍHO FINANČNÍHO RŮSTU, 
                    ŽE I VAŠE VNOUČATA VÁM PODĚKUJI ZA TENTO KROK VPŘED. 
                </p>
            </div>
            <div className="IntroOffer__subText">
                <p>                
                    Každý den, kdy vaše dluhy rostou nebo inflace roste, ztrácíte peníze, které už nikdy neuvidíte.*
                </p>
            </div>
            <div className="IntroOffer__image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
        </div>
    )
}