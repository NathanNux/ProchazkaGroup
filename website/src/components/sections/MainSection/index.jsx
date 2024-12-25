import About from "./About";
import Benefit from "./Benefit";
import Blog from "./Blog";
import Contact from "./Contact";
import Offer from "./Offer";
import Sales from "./Sales";

export default function MainPageSection() {
    return(
        <section style={{ backgroundColor: '#fff' }}>
            <Benefit />
            <About />
            <Blog />
            <Sales />
            <Offer />
            <Contact />
        </section>
    )
}