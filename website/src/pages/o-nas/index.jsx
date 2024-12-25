import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import AboutInto from "@/components/intros/about";
import AboutTeam from "@/components/sections/aboutTeam";
import EventCollage from "@/components/sections/eventCollage";
import ParallaxExpanf from "@/components/sections/parallaxExpand";



export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Cursor />
      <AboutInto />
      <ParallaxExpanf />
      <EventCollage />
      <AboutTeam />
      <QNA />
      <Footer />
    </>
    
  )
}