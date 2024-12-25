import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const reviews = [
    {
        number: '01',
        hashtag: 'benefitprogram',
        content: 'Díky benefitnímu programu jsem získal skvělé finanční ohodnocení za minimální úsilí. Doporučuji všem!',
        name: 'Jan Novák'
    },
    {
        number: '02',
        hashtag: 'spolupráce',
        content: 'Profesionální přístup a transparentní podmínky. Za půl roku jsem díky doporučením vydělal víc než jsem čekal.',
        name: 'Petr Svoboda'
    },
    {
        number: '03',
        hashtag: 'doporučení',
        content: 'Jednoduché, přímočaré a férové. Stačilo doporučit známým a odměny chodí pravidelně.',
        name: 'Marie Dvořáková'
    },
    {
        number: '04',
        hashtag: 'benefitprogram',
        content: 'Program překonal má očekávání. Nejen že vydělávám, ale pomáhám i ostatním k lepší finanční budoucnosti.',
        name: 'Pavel Kučera'
    },
    {
        number: '05',
        hashtag: 'spokojenost',
        content: 'Nejlepší rozhodnutí roku bylo zapojit se do programu. Pasivní příjem, který skutečně funguje.',
        name: 'Eva Procházková'
    },
    {
        number: '06',
        hashtag: 'výdělek',
        content: 'Za každé doporučení férová odměna. Žádné skryté podmínky, vše funguje přesně jak bylo slíbeno.',
        name: 'Tomáš Horák'
    },
    {
        number: '07',
        hashtag: 'spolehlivost',
        content: 'Oceňuji především rychlost vyplácení odměn a profesionální podporu při jakýchkoliv dotazech.',
        name: 'Jana Němcová'
    },
    {
        number: '08',
        hashtag: 'doporučení',
        content: 'Program mi umožnil vybudovat si zajímavý vedlejší příjem. Stačí jen sdílet dobrou zkušenost.',
        name: 'Martin Veselý'
    },
    {
        number: '09',
        hashtag: 'benefitprogram',
        content: 'Konečně něco, co skutečně funguje. Transparentní systém odměn za reálné výsledky.',
        name: 'Lucie Marková'
    },
    {
        number: '10',
        hashtag: 'spokojenost',
        content: 'Perfektní způsob, jak si přivydělat. Doporučuji každému, kdo hledá férovou příležitost.',
        name: 'David Král'
    },
    {
        number: '11',
        hashtag: 'výdělek',
        content: 'Za rok v programu jsem získal více, než jsem původně očekával. Skvělá příležitost pro každého.',
        name: 'Tereza Pokorná'
    },
    {
        number: '12',
        hashtag: 'spolupráce',
        content: 'Profesionální přístup, férové jednání a pravidelný příjem. Co víc si přát?',
        name: 'Jakub Marek'
    }
];

const cards = [
    {
        number: '1/C',
        content: 'Buďte ten důvod, který stojí za finační svobodou ostatních'
    },
    {
        number: '2/F',
        content: 'Zatímco budujete s námi, dostaňte odměny rovnou na ruku'
    },
    {
        number: '3/E',
        content: 'Buďte součástí Vize, která opravdu mění přítomnost'
    }
]

export default function Reviews() {
    const [currentBatch, setCurrentBatch] = useState(0);
    const batchSize = 3;
    const totalBatches = Math.ceil(reviews.length / batchSize);
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
        return reviews.slice(start, start + batchSize);
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
                        {cards.map(( card, i) => {
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