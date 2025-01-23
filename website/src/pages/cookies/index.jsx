import Head from "next/head"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import Footer from "@/components/common/footer"
import CookiesContent from "@/components/sections/CookiesPage"

export default function CookiesPage() {
    return (
        <>
            <Head>
                <title>Zásady používání cookies | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Informace o používání cookies na webu Procházka Group. Zjistěte, jak používáme cookies pro zlepšení vašeho zážitku z prohlížení." />
                <meta name="keywords" content="cookies, zásady cookies, ochrana soukromí, GDPR, Procházka Group cookies" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/cookies" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://prochazkagroup.cz/cookies" />
                <meta property="og:title" content="Zásady používání cookies | Procházka Group" />
                <meta property="og:description" content="Informace o používání cookies a ochraně soukromí na webu Procházka Group." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/cookies" />
                <meta property="twitter:title" content="Zásady cookies | Procházka Group" />
                <meta property="twitter:description" content="Informace o cookies a ochraně soukromí." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Zásady používání cookies",
                        "description": "Informace o používání cookies na webu Procházka Group",
                        "url": "https://prochazkagroup.cz/cookies",
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
                <CookiesContent />
                <Footer />
            </main>
        </>
    )
}