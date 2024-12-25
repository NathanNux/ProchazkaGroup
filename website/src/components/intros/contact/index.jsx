//NOTE:FeedBack and contact are switched

import ContactForm from "@/components/forms/contact";
import { useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const progress = [
    {
        number: '1'
    },
    {
        number: '2'
    },
    {
        number: '3'
    },
    {
        number: '4'
    },
    {
        number: '5'
    },
    {
        number: '6'
    },
    {
        number: '7'
    },
    {
        number: '8'
    },
    
]

const icons = [
    { name: "facebook", src: "/thumbsUp.png" },
    { name: "instagram", src: "/thumbsUp.png" },
    { name: "linkedin", src: "/thumbsUp.png" },
    { name: "twitter", src: "/thumbsUp.png" },
    { name: "youtube", src: "/thumbsUp.png" },
    { name: "mainWeb", src: "/thumbsUp.png" }
];

export default function ContactIntro(){
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [ 'start start', 'end end']
    })
    const points = progress.length
    return (
        <section className="ContactIntro" ref={sectionRef}>
            <div className="background__img">
                <Image src='/assets/reviewsBackground.png' alt='background_image' fill={true}style={{ objectFit: 'cover'}}/>
            </div>
            <div className="cover"/>
            <div className="ContactIntro__wrapper">
                {/* Main Info Section */}
                <div className="ContactIntro__MainInfo">
                    <div className="ContactIntro__MainInfo__header">
                        <div className="ContactIntro__MainInfo__header__container">
                            <h2>Jméno Poradce</h2>
                        </div>
                    </div>
                    <div className="ContactIntro__MainInfo__text__container">
                        <div className="ContactIntro__MainInfo__text">
                            <div className="ContactIntro__MainInfo__text__container__text">
                                <p>01</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                    <div className="ContactIntro__MainInfo__icons__container">
                        <div className="ContactIntro__MainInfo__icons">
                            {icons.map((icon, i) => (
                                <div key={i} className="ContactIntro__MainInfo__icon">
                                    <Image
                                        src={icon.src}
                                        alt={icon.name}
                                        width={30}
                                        height={30}
                                        priority
                                        quality={100}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    
                {/* Sub Info Section */}
                <div className="ContactIntro__SubInfo">
                    <div className="ContactIntro__SubInfo__intro__container">
                        <div className="ContactIntro__SubInfo__intro">
                            <p>01</p>
                            <p>Jednoduché Moto</p>
                        </div>
                    </div>
                    <div className="ContactIntro__SubInfo__Moto">
                        <h2>
                            CELKOVÉ HESLO PRO KOMPLETNĚ CELÝ TÝM KTERÉHO SE DRŽÍ NEBO
                            VIZE CO CHTEJÍ VYTVOŘIT 
                        </h2>
                    </div>
                </div>
    
                {/* Collage Section with Snapping Transform */}
                <div className="ContactIntro__Collage"> 
                    <div className="ContactIntro__Collage__pics">
                        <div className="ContactIntro__Collage__pic">
                            <Image src="/svg/tree.png" alt="profile_pic1" fill={true}/>
                        </div>
                    </div>
                    <div className="ContactIntro__Collage__progress">
                        <div>
                            {Array.from({ length: points }).map((_, i) => (
                                <div key={`circle-${i}`} className="progress__circle">
                                    <div></div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {Array.from({ length: points }).map((_, i) => (
                                <div key={`segment-outline-${i}`} className="progress__segment">
                                    <div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ContactForm scroll={scrollYProgress}/>
        </section>
    )
}
