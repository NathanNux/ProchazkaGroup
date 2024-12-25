
import ONViewLogo from "@/components/anim/LogoAnims/onView"
import MyButton from "@/components/ui/stickyButtons/buttons/MyButton"
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import Link from "next/link"

const FooterLinks = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/prochazkagroup'
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/prochazkagroup'
    },
    {
        name: 'Website',
        href: 'https://www.prochazkagroup.cz'
    },
    {
        name: 'Benefits',
        href: '/benefits'
    },
    {
        name: 'Locations',
        href: '/locations'
    },
    
]

export default function Intro404() {
    return(
        <section className="Intro404">
            <div className="Index">
                <h2>?</h2>
            </div>
            <div className="mainContent">
                <div className="MainText">
                    <h2>
                        OMLOUVÁME SE...<br />
                        TATO STRÁNKA <span>NENÍ</span> <br />
                        VE  SCHRÁNCE<br />
                    </h2>
                </div>
                <div className="logo">
                    <ONViewLogo />
                </div>
                <div className="Content404">
                    <div className="letter__wrapper">
                        <div className="letter__devider"/>
                        <h2>4</h2>
                    </div>
                    <div className="letter__wrapper">
                        <div className="letter__devider"/>
                        <h2>0</h2>
                    </div>
                    <div className="letter__wrapper">
                        <div className="letter__devider"/>
                        <h2>4</h2>
                    </div>
                    <div className="text__wrapper">
                        <div className="text__container">
                            <h3>?</h3>
                            <p>Page not found...</p>
                        </div>
                        <div className="text__devider"/>
                    </div>
                </div>
                <div className="Button__container">
                    <div  className="devider"/>
                    <div className="button">
                        <RoundButton href='/' text='Zpět na hlavní stránku' />
                    </div>
                </div>
            </div>
            <div className="addInfo">
                <div className="bottom__footer">
                    <div className="header">
                        <h3>
                        σ
                        </h3>
                        <p>
                            Chcete svou odpověď hned?
                            Zavolejte nám. 
                        </p>
                    </div>
                    <div className="phone__details">
                        <div className="details__devider"/> 
                        <div className="details">
                            <p>
                                +420 776 888 888
                            </p>
                            <p>ovb.asistenka@ovbmail.cz</p>
                        </div>
                        <div className="details__devider"/> 
                    </div>
                </div>
            </div>
            <div className="footer__Container">
                <div className="Footer__Links">
                    <div className="Links__Author">
                        <MyButton />
                    </div>
                    <div className="Links__container">
                        <div className="devider"/>
                        <div className="Social__Links">
                            {FooterLinks.map(( link, i ) => {
                                const { name, href } = link
                                return(
                                    <Link key={i} href={href}>
                                        {name}
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="Credits">
                            <p>2024 © ProcházakGroup Všechna práva udělena </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}