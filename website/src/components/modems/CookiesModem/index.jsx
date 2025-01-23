import { motion, AnimatePresence } from "framer-motion";
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton";
import SmallButton from "@/components/ui/stickyButtons/buttons/SmallButton";
import { useCookies } from "@/context/CookiesProvider";
import { useState } from "react";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";

const modemAnim = {
    open: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        },
    },
    closed: {
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        },
    }
}

export default function CookiesModem({ open }) {
    const { COOKIE_CATEGORIES, preferences, savePreferences } = useCookies();
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleToggle = (categoryId) => {
        if (COOKIE_CATEGORIES[categoryId].required) return;
        
        setLocalPreferences(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleSave = () => {
        savePreferences(localPreferences);
    };

    return (
        <motion.section 
            className="CookiesModem"
            initial={{ x: "100%", opacity: 0 }}
            animate="open"
            exit="closed"
            variants={modemAnim}
        >
            <div className="exit__button" onClick={() => open(false)}>
                <SVGButton src='/svg/exit.svg' altText='close_icon'/>
                <p>Zavřít</p>
            </div>

            <div className="cookies__content">
                <div className="cookies__header">
                    <h3>Nastavení cookies</h3>
                    <p>
                        Zde můžete upravit své preference ohledně cookies. 
                        Nezbytné cookies jsou vždy povoleny pro správné fungování webu.
                    </p>
                </div>

                <div className="cookies__options">
                    {Object.entries(COOKIE_CATEGORIES).map(([id, category]) => (
                        <div key={id} className="cookie__option">
                            <div className="cookie__option__header">
                                <div className="checkbox__container">
                                    <input
                                        type="checkbox"
                                        checked={localPreferences[id]}
                                        onChange={() => handleToggle(id)}
                                        disabled={category.required}
                                    />
                                    <h4>{category.name}</h4>
                                </div>
                                <p>{category.description}</p>
                            </div>
                            <div className="cookie__option__details">
                                <p>Poskytovatelé: {category.providers.join(', ')}</p>
                                <p>Cookies: {category.cookies.join(', ')}</p>
                            </div>
                            <div className="devider"/>
                        </div>
                    ))}
                </div>

                <div className="cookies__save">
                    <div onClick={handleSave}>
                        <RoundButton text="Uložit" href='' disableLink={true} />
                    </div>
                    <div className="devider"/>
                </div>
            </div>
        </motion.section>
    );
}