import { MainTestimonials } from "@/constants/mainpage";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";


// Animation variants
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

export default function TestimonialsMain () {
    // const [ activeIndex, setActiveIndex ] = useState(0);
    const [activeIndices, setActiveIndices] = useState([0, 1]);
    const [direction, setDirection] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);


    // const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 2);

    const totalTestimonials = MainTestimonials.length;

    // Auto-rotation effect
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const timer = setInterval(() => {
        handleNext(0); // Update first card
        setTimeout(() => {
            handleNext(1); // Update second card with delay
        }, 300);
        }, 10000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, activeIndices]);

    const handleNext = (testimonialPosition) => {
        setDirection(1);
        setActiveIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            // Get next valid index that's not used by the other card
            let nextIndex = (newIndices[testimonialPosition] + 2) % totalTestimonials;
            while (newIndices.includes(nextIndex)) {
            nextIndex = (nextIndex + 1) % totalTestimonials;
            }
            newIndices[testimonialPosition] = nextIndex;
            return newIndices;
        });
    };
    
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
        <section className="TestimonialsMain">
            <div className="TestimonialsMain__Header">
                <div className="TestimonialsMain__Header__container">
                    <h2>
                        ψ
                    </h2>
                    <p>
                        Přečtěte si slova našich<br/> spokojených klientů
                    </p>
                </div>
                <p className="TestimonialsMain__headerText">
                    Realita je jednoduchá – buď budete dále ztrácet peníze, nebo uděláte změnu dnes. Čekání stojí více, než si připouštíte. 
                </p>
            </div>
            <div className="TestimonialsMain__Carousel__container">
                <div className="TestimonialsMain__Carousel__subContainer">
                    {activeIndices.map((testimonialIndex, idx) => {
                        const testimonial = MainTestimonials[testimonialIndex];
                        const { id, name, town, description, number, hashtag } = testimonial;

                        return (
                            <div key={idx} className="TestimonialsMain__Carousel__itemWrapper">
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
                                        className="TestimonialsMain__Carousel__container__item"
                                    >
                                        {/* Testimonial Header */}
                                        <div className="TestimonialsMain__Carousel__container__item__header">
                                            <p>
                                            {number} {hashtag}
                                            </p>
                                            <div className="TestimonialsMain__Carousel__container__item__header__controls">
                                            <button onClick={() => handlePrev(idx)}>
                                                <Image 
                                                    src="/svg/arrow-left.svg" 
                                                    alt="Arrow Left" 
                                                    width={25} 
                                                    height={25} 
                                                    priority={false}
                                                    quality={60}
                                                    loading="lazy"
                                                />
                                            </button>
                                            <p>|</p>
                                            <button onClick={() => handleNext(idx)}>
                                                <Image 
                                                    src="/svg/arrow-right.svg" 
                                                    alt="Arrow Right" 
                                                    width={25} 
                                                    height={25} 
                                                    priority={false}
                                                    quality={60}
                                                    loading="lazy"
                                                />
                                            </button>
                                            </div>
                                        </div>
                                        {/* Testimonial Content */}
                                        <div className="TestimonialsMain__Carousel__container__item__content">
                                            <p>{description}</p>
                                        </div>
                                        {/* Additional Info */}
                                        <div className="TestimonialsMain__Carousel__container__item__addInfo">
                                            <p>
                                            {name} | {town}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>  
            </div>  
        </section>
    )
}