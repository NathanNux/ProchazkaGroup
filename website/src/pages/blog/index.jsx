import BlogPostContent from "@/components/OtherAnims/blogPost";
import Footer from "@/components/OtherAnims/Footer";
import BlogPostIntro from "@/components/PagesIntro/blogPost";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function BlogPostPage() {
    return (
        <>
            <Cursor />
            <Navbar />
            <BlogPostIntro />
            <BlogPostContent />
            <Footer />

        </>
    )
}