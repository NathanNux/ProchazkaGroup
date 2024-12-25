import RollingText from "@/components/anim/TextAnims/RollingText";
import SubText from "@/components/anim/TextAnims/SubText";

export default function LogoBar() {
    return (
        <div className="LogoBar">
            <div className="header">
                <SubText className={'heading'} text={'KDO SE PODÍLÍ:'}/>
            </div>
            <div className="Logos">
                <RollingText text='Ξ' baseVelocity={5} textsCount='23'/>
                <div className="devider"/>
            </div>
        </div>
    )
}