import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import FeedbackIntro from "@/components/intros/feedBack";


export default function ContactPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <FeedbackIntro />
      <QNA />
      <Footer />
    </>
  )
}