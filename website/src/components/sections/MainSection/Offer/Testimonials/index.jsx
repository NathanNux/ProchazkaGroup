
import SubText from "@/components/anim/TextAnims/SubText";
import RoundButton from "@/components/ui/stickyButtons/buttons/RoundButton";
import CustomImage from "@/components/ui/stickyImage";
import { testimonials } from "@/constants/mainpage";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFetchDatabase } from "@/hooks/useFetchDatabase";

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
    const [reviews, setReviews] = useState(testimonials)
    const [loading, setLoading] = useState(false)
    const sectionRef = useRef()

    const { fetchReviews } = useFetchDatabase();

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true)
                const data = await fetchReviews()
                if (data && data.length > 0) {
                    // Kontrola validity dat
                    const validData = data.filter(item => 
                        item && 
                        typeof item === 'object' && 
                        'id' in item &&
                        'customer_name' in item
                    )
                    setReviews(validData)
                }
                // console.log('Reviews:', data)
            } catch (error) {
                console.error('Error loading reviews:', error)
                setReviews(testimonials) // Fallback na statická data
            } finally {
                setLoading(false)
            }
        }
        loadReviews()
    }, [])

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const x = useTransform(
        scrollYProgress,
        [0, 0.5, 1], 
        [400, -100, -200]
    )

    const totalTestimonials = reviews.length;

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
                <motion.div className="button" style={{ x }}>
                    <RoundButton href='/recenze' text='Všechny Ohlasy'/>
                </motion.div>
            </div>
            <div className="image__container">
                <CustomImage src='/assets/reviewsBackground.webp' altText='about-image'/>
            </div> 
            <div className="Testimonials__Carousel__container">
                <div className="Testimonials__Carousel__subContainer">
                    {activeIndices.map((testimonialIndex, idx) => {
                                                
                        const adjustedIndex = testimonialIndex % reviews.length;
                        const testimonial = reviews[adjustedIndex];

                        if (!testimonial || typeof testimonial !== 'object') {
                            const fallbackIndex = idx % reviews.length;
                            return reviews[fallbackIndex];
                        }

                        const {
                            id = `fallback-${idx}`,
                            customer_name = '',
                            town = '', 
                            message = '',
                            number = adjustedIndex,
                            hashtag = ''
                        } = testimonial;

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
                                            {number < 9 ? "0"+number : number} {"#"+hashtag}
                                            </p>
                                            <div className="Testimonials__Carousel__container__item__header__controls">
                                            <button onClick={() => handlePrev(idx)}>
                                                <Image 
                                                    src="/svg/arrow-left.svg" 
                                                    alt="Arrow Left" 
                                                    width={20} 
                                                    height={20}
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
                                                    width={20} 
                                                    height={20} 
                                                    priority={false}
                                                    quality={60}
                                                    loading="lazy"
                                                />
                                            </button>
                                            </div>
                                        </div>
                                        {/* Testimonial Content */}
                                        <div className="Testimonials__Carousel__container__item__content">
                                            <p>{message}</p>
                                        </div>
                                        {/* Additional Info */}
                                        <div className="Testimonials__Carousel__container__item__addInfo">
                                            <p>
                                            {customer_name} | {"Strakonice"}
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