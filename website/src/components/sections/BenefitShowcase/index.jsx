import Content from "./content";
import DataBar from "./dataBar";
import LogoBar from "./logobar";

export default function BenefitShowcase() {
    return (
        <section className="parrent__wrapper">
            <DataBar />
            <Content />
            <LogoBar />
        </section>
    )
}