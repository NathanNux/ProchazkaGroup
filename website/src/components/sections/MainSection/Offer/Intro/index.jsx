import MainText from "@/components/anim/TextAnims/MainText";
import SubText from "@/components/anim/TextAnims/SubText";
import CustomImage from "@/components/ui/stickyImage";
import Image from "next/image";

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
                <MainText initialColor={'#050A10'} text={'NEMÁTE NA VAŠE FINANCE PROSTOR?<br /><br />30 MINUT VÁS DRŽÍ OD TAKOVÉHO ABSURDNÍHO FINANČNÍHO RŮSTU, ŽE I VAŠE VNOUČATA VÁM PODĚKUJI ZA TENTO KROK VPŘED. '}/>
            </div>
            <div className="IntroOffer__subText">
                <SubText className={'subtext__div'} text={'Každý den, kdy vaše dluhy rostou nebo inflace roste, ztrácíte peníze, které už nikdy neuvidíte.*'}/>
            </div>
            <div className="IntroOffer__image__container">
                <Image src='/assets/reviewsBackground.png' alt='about-image' fill={true}/>
            </div>
        </div>
    )
}