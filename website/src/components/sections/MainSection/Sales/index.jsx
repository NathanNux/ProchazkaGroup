import RollingText from "@/components/anim/TextAnims/RollingText";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";


export default function Sales() {
    return (
        <div className="Sales">
            <div className="Content__Sales">
                <div className="Header">
                    <h3>Φ</h3>
                    <p>Máme pro naše klienty <br />
                        unique offres s našimi partnery
                    </p>
                    <div className="divider"/>
                </div>
                <div className="Main__Text">
                    <h4><span>VYJEDNALI JSME</span> PRO NAŠE KLIENTY SLEVY A SKVĚLÉ NABÍDKY 
                        TAKY <span>MIMO NAŠÍ OBLAST</span>, ABYSTE 
                        <span>UŠETŘILI I U KAŽDODENNÍCH POTŘEB</span>. 
                    </h4>
                </div>
                <div className="Button__container">
                    <div className="button">
                        <RoundButton href='#' text='Zobrazit Slevy'/>
                    </div>
                    <div className="divider"/>
                </div>
            </div>
            <div className="Image__container">
                <CustomImage altText='Sales-image' src='/assets/reviewsBackground.png'/>
            </div>
            <div className="Logo__container">
                <h2>NAŠI PARTNEŘI:</h2>
                <RollingText text='Ξ' baseVelocity={5} textsCount='25'/>
            </div>
        </div>
    )
}