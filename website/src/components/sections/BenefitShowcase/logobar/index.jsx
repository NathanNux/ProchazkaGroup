import RollingIcons from "@/components/anim/TextAnims/RollingIcons";
import RollingText from "@/components/anim/TextAnims/RollingText";
import SubText from "@/components/anim/TextAnims/SubText";

export default function LogoBar() {
    return (
        <div className="LogoBar">
            <div className="header">
                <SubText className={'heading'} text={'KDO SE PODÍLÍ:'}/>
            </div>
            <div className="Logos__logobar">
                <RollingIcons baseVelocity={2.5}/>
                <div className="devider"/>
            </div>
        </div>
    )
}