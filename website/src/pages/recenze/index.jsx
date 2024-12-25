import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import ReviewsIntro from "@/components/intros/reviews";
import ReviewsList from "@/components/modems/Review";

export default function ReviewsPage () {
    return(
        <>
            <Cursor />
            <Navbar />
            <ReviewsIntro />
            <ReviewsList />
            <Footer />
        </>
    )
}