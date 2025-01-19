//NOTE:FeedBack and contact are switched

import Magnetic from "@/components/anim/Magnetic";
import SubText from "@/components/anim/TextAnims/SubText";
import ContactForm from "@/components/forms/contact";
import { people, TestPeople } from "@/constants/people";
import { useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ContactIntro({name, number, moto, databaseName, icons}) {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [ 'start start', 'end end']
    })
    const points = TestPeople.length
    return (
        <section className="ContactIntro" ref={sectionRef}>
            <div className="headerPage">
                <h2>η</h2>
            </div>
            <div className="background__img">
                <Image 
                    src='/assets/reviewsBackground.webp' 
                    alt='background_image' 
                    fill={true}
                    style={{ objectFit: 'cover'}}
                    sizes="100vw"
                    quality={100}
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/webp"
                />
            </div>
            <div className="cover"/>
            <div className="ContactIntro__wrapper">
                {/* Main Info Section */}
                <div className="ContactIntro__MainInfo">
                    <div className="ContactIntro__MainInfo__header">
                        <div className="ContactIntro__MainInfo__header__container">
                            <h2>{name}</h2>
                        </div>
                    </div>
                    <div className="ContactIntro__MainInfo__text__container">
                        <div className="ContactIntro__MainInfo__text">
                            <div className="ContactIntro__MainInfo__text__container__text">
                                <p>{number}</p>
                                <p>{moto}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ContactIntro__MainInfo__icons__container">
                        <div className="ContactIntro__MainInfo__icons">
                            {icons.map((icon, i) => {
                                const IconComponent = icon.src;
                                return (
                                    <Magnetic key={`magnetic-${icon.name}`} sensitivity={0.1}>
                                        <Link href={icon.href}>
                                            <IconComponent 
                                                size={40}
                                                aria-label={icon.name}
                                                className="social__icon"
                                            />
                                        </Link>
                                    </Magnetic>
                                );
                            })}
                        </div>
                    </div>
                </div>
    
                {/* Sub Info Section */}
                <div className="ContactIntro__SubInfo">
                    <div className="ContactIntro__SubInfo__intro__container">
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
                        <Image 
                            src="/svg/tree.webp" 
                            alt="profile_pic1" 
                            fill={true}
                            quality={100}
                            priority={true}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            placeholder="blur"
                            blurDataURL="data:image/webp"
                            className="object-cover w-full h-full"
                        />
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
            <ContactForm scroll={scrollYProgress} name={databaseName}/>
        </section>
    )
}
