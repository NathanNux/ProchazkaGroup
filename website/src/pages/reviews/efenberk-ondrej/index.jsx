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
} from 'react-icons/fa';

export const icons = [
    //WIP: Every person should have their own social media links and kinds of social media
  { name: "facebook", src: FaFacebookF, href: "https://www.facebook.com" },
  { name: "instagram", src: FaInstagram, href: "https://www.instagram.com" },
  { name: "linkedin", src: FaLinkedinIn, href: "https://www.linkedin.com" },
  { name: "twitter", src: FaTwitter, href: "https://www.twitter.com" },
];

export default function PersonFeebackPage2() {
    const {fetchClovek} = useFetchDatabase()
    
        const [personData, setPersonData] = useState({
            name: 'Ondřej Efenberk',
            moto: '',
            number: '01',
            databaseName: 'Ondřej Efenberk'
        })
    
        useEffect(() => {
            const loadData = async () => {
                try {
                    const data = await fetchClovek("Ondřej Efenberk")
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
                <meta name="description" content={`${personData.name} - profesionální finanční poradce Procházka Group. Specializace na investice, pojištění a finanční plánování.`} />
                <meta name="keywords" content={`${personData.name}, finanční poradce, Procházka Group, investiční poradenství, finanční plánování`} />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />
                <meta property="og:title" content={`${personData.name} | Finanční Poradce`} />
                <meta property="og:description" content={`Profesionální finanční poradce ${personData.name} z týmu Procházka Group`} />
                <meta property="og:image" content="https://prochazkagroup.cz/profile-ondrej.jpg" />
                <meta property="profile:first_name" content="Ondřej" />
                <meta property="profile:last_name" content="Efenberk" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://prochazkagroup.cz/reviews/efenberk-ondrej`} />
                <meta property="twitter:title" content={`${personData.name} | Finanční Poradce`} />
                <meta property="twitter:description" content={`Profesionální finanční poradce ${personData.name} z týmu Procházka Group`} />
                <meta property="twitter:image" content="https://prochazkagroup.cz/profile-ondrej.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": personData.name,
                        "jobTitle": "Finanční Poradce",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Procházka Group"
                        },
                        "description": personData.moto,
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
                <ContactIntro name={personData.name} moto={personData.moto} number={personData.number} databaseName={personData.databaseName} icons={icons}/>
            </main>
        </>
    )
}