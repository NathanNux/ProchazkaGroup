import Collage from "./collage";
import IntroCollage from "./intro";

export default function EventCollage() {
    return (
        <section className="EventCollage">
            <IntroCollage />
            <Collage />
        </section>
    )
}