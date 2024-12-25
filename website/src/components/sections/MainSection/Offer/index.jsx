import BecomeAclient from "./BecomeClient";
import Benefits from "./Benefits";
import IntroOffer from "./Intro";
import OurDeal from "./OurDeal";
import Reality from "./Reality";
import Requirements from "./Requirements";
import Testimonials from "./Testimonials";
import TheWay from "./TheWay";

export default function Offer() {
    return(
        <section>
            <IntroOffer />
            <Reality />
            <BecomeAclient />
            <Benefits />
            <TheWay />
            <Requirements />
            <Testimonials />
            <OurDeal />
        </section>
    )
}