import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import ReviewsIntro from "@/components/intros/reviews";
import ReviewsList from "@/components/modems/Review";
import Head from "next/head";

export default function ReviewsPage () {
    return(
        <>
            <Head>
                <title>Recenze a Hodnocení | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Přečtěte si recenze a hodnocení klientů Procházka Group. Zjistěte, jak pomáháme klientům dosáhnout jejich finančních cílů prostřednictvím profesionálního poradenství." />
                <meta name="keywords" content="recenze Procházka Group, hodnocení finančního poradenství, zkušenosti klientů, finanční poradci reference" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/recenze" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://prochazkagroup.cz/recenze" />
                <meta property="og:title" content="Recenze a Hodnocení | Procházka Group" />
                <meta property="og:description" content="Hodnocení a zkušenosti klientů s finančním poradenstvím Procházka Group." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image-reviews.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/recenze" />
                <meta property="twitter:title" content="Recenze a Hodnocení | Procházka Group" />
                <meta property="twitter:description" content="Hodnocení a zkušenosti klientů s finančním poradenstvím Procházka Group." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-reviews.jpg" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Procházka Group",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "reviewCount": "150"
                        },
                        "review": {
                            "@type": "Review",
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": "5"
                            },
                            "author": {
                                "@type": "Person",
                                "name": "Spokojení klienti"
                            }
                        }
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Cursor />
                <Navbar />
                <ReviewsIntro />
                <ReviewsList />
                <Footer />
            </main>
        </>
    )
}