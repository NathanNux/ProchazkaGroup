import MainText from "@/components/anim/TextAnims/MainText";
import CustomImage from "@/components/ui/stickyImage";

export default function BecomeAclient() {
    return(
        <div className="BecomeAclient">
            <div className="Image__container">
                <CustomImage src='/assets/reviewsBackground.webp' altText='about-image'/>
            </div>
            
            <div className="Texts">
                <MainText initialColor={'#050A10'} secondaryColor={'#FF5733'} text={'STAŇTE SE SOUČÁSTÍ NAŠÍ VIZE<br />A PROLOMTE S NÁMI TO <br /> MULTIGENERAČNÍ PROKLETÍ <br /> <br />JSME TU, KDYKOLIV SE ROZHODNETE <br /><span> – S NÁMI VÁŠ FINANČNÍ ÚSPĚCH</span> <br /> <span>ZARUČUJEME.</span>'}/>
                <div className="divider"/>
                <div className="divider"/>
                <div className="divider"/>
            </div>
        </div>
    )
}