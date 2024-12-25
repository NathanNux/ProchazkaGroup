import Graph from "./graph";
import Intro from "./Intro";
import Reviews from "./Reviews";
import BenefitRewards from "./Rewards";


export default function BenefitDetails () {
    return (
        <section>
            <Intro />
            <Reviews />
            <Graph />
            <BenefitRewards />
        </section>
    )
}