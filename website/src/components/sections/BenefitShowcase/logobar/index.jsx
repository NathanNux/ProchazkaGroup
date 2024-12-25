import RollingText from "@/components/anim/TextAnims/RollingText";

export default function LogoBar() {
    return (
        <div className="LogoBar">
            <div className="header">
                <h2>KDO SE PODÍLÍ:</h2>
            </div>
            <div className="Logos">
                <RollingText text='Ξ' baseVelocity={5} textsCount='23'/>
                <div className="devider"/>
            </div>
        </div>
    )
}