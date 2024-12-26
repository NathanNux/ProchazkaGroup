import Head from "next/head"
import Footer from "@/components/common/footer"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import QNA from "@/components/common/qna"
import FeedbackIntro from "@/components/intros/feedBack"

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Kontakt | Procházka Group</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Kontaktujte Procházka Group pro profesionální finanční poradenství. Najdete nás v Praze a dalších městech. Jsme tu pro vaše dotazy ohledně investic a pojištění." />
        <meta name="keywords" content="kontakt Procházka Group, finanční poradce kontakt, pobočky, konzultace, finanční poradenství" />
        <meta name="author" content="Procházka Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://prochazkagroup.cz/kontakt" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prochazkagroup.cz/kontakt" />
        <meta property="og:title" content="Kontakt | Procházka Group" />
        <meta property="og:description" content="Kontaktujte nás pro profesionální finanční poradenství." />
        <meta property="og:image" content="https://prochazkagroup.cz/og-image-contact.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://prochazkagroup.cz/kontakt" />
        <meta property="twitter:title" content="Kontakt | Procházka Group" />
        <meta property="twitter:description" content="Kontaktujte nás pro profesionální finanční poradenství." />
        <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-contact.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Procházka Group - Kontakt",
            "description": "Kontaktní stránka pro finanční poradenství",
            "url": "https://prochazkagroup.cz/kontakt",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+420-XXX-XXX-XXX",
              "email": "info@prochazkagroup.cz",
              "contactType": "customer service",
              "areaServed": "CZ",
              "availableLanguage": ["Czech"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "DOPLNIT ULICI",
              "addressLocality": "Praha",
              "postalCode": "XXX XX",
              "addressCountry": "CZ"
            }
          })}
        </script>
      </Head>
      <main lang="cs">
        <Cursor />
        <Navbar />
        <FeedbackIntro />
        <QNA />
        <Footer />
      </main>
    </>
  )
}