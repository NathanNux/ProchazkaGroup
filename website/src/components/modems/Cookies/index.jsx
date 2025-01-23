import SmallButton from "@/components/ui/stickyButtons/buttons/SmallButton";
import CookiesModem from "../CookiesModem";
import { useCookies } from "@/context/CookiesProvider";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookiesBar() {
    const [ settings, setSettings ] = useState(false);
    const { 
        acceptAllCookies, 
        rejectAllCookies, 
        savePreferences, 
        COOKIE_CATEGORIES,
        showBanner,
        hasConsented 
    } = useCookies();

    const handleAcceptNecessary = () => {
        savePreferences({
            ...Object.keys(COOKIE_CATEGORIES).reduce((acc, key) => ({
                ...acc,
                [key]: COOKIE_CATEGORIES[key].required
            }), {})
        });
    };

    return (
        <AnimatePresence mode="wait">
            {showBanner && (
                <motion.div 
                    className="cookies__bar"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="cookies__bar__text">
                        <p>
                            Používáme cookies pro základní funkce webu a analýzu návštěvnosti. 
                            <a href="/cookies">Více informací</a>
                        </p>
                        <p className="cookies__bar__text__secondary">
                            Kliknutím na tlačítko můžete spravovat své preference nebo přijmout všechna cookies.
                        </p>
                    </div>
                    <div className="cookies__bar__buttons">
                        <div className="cookies__bar__buttons__button">
                            <div onClick={acceptAllCookies}>
                                <SmallButton text="Souhlasím" href="/" />
                            </div>
                            <div onClick={handleAcceptNecessary}>
                                <SmallButton text="Nezbytné" href="/" />
                            </div>
                            <div onClick={rejectAllCookies}>
                                <SmallButton text="Nesouhlasím" href="/" />
                            </div>
                        </div>
                        <div className="cookies__bar__buttons__settings">
                            <div onClick={() => setSettings(!settings)}>
                                <SmallButton text="Nastavení" href="/" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <AnimatePresence>
                {settings && (
                    <CookiesModem open={setSettings} />
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
}