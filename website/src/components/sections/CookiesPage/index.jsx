import PageHeading from "@/components/anim/TextAnims/PageHeading";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { CookiesSections } from "@/constants/cookiesTerms";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CookiesModem from "@/components/modems/CookiesModem";

export default function CookiesContent() {
    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = useRef([]);
    const [ isOpen, setIsOpen ] = useState(false)

    const handleLinkClick = (id) => {
        const section = document.getElementById(id);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const section = sectionRefs.current[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionBottom = sectionTop + rect.height;

                    if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
                        setActiveSection(CookiesSections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="CookiesContent">
            <div className="header">
                <h2>Σ</h2>
            </div>
            <div className="devider"></div>
            <div className="cover">
                <div className="cover__header">
                    <PageHeading text="CO JSOU COOKIES<br/>A JAK JE POUŽÍVÁME" />
                </div>
                <div className="cover__desc">
                    <h3>Σ</h3>
                    <p>Zde si můžete nastavit, ke kterým budeme mít přístup.</p>
                </div>
            </div>

            <div className="info__content">
                <nav className="info__page__navbar">
                    <div className="info__page__stickyBar">
                        <h3>Obsah</h3>
                        <ul className="info__page__ul">
                            {CookiesSections.map((section, i) => (
                                <li className="info__page__li" key={i}>
                                    <motion.div
                                        className="info__page__dot"
                                        animate={{ backgroundColor: activeSection === section.id ? '#00F0FF' : '#22272d' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.a
                                        href={`#${section.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(section.id);
                                        }}
                                        animate={{ opacity: activeSection === section.id ? 0.6 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {section.title}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <section className="info__block__main">
                    {CookiesSections.map((section, i) => (
                        <div key={i} className="info__block__section" ref={el => sectionRefs.current[i] = el}>
                            <h2 id={section.id}>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </section>
            </div>
            <div className="Cookies__Button">
                <p>Chcete si přenastavit vaše cookies?</p>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <RoundButton href='/' text='Nastavit' disableLink={true}/>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <CookiesModem open={setIsOpen} />
                )}
            </AnimatePresence>
        </section>
    );
}