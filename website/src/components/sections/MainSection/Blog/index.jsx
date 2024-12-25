import RollingText from "@/components/anim/TextAnims/RollingText";
import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import MainText from "@/components/anim/TextAnims/MainText";
import SubText from "@/components/anim/TextAnims/SubText";


export default function Blog () {
    return (
        <div className="Blog">
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
            <div className="Content__wrapper">
                <div className="header">
                    <h3>
                    δ
                    </h3>
                    <p>
                    A máme pro Vás další<br /> hromadu kvalitních článků 
                    </p>
                </div>
                <div className="button__container">
                    <div className="button">
                        <RoundButton href='#' text='Chci Víc'/>
                    </div>
                    <div className="devider"/>
                </div>
                <div className="main__Text">
                    <MainText initialColor={'#050A10'} text={'10 NEPŘÍJEMNÝCH VĚCÍ [ZDARMA], KTERÉ VÁM VÁŠ BANKÉŘ URČITĚ ZATAJIL A TAKY NIKDY NEŘEKNE. PROJDĚTE SI JE HNED TEĎ.'}/>
                    <div className="devider"/>
                </div>
            </div>
            <div className="logos__wrapper">
                <div className="header">
                    <SubText text={'BYLI JSME ZMÍNĚNI:'}/>
                </div>
                <div className="devider__wrapper"/>
                <RollingText text='Ξ' baseVelocity={5} textsCount='25'/>
                <div className="devider__wrapper"/>
            </div>
        </div>
    )
}