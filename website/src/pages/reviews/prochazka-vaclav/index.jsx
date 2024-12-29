import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import ContactIntro from "@/components/intros/contact"

export default function PersonFeebackPage1() {
    const name = "Václav Procházka"
    const moto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    const number = '01'
    const databaseName = 'prochazka-vaclav'
    
    return(
        <>
            <Head>
                <title>{`${name} | Finanční Poradce | Procházka Group`}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={`${name} - zakladatel a hlavní finanční poradce Procházka Group. Expert na investice a finanční plánování.`} />
                <meta name="keywords" content={`${name}, Procházka Group zakladatel, finanční poradce, investiční expert, finanční plánování`} />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />
                <meta property="og:title" content={`${name} | Zakladatel Procházka Group`} />
                <meta property="og:description" content={`Zakladatel a hlavní finanční poradce ${name} z Procházka Group`} />
                <meta property="og:image" content="https://prochazkagroup.cz/profile-vaclav.jpg" />
                <meta property="profile:first_name" content="Václav" />
                <meta property="profile:last_name" content="Procházka" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />
                <meta property="twitter:title" content={`${name} | Zakladatel Procházka Group`} />
                <meta property="twitter:description" content={`Zakladatel a hlavní finanční poradce ${name}`} />
                <meta property="twitter:image" content="https://prochazkagroup.cz/profile-vaclav.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": name,
                        "jobTitle": "Zakladatel a Hlavní Finanční Poradce",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Procházka Group",
                            "founder": {
                                "@type": "Person",
                                "name": name
                            }
                        },
                        "description": moto,
                        "image": "https://prochazkagroup.cz/profile-vaclav.jpg",
                        "url": `https://prochazkagroup.cz/reviews/prochazka-vaclav`,
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "professional",
                            "areaServed": "CZ",
                            "availableLanguage": ["Czech"]
                        }
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Cursor />
                <Navbar />
                <ContactIntro name={name} moto={moto} number={number} databaseName={databaseName}/>
            </main>
        </>
    )
}