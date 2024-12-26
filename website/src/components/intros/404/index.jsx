
import ONViewLogo from "@/components/anim/LogoAnims/onView"
import SubText from "@/components/anim/TextAnims/SubText"
import MyButton from "@/components/ui/stickyButtons/buttons/MyButton"
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton"
import { FooterLinks } from "@/constants/common"
import Link from "next/link"
import { motion } from "framer-motion"
import GetChars from "@/components/common/navbar/body/getChars"
import { useState } from "react"

export default function Intro404() {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 })
    return(
        <section className="Intro404">
            <div className="Index">
                <h2>?</h2>
            </div>
            <div className="mainContent">
                <div className="MainText">
                    <SubText text='OMLOUVÁME SE...<br/>TATO STRÁNKA NENÍ<br/>VE SCHRÁNCE'/>
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
                            {FooterLinks.map((link, i) => {
                                const { name, href } = link;
                                return (
                                    <Link 
                                        key={`footerLink-${i}`} 
                                        href={href}
                                        onMouseEnter={() => setSelectedLink({ isActive: true, index: i })}
                                        onMouseLeave={() => setSelectedLink({ isActive: false, index: i })}
                                    >
                                        <motion.p>
                                            <GetChars
                                                text={name}
                                                selectedLink={selectedLink}
                                                index={i}
                                                initialColor={'#fff'}
                                            />
                                        </motion.p>
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