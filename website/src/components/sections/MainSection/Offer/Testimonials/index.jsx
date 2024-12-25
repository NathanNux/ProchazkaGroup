
import SubText from "@/components/anim/TextAnims/SubText";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";
import { testimonials } from "@/constants/mainpage";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '10%' : '-10%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '10%' : '-10%',
      opacity: 0
    })
};

export default function Testimonials () {
    const [activeIndices, setActiveIndices] = useState([0, 1]);
    const [direction, setDirection] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const totalTestimonials = testimonials.length;

        const handleNext = (testimonialPosition) => {
        setDirection(1);
        setActiveIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            let nextIndex = (newIndices[testimonialPosition] + 2) % totalTestimonials;
            while (newIndices.includes(nextIndex)) {
                nextIndex = (nextIndex + 1) % totalTestimonials;
            }
            newIndices[testimonialPosition] = nextIndex;
            return newIndices;
        });
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const timer = setInterval(() => {
            handleNext(0);
            setTimeout(() => {
                handleNext(1);
            }, 300);
        }, 10000);

        return () => clearInterval(timer);
    }, [isAutoPlaying]);  
    
    const handlePrev = (testimonialPosition) => {
        setDirection(-1);
        setActiveIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            let prevIndex = (newIndices[testimonialPosition] - 2 + totalTestimonials) % totalTestimonials;
            while (newIndices.includes(prevIndex)) {
            prevIndex = (prevIndex - 1 + totalTestimonials) % totalTestimonials;
            }
            newIndices[testimonialPosition] = prevIndex;
            return newIndices;
        });
    };
    return (
        <section className="Testimonials">
            <div className="Testimonials__Header">
                <div className="Testimonials__Header__container">
                    <h2>
                        ψ
                    </h2>
                    <p>
                        Přečtěte si slova našich<br/> spokojených klientů
                    </p>
                </div>
                <SubText className={'Testimonials__headerText'} text={'Realita je jednoduchá – buď budete dále ztrácet peníze, nebo uděláte změnu dnes. Čekání stojí více, než si připouštíte.'}/>
            </div>
            <div className="button__container">
                <div className="button">
                    <RoundButton href='#' text='Všechny Ohlasy'/>
                </div>
            </div>
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.png' altText='about-image'/>
            </div> 
            <div className="Testimonials__Carousel__container">
                <div className="Testimonials__Carousel__subContainer">
                    {activeIndices.map((testimonialIndex, idx) => {
                        const testimonial = testimonials[testimonialIndex];
                        const { id, name, town, description, number, hashtag } = testimonial;

                        return (
                            <div key={idx} className="Testimonials__Carousel__itemWrapper">
                                <AnimatePresence initial={false} mode="wait" custom={direction}>
                                    <motion.div 
                                        key={id} 
                                        custom={direction}
                                        variants={cardVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            duration: 0.5,
                                            delay: idx * 0.1
                                        }}
                                        className="Testimonials__Carousel__container__item"
                                    >
                                        {/* Testimonial Header */}
                                        <div className="Testimonials__Carousel__container__item__header">
                                            <p>
                                            {number} {hashtag}
                                            </p>
                                            <div className="Testimonials__Carousel__container__item__header__controls">
                                            <button onClick={() => handlePrev(idx)}>
                                                <Image src="/svg/arrow-left.svg" alt="Arrow Left" width={15} height={15} />
                                            </button>
                                            <p>|</p>
                                            <button onClick={() => handleNext(idx)}>
                                                <Image src="/svg/arrow-right.svg" alt="Arrow Right" width={15} height={15} />
                                            </button>
                                            </div>
                                        </div>
                                        {/* Testimonial Content */}
                                        <div className="Testimonials__Carousel__container__item__content">
                                            <p>{description}</p>
                                        </div>
                                        {/* Additional Info */}
                                        <div className="Testimonials__Carousel__container__item__addInfo">
                                            <p>
                                            {name} | {town}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                <div className={`devider ${idx === 1 ? 'second-devider' : ''}`}/>
                            </div>
                        );
                    })}
                </div>  
            </div>  
        </section>
    )
}