import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import Statbar from "@/components/common/statbar";
import MainIntro from "@/components/intros/main";
import MainPageSection from "@/components/sections/MainSection";
import { StatbarData } from "@/constants/mainpage";



export default function Home() {
  return (
    <>
      <Navbar />
      <Cursor />
      <MainIntro />
      <Statbar data={StatbarData}/>
      <MainPageSection />
      <QNA />
      <Footer />
    </>
  )
}