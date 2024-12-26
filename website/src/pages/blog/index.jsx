import Head from "next/head"
import BlogPostContent from "@/components/common/blog"
import Footer from "@/components/common/footer"
import Navbar from "@/components/common/navbar"
import Cursor from "@/components/common/navbar/cursor"
import BlogPostIntro from "@/components/intros/blogPost"

export default function BlogPostPage() {
    return (
        <>
            <Head>
                <title>10 věcí, které bankéř tají | Blog Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Odhalte 10 klíčových informací, které vám bankéři neříkají. Průvodce světem financí od expertů Procházka Group." />
                <meta name="keywords" content="finance, bankovnictví, finanční poradenství, bankovní tajemství, Procházka Group blog" />
                <meta name="author" content="Procházka Group" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://prochazkagroup.cz/blog/10-veci-ktere-banker-taji" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://prochazkagroup.cz/blog/10-veci-ktere-banker-taji" />
                <meta property="og:title" content="10 věcí, které bankéř tají | Blog Procházka Group" />
                <meta property="og:description" content="Odhalte 10 klíčových informací, které vám bankéři neříkají." />
                <meta property="og:image" content="https://prochazkagroup.cz/og-image-blog.jpg" />
                <meta property="article:published_time" content="2024-01-01" />
                <meta property="article:author" content="Procházka Group" />
                <meta property="article:section" content="Finance" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://prochazkagroup.cz/blog/10-veci-ktere-banker-taji" />
                <meta property="twitter:title" content="10 věcí, které bankéř tají | Blog Procházka Group" />
                <meta property="twitter:description" content="Odhalte 10 klíčových informací, které vám bankéři neříkají." />
                <meta property="twitter:image" content="https://prochazkagroup.cz/twitter-image-blog.jpg" />

                {/* Schema.org markup for Blog Post */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "10 nepříjemných věcí, které Vám váš bankéř určitě zatajil",
                        "image": "https://prochazkagroup.cz/og-image-blog.jpg",
                        "datePublished": "2024-01-01",
                        "dateModified": "2024-01-01",
                        "author": {
                            "@type": "Organization",
                            "name": "Procházka Group"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Procházka Group",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://prochazkagroup.cz/logo.png"
                            }
                        },
                        "description": "Odhalte 10 klíčových informací, které vám bankéři neříkají. Průvodce světem financí od expertů Procházka Group.",
                        "articleBody": "Komplexní průvodce finančním světem a odhalení skrytých informací v bankovnictví."
                    })}
                </script>
            </Head>
            <main lang="cs">
                <Cursor />
                <Navbar />
                <BlogPostIntro />
                <BlogPostContent />
                <Footer />
            </main>
        </>
    )
}