import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import BenefitReminder from "@/components/forms/BenefitReminder";
import ContactBenefit from "@/components/modems/ContactBenefit";
import BenefitDetails from "@/components/sections/BenefitDetails";
import BenefitProgramKeyframes from "@/components/sections/BenefitProgram";
import BenefitShowcase from "@/components/sections/BenefitShowcase";
import Head from "next/head";

export default function BenefitProgramPage() {
    //WIP: rework the texts only here, the page otherwise is in good state. 
    // The other work is solely relied on the cliet, when this is done, the project can be handed over, there will be only text and small adjustments
    return (
        <>
            <Head>
                <title>Benefit Program | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Exkluzivní benefit program Procházka Group. Získejte přístup k VIP výhodám, speciálním nabídkám a osobním konzultacím. Staňte se součástí našeho prémiového programu." />
                <meta name="keywords" content="benefit program, VIP výhody, finanční benefity, Procházka Group členství, prémiové služby, finanční poradenství výhody" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/benefit-program" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://prochazkagroup.cz/benefit-program" />
                <meta property="og:title" content="Exkluzivní Benefit Program | Procházka Group" />
                <meta property="og:description" content="Objevte výhody členství v benefit programu Procházka Group. Prémiové služby a VIP přístup." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image-benefits.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/benefit-program" />
                <meta property="twitter:title" content="Benefit Program | Procházka Group" />
                <meta property="twitter:description" content="Prémiové výhody a VIP služby pro členy benefit programu." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-benefits.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "Procházka Group Benefit Program",
                        "description": "Exkluzivní členský program s VIP výhodami a prémiovými službami",
                        "offers": {
                            "@type": "Offer",
                            "description": "Členství v benefitním programu",
                            "url": "https://prochazkagroup.cz/benefit-program",
                            "priceCurrency": "CZK",
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "Organization",
                                "name": "Procházka Group"
                            }
                        },
                        "brand": {
                            "@type": "Brand",
                            "name": "Procházka Group"
                        },
                        "category": "Financial Services",
                        "benefits": [
                            "VIP finanční poradenství",
                            "Prémiové konzultace",
                            "Speciální nabídky",
                            "Osobní přístup"
                        ]
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Navbar />
                <Cursor />
                <BenefitProgramKeyframes />
                <BenefitDetails />
                <BenefitShowcase />
                <BenefitReminder />
                <ContactBenefit />
                <QNA />
                <Footer />
            </main>
        </>
    )
}