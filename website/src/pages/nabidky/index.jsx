import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import ClipPathPage from "@/components/sections/ClipPathPage"

export default function PrilezitostiPage() {
    return (
        <>
            <Head>
                <title>Exkluzivní Nabídky a Slevy | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Objevte exkluzivní nabídky a speciální slevy pouze pro klienty Procházka Group. Výhodné podmínky finančních produktů a služeb na míru." />
                <meta name="keywords" content="exkluzivní nabídky, finanční slevy, VIP podmínky, Procházka Group výhody, speciální nabídky" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/nabidky" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://prochazkagroup.cz/nabidky" />
                <meta property="og:title" content="Exkluzivní Nabídky a Slevy | Procházka Group" />
                <meta property="og:description" content="Speciální nabídky a VIP podmínky pro klienty Procházka Group." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image-offers.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/nabidky" />
                <meta property="twitter:title" content="Exkluzivní Nabídky | Procházka Group" />
                <meta property="twitter:description" content="Speciální nabídky a VIP podmínky pro klienty." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-offers.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "OfferCatalog",
                        "name": "Procházka Group - Exkluzivní Nabídky",
                        "description": "Katalog exkluzivních nabídek a slev pro klienty",
                        "url": "https://prochazkagroup.cz/nabidky",
                        "provider": {
                            "@type": "Organization",
                            "name": "Procházka Group",
                            "url": "https://prochazkagroup.cz"
                        },
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "VIP Finanční Poradenství",
                                    "description": "Exkluzivní finanční služby pro členy"
                                }
                            }
                        ]
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Navbar />
                <Cursor />
                <ClipPathPage />
            </main>
        </>
    )
}