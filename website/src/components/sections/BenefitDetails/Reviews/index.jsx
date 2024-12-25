import { Benefitreviews, ReviewsCards } from "@/constants/benefitpage";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Reviews() {
    const [currentBatch, setCurrentBatch] = useState(0);
    const batchSize = 3;
    const totalBatches = Math.ceil(Benefitreviews.length / batchSize);
    const container = useRef(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.8', 'end end']
    });

    const containerHeight = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3, 1],
        ['30vh', '60vh', '100vh', '100vh']
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2],
        [0, 1]
    );

    // Optimize batch transition variants
    const containerVariants = {
        enter: {
            x: "50%",
            opacity: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1
            }
        },
        exit: {
            x: "-50%",
            opacity: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
    };

    // Add review item variants
    const reviewVariants = {
        enter: {
            y: 20,
            opacity: 0
        },
        center: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBatch((prev) => (prev + 1) % totalBatches);
        }, 12000);

        return () => clearInterval(timer);
    }, [totalBatches]);

    const getCurrentBatch = () => {
        const start = currentBatch * batchSize;
        return Benefitreviews.slice(start, start + batchSize);
    };
    return(
        <div className="Reviews" ref={container}>
            <motion.div 
                className="Reviews__wrapper" 
                style={{ height: containerHeight,
                    transform: 'translate(-50%, -50%) translateZ(0)',  // Combined transforms

                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="Cards__wrapper">
                    <div className="header">
                        <h3>PROČ SE PŘIDAT?</h3>
                    </div>
                    <div className="cards__container">
                        {ReviewsCards.map(( card, i) => {
                            const { number, content} = card
                            return(
                                <div className="card" key={i}>
                                    <h3>{number}</h3>
                                    <p>{content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <motion.div 
                    className="reviews__wrapper"
                    style={{ opacity }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="reviews__Head">
                        <h3>
                            01
                        </h3>
                        <p>
                            Mezi námi je už 250 lidí, naše práce mluví za sebe: 
                        </p>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentBatch}
                            className="reviews__container"
                            variants={containerVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            {getCurrentBatch().map((review, index) => (
                                <motion.div 
                                    className="review"
                                    key={`${currentBatch}-${review.number}`}
                                    variants={reviewVariants}
                                    layout // Add layout prop for smooth transitions
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="review__header">
                                        <h3>{review.number}</h3>
                                        <p>{review.hashtag}</p>
                                    </div>
                                    <div className="review__content">
                                        <p>{review.content}</p>
                                    </div>
                                    <div className="review__footer">
                                        <p>| {review.name}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    )
}