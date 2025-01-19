import MainText from "@/components/anim/TextAnims/MainText";
import Image from "next/image";

export default function Content() {
    return (
        <div className="Content">
            <div className="header">
                <p>
                    Chcete vidět něco úžesného? Koukněte na tohle!
                </p>
                <div className="devider"/>
            </div>

            <div className="main__text">
                <MainText initialColor={'#fff'} secondaryColor={'#00F0FF'} text={'VYHRÁVÁTE SLUŽBY I <span>Z LOKÁLNÍCH</span><br /><span>OBCHODŮ</span>, KTERÉ  DO TOHO JDOU S NÁMI.<br />VÁŠ VLIV POROSTE A VYTVÁŘÍ VLNY,<br />KTERÉ BUDEME CÍTIT V<br />NAŠEM MĚSTĚ JEŠTĚ DLOUHO.'}/>
                <div className="devider"/>
            </div>

            <div className="footer__header">
                <div className="index">
                    <h1>01</h1>
                    <p>To nejlepší na odměnách?
                    Jsou okamžitě použitelné</p>
                </div>
                <div className="devider"/>
            </div>
            <div className="Image__wrapper">
                <div className="Image__container">
                    <Image 
                        src='/assets/small-tree.webp' 
                        alt='small_tree' 
                        fill={true} 
                        sizes="50vw"
                        quality={100} 
                        priority={true}
                        placeholder="blur"
                        blurDataURL="data:image/webp"
                    />
                </div>
            </div>
            
        </div>
    )
}