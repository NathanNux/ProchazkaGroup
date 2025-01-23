import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import Footer from "@/components/common/footer"
import TermsContent from "@/components/sections/TermsPage"

export default function PrivacyPolicyPage() {
    return (
        <>
            <Head>
                <title>Ochrana soukromí | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Ochrana osobních údajů a zásady zpracování dat společnosti Procházka Group. Zjistěte, jak chráníme vaše soukromí." />
                <meta name="keywords" content="ochrana soukromí, GDPR, zpracování dat, osobní údaje, Procházka Group" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/ochrana-soukromi" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://prochazkagroup.cz/ochrana-soukromi" />
                <meta property="og:title" content="Ochrana soukromí | Procházka Group" />
                <meta property="og:description" content="Zásady ochrany osobních údajů a zpracování dat." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/ochrana-soukromi" />
                <meta property="twitter:title" content="Ochrana soukromí | Procházka Group" />
                <meta property="twitter:description" content="Zásady ochrany osobních údajů." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image.jpg" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Ochrana soukromí",
                        "description": "Zásady ochrany osobních údajů Procházka Group",
                        "url": "https://prochazkagroup.cz/ochrana-soukromi",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Procházka Group",
                            "url": "https://prochazkagroup.cz"
                        },
                        "inLanguage": "cs-CZ",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Procházka Group",
                            "url": "https://prochazkagroup.cz"
                        }
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Navbar />
                <Cursor />
                <TermsContent />
                <Footer />
            </main>
        </>
    )
}