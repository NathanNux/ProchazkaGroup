import BlogPostContent from "@/components/common/blog";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import BlogPostIntro from "@/components/intros/blogPost";


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