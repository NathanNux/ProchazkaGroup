import Head from "next/head"
import Footer from "@/components/common/footer"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import QNA from "@/components/common/qna"
import AboutInto from "@/components/intros/about"
import AboutTeam from "@/components/sections/aboutTeam"
import EventCollage from "@/components/sections/eventCollage"
import ParallaxExpanf from "@/components/sections/parallaxExpand"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>O nás | Procházka Group</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Poznejte tým Procházka Group. Jsme tu pro vás již přes dekádu a poskytujeme profesionální finanční poradenství založené na důvěře a expertize." />
        <meta name="keywords" content="Procházka Group tým, finanční poradci, historie společnosti, finanční experti, hodnoty společnosti" />
        <meta name="author" content="Procházka Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://prochazkagroup.cz/o-nas" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prochazkagroup.cz/o-nas" />
        <meta property="og:title" content="O nás | Procházka Group" />
        <meta property="og:description" content="Poznejte tým profesionálních finančních poradců Procházka Group." />
        <meta property="og:image" content="https://prochazkagroup.cz/og-image-about.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://prochazkagroup.cz/o-nas" />
        <meta property="twitter:title" content="O nás | Procházka Group" />
        <meta property="twitter:description" content="Poznejte tým profesionálních finančních poradců Procházka Group." />
        <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-about.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Procházka Group",
              "description": "Profesionální finanční poradenství s více než desetiletou tradicí",
              "url": "https://prochazkagroup.cz",
              "foundingDate": "2013",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Praha",
                "addressCountry": "CZ"
              },
              "employees": {
                "@type": "Person",
                "name": "Václav Procházka",
                "jobTitle": "Zakladatel"
              }
            }
          })}
        </script>
      </Head>
      <main lang="cs">
        <Navbar />
        <Cursor />
        <AboutInto />
        <ParallaxExpanf />
        <EventCollage />
        <AboutTeam />
        <QNA />
        <Footer />
      </main>
    </>
  )
}