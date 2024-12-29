import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import ContactIntro from "@/components/intros/contact"

export default function PersonFeebackPage2() {
    const name = "Ondřej Efenberk"
    const moto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const number = '02'
    const databaseName = 'efenberk-ondrej'
    
    return(
        <>
            <Head>
                <title>{`${name} | Finanční Poradce | Procházka Group`}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={`${name} - profesionální finanční poradce Procházka Group. Specializace na investice, pojištění a finanční plánování.`} />
                <meta name="keywords" content={`${name}, finanční poradce, Procházka Group, investiční poradenství, finanční plánování`} />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />
                <meta property="og:title" content={`${name} | Finanční Poradce`} />
                <meta property="og:description" content={`Profesionální finanční poradce ${name} z týmu Procházka Group`} />
                <meta property="og:image" content="https://prochazkagroup.cz/profile-ondrej.jpg" />
                <meta property="profile:first_name" content="Ondřej" />
                <meta property="profile:last_name" content="Efenberk" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />
                <meta property="twitter:title" content={`${name} | Finanční Poradce`} />
                <meta property="twitter:description" content={`Profesionální finanční poradce ${name} z týmu Procházka Group`} />
                <meta property="twitter:image" content="https://prochazkagroup.cz/profile-ondrej.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": name,
                        "jobTitle": "Finanční Poradce",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Procházka Group"
                        },
                        "description": moto,
                        "image": "https://prochazkagroup.cz/profile-ondrej.jpg",
                        "url": `https://prochazkagroup.cz/reviews/efenberk-ondrej`,
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