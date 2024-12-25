import CustomImage from "@/components/ui/stickyImage";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";


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
                    <p>SKRZE FINANČNÍ SEKTOR UMOŽŇUJEME VYVÍJET NOVÉ ÚSPĚŠNÉ PŘÍBĚHY, A TO NEJEN TY VAŠE. SPOLEČNĚ MĚNÍME KAŽDODENNÍ SNY VE SKUTEČNOST.</p>
                </div>
                <div className="Button__container">
                    <p className="add__Text">Každý den přicházíme s řešeními, která našim klientům otevírají nové možnosti, a vytváříme hodnotu, která přetrvává.</p>
                    <div className="button">
                        <RoundButton href="#" text="náš tým"/>
                    </div>
                    <div className="devider"/>
                </div>
            </div>
        </div>
    )
}