import MainText from "@/components/anim/TextAnims/MainText";
import RollingText from "@/components/anim/TextAnims/RollingText";
import SubText from "@/components/anim/TextAnims/SubText";
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
                    <MainText initialColor={'#050A10'} text={'<span>VYJEDNALI JSME</span> PRO NAŠE KLIENTY<br />SLEVY A SKVĚLÉ NABÍDKY TAKY MIMO NAŠÍ OBLAST, ABYSTE UŠETŘILI<br />I U KAŽDODENNÍCH POTŘEB'}/>
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
                <SubText className={'subtext'} text={'BYLI JSME ZMÍNĚNI:'}/>
                <RollingText text='Ξ' baseVelocity={5} textsCount='25'/>
            </div>
        </div>
    )
}