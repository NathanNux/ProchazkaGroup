import PageHeading from "@/components/anim/TextAnims/PageHeading";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { CookiesSections, PrivacySections } from "@/constants/cookiesTerms";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";

export default function TermsContent() {
    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = useRef([]);

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
        <section className="TermsContent">
            <div className="header">
                <h2>Σ</h2>
            </div>
            <div className="devider"></div>
            <div className="cover">
                <div className="cover__header">
                    <PageHeading text="VŠE O OCHRANĚ A<br/>POUŽITÍ VAŠICH ÚDAJŮ A<br/>INFORMACÍ" />
                </div>
                <div className="cover__desc">
                    <h3>Σ</h3>
                    <p>
                        Detaily a všechny podrobné informace
                    </p>
                </div>
            </div>

            <div className="info__content">
                <nav className="info__page__navbar">
                    <div className="info__page__stickyBar">
                        <h3>Obsah</h3>
                        <ul className="info__page__ul">
                            {PrivacySections.map((section, i) => (
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
                    {PrivacySections.map((section, i) => (
                        <div key={i} className="info__block__section" ref={el => sectionRefs.current[i] = el}>
                            <h2 id={section.id}>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
}