import CustomImage from "@/components/ui/stickyImage";

export default function BecomeAclient() {
    return(
        <div className="BecomeAclient">
            <div className="Image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div>
            
            <div className="Texts">
                <p>
                    STAŇTE SE SOUČÁSTÍ NAŠÍ VIZE A PROLOMTE S NÁMI TO MULTIGENERAČNÍ FINANČNÍ PROKLETÍ
                </p>
                <p>
                    JSME TU, KDYKOLIV SE ROZHODNETE
                    – S NÁMI VÁŠ FINANČNÍ ÚSPĚCH ZARUČUJEME.
                </p>
                <div className="divider"/>
                <div className="divider"/>
                <div className="divider"/>
            </div>
        </div>
    )
}