import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
    {
        id: 1,
        number: '01',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 2,
        number: '02',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 3,
        number: '03',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 4,
        number: '04',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 5,
        number: '05',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 6,
        number: '06',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 7,
        number: '07',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 8,
        number: '08',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 9,
        number: '09',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    },
    {
        id: 10,
        number: '10',
        hashtag: '#hashtag',
        name: 'John Doe',
        town: 'Strakonice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
    }
]

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

    const totalTestimonials = testimonials.length;

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
                        const testimonial = testimonials[testimonialIndex];
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
                                                <Image src="/svg/arrow-left.svg" alt="Arrow Left" width={15} height={15} />
                                            </button>
                                            <p>|</p>
                                            <button onClick={() => handleNext(idx)}>
                                                <Image src="/svg/arrow-right.svg" alt="Arrow Right" width={15} height={15} />
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