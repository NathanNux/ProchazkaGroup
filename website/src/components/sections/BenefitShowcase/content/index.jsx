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
                <h2>VYHRÁVÁTE SLUŽBY I Z LOKÁLNÍCH OBCHODŮ, KTERÉ  DO TOHO 
                    JDOU S NÁMI. VÁŠ VLIV POROSTE
                    A VYTVÁŘÍ VLNY, KTERÉ BUDEME CÍTIT V NAŠEM MĚSTĚ JEŠTĚ DLOUHO.
                </h2>
                <div className="devider"/>
            </div>

            <div className="footer__header">
                <div className="index">
                    <h3>01</h3>
                    <p>To nejlepší na odměnách?
                    Jsou okamžitě použitelné</p>
                </div>
                <div className="devider"/>
            </div>
            <div className="Image__wrapper">
                <div className="Image__container">
                    <Image src='/assets/small-tree.png' alt='small_tree' fill={true} quality={100} priority={true}/>
                </div>
            </div>
            
        </div>
    )
}