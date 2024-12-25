import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import MainText from "@/components/anim/TextAnims/MainText";
import SubText from "@/components/anim/TextAnims/SubText";


export default function About() {
    //WIP: These Components do not have any anim. Anim needed to be done here as the desing dictates 
    return(
        <div className="About__Section">
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
            <div className="Text__container">
                <div className="header">
                    <div className="devider"/>
                    <h3>
                        02
                    </h3>
                    <p>Náš tým roste a zraje s jediným cílem:<br/> přinášet vám výsledky, a splnit naši misi.</p>
                </div>
                <div className="Main__text">
                    <MainText initialColor={'#050A10'} text={'SKRZE FINANČNÍ SEKTOR UMOŽŇUJEME<br />VYVÍJET NOVÉ ÚSPĚŠNÉ PŘÍBĚHY, <br />A TO NEJEN TY VAŠE.<br />SPOLEČNĚ MĚNÍME KAŽDODENNÍ SNY VE SKUTEČNOST.'}/>
                </div>
                <div className="Button__container">
                    <SubText className={'add__Text'} text={'Každý den přicházíme s řešeními, kteránašim klientům otevírají nové možnosti, a vytváříme hodnotu, která přetrvává.'}/>
                    <div className="button">
                        <RoundButton href="#" text="náš tým"/>
                    </div>
                    <div className="devider"/>
                </div>
            </div>
        </div>
    )
}