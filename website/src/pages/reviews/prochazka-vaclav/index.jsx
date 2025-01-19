import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import ContactIntro from "@/components/intros/contact"
import { useFetchDatabase } from "@/hooks/useFetchDatabase"
import { useEffect, useState } from "react"
import { 
    FaFacebookF, 
    FaInstagram, 
    FaLinkedinIn, 
    FaTwitter, 
    FaYoutube,
    FaGlobe
} from 'react-icons/fa';

export const icons = [
  { name: "facebook", src: FaFacebookF, href: "https://www.facebook.com" },
  { name: "instagram", src: FaInstagram, href: "https://www.instagram.com" },
  { name: "linkedin", src: FaLinkedinIn, href: "https://www.linkedin.com" },
  { name: "twitter", src: FaTwitter, href: "https://www.twitter.com" },
  { name: "youtube", src: FaYoutube, href: "https://www.youtube.com" },
  { name: "mainWeb", src: FaGlobe, href: "https://www.prochazkagroup.cz" }
];

export default function PersonFeebackPage1() {

    const {fetchClovek} = useFetchDatabase()

    const [personData, setPersonData] = useState({
        name: 'Václav Procházka',
        moto: '',
        number: '01',
        databaseName: 'Václav Procházka'
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchClovek("Václav Procházka")
                if (data && data.length > 0) {
                    setPersonData(prev => ({
                        ...prev,
                        name: data[0].name,
                        moto: data[0].moto
                    }))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        loadData();
    }, [])
    
    return(
        <>
            <Head>
                <title>{`${personData.name} | Finanční Poradce | Procházka Group`}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={`${personData.name} - zakladatel a hlavní finanční poradce Procházka Group. Expert na investice a finanční plánování.`} />
                <meta name="keywords" content={`${personData.name}, Procházka Group zakladatel, finanční poradce, investiční expert, finanční plánování`} />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />
                <meta property="og:title" content={`${personData.name} | Zakladatel Procházka Group`} />
                <meta property="og:description" content={`Zakladatel a hlavní finanční poradce ${personData.name} z Procházka Group`} />
                <meta property="og:image" content="https://prochazkagroup.cz/profile-vaclav.jpg" />
                <meta property="profile:first_name" content="Václav" />
                <meta property="profile:last_name" content="Procházka" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://prochazkagroup.cz/reviews/prochazka-vaclav`} />
                <meta property="twitter:title" content={`${personData.name} | Zakladatel Procházka Group`} />
                <meta property="twitter:description" content={`Zakladatel a hlavní finanční poradce ${personData.name}`} />
                <meta property="twitter:image" content="https://prochazkagroup.cz/profile-vaclav.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": personData.name,
                        "jobTitle": "Zakladatel a Hlavní Finanční Poradce",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Procházka Group",
                            "founder": {
                                "@type": "Person",
                                "name": personData.name
                            }
                        },
                        "description": personData.moto,
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
                <ContactIntro name={personData.name} moto={personData.moto} number={personData.number} databaseName={personData.databaseName} icons={icons}/>
            </main>
        </>
    )
}