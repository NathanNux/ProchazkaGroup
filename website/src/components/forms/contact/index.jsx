import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MyButton from "@/components/ui/stickyButtons/buttons/MyButton";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import ONViewLogo from "@/components/anim/LogoAnims/onView";
import { useReviewForm } from "@/hooks/useReviewForm";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import CopyText from "@/components/ui/copyText";
import GetChars from "@/components/common/navbar/body/getChars";
import { supabase } from "@/hooks/supabaseClient";
import { useFetchDatabase } from "@/hooks/useFetchDatabase";

//NOTE:FeedBack and contact are switched

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

const icons = [
    //WIP: add icons here
    { name: "facebook", src: "/thumbsUp.png" },
    { name: "instagram", src: "/thumbsUp.png" },
    { name: "linkedin", src: "/thumbsUp.png" },
    { name: "twitter", src: "/thumbsUp.png" },
    { name: "youtube", src: "/thumbsUp.png" },
    { name: "mainWeb", src: "/thumbsUp.png" }
];

export default function ContactForm({ scroll, name }) {
    const top = useTransform(scroll, [0, 1], ['5%', '45%'])
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 })
    
    const {fetchPeople} = useFetchDatabase()

    const { toast } = useToast()
    const {
        formData,
        setFormData,
        loading,
        setLoading,
        handleSubmit: handleReviewSubmit
    } = useReviewForm()

    // Set default person on mount
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            consultantName: name,
            reviewType: 'poradce' // Always poradce in this form
        }))
    }, [name, setFormData])

    const handleSubmit = async (e) => {
        e?.preventDefault()
        
        // Validace
        if (!formData.customerName.trim()) {
            toast({
                title: "Chyba!",
                description: "Prosím vyplňte jméno",
                variant: "destructive"
            })
            return
        }

        if (!formData.message.trim()) {
            toast({
                title: "Chyba!",
                description: "Prosím napište váš názor",
                variant: "destructive"
            })
            return
        }

        try {
            // Vytvoření nové recenze
            const reviewObject = {
                customer_name: formData.customerName,
                hashtag: 'poradce',
                consultant_name: name,
                message: formData.message,
                timestamp: new Date().toISOString(),
                approved: false
            }
    
            const { error: reviewError } = await supabase
                .from('reviews')
                .insert([reviewObject])
    
            if (reviewError) throw reviewError

            // Aktualizace počítadla v total
            const { data: totalData, error: totalError } = await supabase
                .from('total')
                .select('reviews, totalpeople')
                .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")
                .single()

            if (totalError) throw totalError

            const { error: updateError } = await supabase
                .from('total')
                .update({ reviews: totalData.reviews + 1,
                          totalpeople: totalData.totalpeople + 1
                 })
                .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")

            if (updateError) throw updateError

            const peopledata = await fetchPeople()
            const { data: peopleData, error: peopleError } = await supabase
                    .from('people')
                    .update({ reviews: peopledata[0].reviews + 1 })
                    .eq('name', name)
            
            if (peopleError) throw peopleError


            setFormData(prev => ({
                ...prev,
                customerName: '',
                message: '',
                consultantName: name,
                reviewType: 'poradce'
            }))

            toast({
                title: "Úspěch!",
                description: "Děkujeme za váš názor!",
                variant: "success"
            })

        } catch (error) {
            console.error('Error submitting review:', error)
            toast({
                title: "Chyba!",
                description: "Něco se pokazilo, zkuste to prosím znovu",
                variant: "destructive"
            })
        } finally {
        }
    }
    return (
        <motion.section 
            className="ContactForm" 
            style={{top}}
            layout
            >
                <div className="form__container">
                    <div className="form__wrapper">
                        <div className="logo">
                            <ONViewLogo />
                        </div>
                        <div className="form">
                            <form>
                                <div className="input__container">
                                    <div className="form__devider"/>
                                    <h3>Δ</h3>
                                    <div className="input__wrapper">
                                        <label htmlFor="name">Jméno:</label>
                                        <input 
                                            type="text" 
                                            value={formData.customerName}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                customerName: e.target.value
                                            }))}
                                            placeholder="Vaše jméno"
                                        />
                                    </div>
                                    
                                </div>

                                <div className="input__container">
                                    <div className="form__devider"/>
                                    <div className="input__wrapper" style={{ padding: 0}}>
                                        <div className="label__wrapper">
                                            <h3>λ</h3>
                                            <label htmlFor="message">Zpráva:</label>
                                            <div className="label__devider"/>
                                        </div>
                                        <textarea 
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                message: e.target.value
                                            }))}
                                            placeholder="Váš názor"
                                        />
                                    </div>
                                </div>
                                <div className="terms__container">
                                    <div className="form__devider"/>
                                    <p className="terms__text">Klinutím na “poslat žádost” souhlasíte se zpracováním vašich osobních údajů</p>
                                </div>
                            </form>
                        </div>

                        <div className="CTA">
                            <div className="devider"/>
                            <RoundButton 
                                href='' 
                                text={loading ? 'Odesílám...' : 'Poslat Recenzi'} 
                                disableLink={true}
                                onClick={handleSubmit}
                            />
                        </div>

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
                                    <CopyText text="+420 776 888 888" type='phone' className='pcopytext'/>
                                    <CopyText text="ovb.asistenka@ovbmail.cz" type='email' className='pcopytext'/>
                                </div>
                                <div className="details__devider"/> 
                            </div>
                        </div>
                    </div>

                    <div className="links__wrapper">
                        <div className="links__container">
                            <div className="Header">
                                <h3>σ</h3>
                                <p>Líbí se Vám naše služby a mysllíte že jsou férové.
                                Co takhle kdyby jste dali info i ostatním, zni fér ne?</p>
                            </div>
                            <div className="links">
                                {icons.map((icon, i) => (
                                <div key={i} className="link__container">
                                    <Image
                                        src={icon.src}
                                        alt={icon.name}
                                        width={50}
                                        height={50}
                                        priority
                                        quality={100}
                                    />
                                </div>
                            ))}
                            </div>
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
        </motion.section>
    )
}