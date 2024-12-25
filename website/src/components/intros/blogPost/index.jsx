import ONViewLogo from "@/components/anim/LogoAnims/onView";
import { BlogData } from "@/constants/pages/blog";
import Image from "next/image";

export default function BlogPostIntro() {
    return (
        <section className="BlogPostIntro">
            <div className="Index">
                <h2>η</h2>
            </div>
            <div className="bakcground_image">
                <Image src='/assets/reviewsBackground.png' alt="background_image" fill={true} />
            </div> 
            <div className="cover" />
            <div className="IntroData">
                <div className="Data">
                    {BlogData.map((object, i) => {
                        const { data, time, src, alt} = object
                        return (
                            <div className="Data__item" key={i}>
                                <h3>{data || time}</h3>
                                <Image src={src} alt={alt} width={50} height={50}/>
                            </div>
                        )
                    })}
                </div>
                <div className="MainText">
                    <h2>10 nepříjemných věcí, které Vám váš bankéř určitě zatajil</h2>
                </div>
            </div>
            <div className="logo__container">
                <ONViewLogo />
            </div>
        </section>
    )
}