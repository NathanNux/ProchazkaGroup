import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import Statbar from "@/components/common/statbar";
import MainIntro from "@/components/intros/main";
import MainPageSection from "@/components/sections/MainSection";
import { StatbarData } from "@/constants/mainpage";
import Head from "next/head";



export default function Home() {
  return (
    <>
    <Head>
        <title>Procházka Group | Finanční Poradenství</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Procházka Group poskytuje profesionální finanční poradenství, řešení pojištění a investic. Komplexní finanční služby pro jednotlivce i firmy." />
        <meta name="keywords" content="finanční poradenství, investice, pojištění, Procházka Group, finance, wealth management" />
        <meta name="author" content="Procházka Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://prochazkagroup.cz" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prochazkagroup.cz" />
        <meta property="og:title" content="Procházka Group | Finanční Poradenství" />
        <meta property="og:description" content="Profesionální finanční poradenství, řešení pojištění a investic." />
        <meta property="og:image" content="https://prochazkagroup.cz/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://prochazkagroup.cz" />
        <meta property="twitter:title" content="Procházka Group | Finanční Poradenství" />
        <meta property="twitter:description" content="Profesionální finanční poradenství, řešení pojištění a investic." />
        <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image.jpg" />

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Procházka Group",
            "description": "Profesionální finanční poradenství",
            "url": "https://prochazkagroup.cz",
            "logo": "https://prochazkagroup.cz/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+420-XXX-XXX-XXX",
              "contactType": "customer service"
            }
          })}
        </script>
      </Head>
      <main>
        <Navbar />
        <Cursor />
        <MainIntro />
        <Statbar data={StatbarData}/>
        <MainPageSection />
        <QNA />
        <Footer />
      </main>
    </>
  )
}