import ONViewLogo from "@/components/anim/LogoAnims/onView";
import MainText from "@/components/anim/TextAnims/MainText";
import MyButton from "@/components/ui/stickyButtons/buttons/MyButton";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import { FooterLinks } from "@/constants/common";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import GetChars from "../navbar/body/getChars";
import { useNewsletterForm } from "@/hooks/useNewsletterForm";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
    const { toast } = useToast()
    const {
        formData,
        setFormData,
        loading,
        handleSubmit: handleNewsletterSubmit
    } = useNewsletterForm()

    const handleSubmit = async (e) => {
        e?.preventDefault()
        
        if (!formData.name || !formData.email) {
            toast({
                title: "Chyba!",
                description: "Prosím vyplňte všechna pole",
                variant: "destructive"
            })
            return
        }

        const result = await handleNewsletterSubmit()
        
        if (result.success) {
            toast({
                title: "Úspěch!",
                description: result.message,
                variant: "success"
            })
        } else {
            toast({
                title: "Chyba!",
                description: result.message,
                variant: "destructive"
            })
        }
    }
    return (
        <section className="Footer">
            <div className="Footer__Header">
                <div className="MainText">
                    <MainText initialColor={'#fff'} secondaryColor={'#00F0FF'} text={'JSME ODHOLÁNI VÁM ZLEHČIT <br /> <span>FINAČNÍ ASPEKT ŽIVOTA. </span> <br />KDYKOLIV JSTE PŘIPRAVENI, <br /><span> MY JSME TAKY.</span>'}/>
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
                            <RoundButton  href='#' text={ loading ? 'Odesilám...' : 'Chci se Zapojit'} disableLink={true} onClick={handleSubmit}/>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="Form__input__container">
                                <p>Δ</p>
                                <label htmlFor="name">Jméno:</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev =>({ ...prev, name: e.target.value }))}
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
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev =>({ ...prev, email: e.target.value }))} 
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
        </section>
    )
}