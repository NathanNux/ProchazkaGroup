import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import { useToast } from "@/hooks/use-toast";

//NOTE: FeedBack and contact are switched

export default function FeedbackForm({ scroll }) {
    const top = useTransform(scroll, [0, 1], ['5%', '45%'])
    const { toast } = useToast()
    const {
        formData,
        setFormData,
        loading,
        handleSubmit: handleFeedbackSubmit
    } = useQuestionForm()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const result = await handleFeedbackSubmit()
        
        toast({
            title: result.success ? "Úspěch!" : "Chyba!",
            description: result.message,
            variant: result.success ? "success" : "destructive"
        })
    }
    return (
        <motion.section 
            className="FeedbackForm" 
            style={{top}}
            layout
            >
            <div className="form__wrapper">
                <div className="form">
                    <form>
                        <div className="input__container">
                            <div className="form__devider"/>
                            <h3>Δ</h3>
                            <div className="input__wrapper">
                                <label htmlFor="name">Jméno:</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                    placeholder="Vaše jméno"
                                    required
                                />
                            </div>
                            
                        </div>

                        <div className="input__container">
                            <div className="form__devider"/>
                            <h3>ζ</h3>
                            <div className="input__wrapper">
                                <label htmlFor="email">E-mail:</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                    placeholder="Váš E-mail"
                                    required
                                />
                            </div>      
                           
                        </div>

                        <div className="input__container">
                            <div className="form__devider"/>
                            <h3>π</h3>
                            <div className="input__wrapper">
                                <label htmlFor="phone">Tel. číslo:</label>
                                <input 
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))}
                                    placeholder="+420"
                                    required
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
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        message: e.target.value
                                    }))}
                                    placeholder="Vaše zpráva"
                                    required
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
                        href='/' 
                        text={loading ? 'Odesílám...' : 'Poslat Zprávu'}
                        onClick={handleSubmit}
                        disableLink={true}
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
                            <p>
                                +420 776 888 888
                            </p>
                            <p>ovb.asistenka@ovbmail.cz</p>
                        </div>
                        <div className="details__devider"/> 
                    </div>
                </div>
            </div>

            <div className="map__wrapper">
                <div className="map__container">
                    <div className="Header">
                        <p>Kde nás najdete | mapa</p>
                        <Image  src='/svg/mapIcon.svg' alt='map_icon' width={35} height={35}/>
                    </div>
                    <div className="Map">
                        <div  className="Map__div"/>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}