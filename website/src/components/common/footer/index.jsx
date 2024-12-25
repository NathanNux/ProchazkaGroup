import ONViewLogo from "@/components/anim/LogoAnims/onView";
import MainText from "@/components/anim/TextAnims/MainText";
import MyButton from "@/components/ui/stickyButtons/buttons/MyButton";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import Link from "next/link";

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
export default function Footer() {
    return (
        <section className="Footer">
            <div className="Footer__Header">
                <div className="MainText">
                    <MainText initialColor={'#fff'} text={'JSME ODHOLÁNI VÁM ZLEHČIT <br /> <span>FINAČNÍ ASPEKT ŽIVOTA. </span> <br />KDYKOLIV JSTE PŘIPRAVENI, <br /><span> MY JSME TAKY.</span>'}/>
                </div>
                <div className="Logo">
                    <ONViewLogo />
                </div>  
            </div>
            <div className="Footer__Form">
                <div className="Form__container">
                    <div className="Form__header">
                        <div className="Form__header__index">
                            <p>
                            ε
                            </p>
                            <h3>
                                05
                            </h3>
                        </div>
                        <div className="Form__header__text">
                            <p>
                             Naše měsíční novinky toho nejdůležitějšího ze světa financí
                            </p>
                        </div>
                    </div>
                    <div className="Form__form">
                        <div className="devider"/>
                        <div className="button__container">
                            <RoundButton  href='/' text='Chci se Zapojit'/>
                        </div>
                        <form>
                            <div className="Form__input__container">
                                <p>Δ</p>
                                <label htmlFor="name">Jméno:</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Vaše jméno"
                                    required
                                />
                            </div>
                            <div className="devider2"/>
                            <div className="Form__input__container">
                                <p>Δ</p>
                                <label htmlFor="email">E-mail:</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Váš email"
                                    required
                                />
                            </div>
                            <div className="devider3"/>
                            <p className="gdpr">Klinutím na “chci se zapojit” souhlasíte se zpracováním vašich osobních údajů</p>
                        </form>
                    </div>
                </div>
            </div>
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
        </section>
    )
}