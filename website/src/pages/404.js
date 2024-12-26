import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import Intro404 from "@/components/intros/404";
import Head from "next/head";


export default function Page404() {
    return (
        <>
            <Head>
                <title>404: Stránka nenalezena | Procházka Group</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Omlouváme se, ale požadovaná stránka nebyla nalezena. Navštivte naši hlavní stránku pro více informací o finančním poradenství." />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href="https://prochazkagroup.cz" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="404: Stránka nenalezena | Procházka Group" />
                <meta property="og:description" content="Omlouváme se, ale požadovaná stránka nebyla nalezena." />
                
                {/* Error page specific */}
                <meta name="prerender-status-code" content="404" />
            </Head>
            <main>
                <Cursor />
                <Navbar />
                <Intro404 />
            </main>
        </>
    )
}