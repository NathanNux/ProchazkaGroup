// index.jsx
import { useScroll, useTransform, motion, animate } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";


export default function BenefitRewards() {
    const sectionScroll = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollTimeout = useRef(null);
    const isSnapping = useRef(false);
    const isVisible = useRef(false);
    const [passedLastPoint, setPassedLastPoint] = useState(false);

    const snapActive = useRef(false);

    const { scrollYProgress } = useScroll({
        target: sectionScroll,
    });

    const points = 8;
    // Calculate peak points with useMemo
    const peakPoints = useMemo(() => (
        Array.from({ length: points }, (_, i) => (i / points) + (1 / (points * 2)))
    ), [points]);

    //Image anims
    const imageOpacity0 = useTransform(scrollYProgress, [0, peakPoints[0], peakPoints[0] + 0.05], [1, 1, 0], { clamp: true });
    const imageOpacity1 = useTransform(scrollYProgress, [peakPoints[1] - 0.075, peakPoints[1], peakPoints[1] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity2 = useTransform(scrollYProgress, [peakPoints[2] - 0.075, peakPoints[2], peakPoints[2] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity3 = useTransform(scrollYProgress, [peakPoints[3] - 0.075, peakPoints[3], peakPoints[3] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity4 = useTransform(scrollYProgress, [peakPoints[4] - 0.075, peakPoints[4], peakPoints[4] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity5 = useTransform(scrollYProgress, [peakPoints[5] - 0.075, peakPoints[5], peakPoints[5] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity6 = useTransform(scrollYProgress, [peakPoints[6] - 0.075, peakPoints[6], peakPoints[6] + 0.075], [0, 1, 0], { clamp: true });
    const imageOpacity7 = useTransform(scrollYProgress, [peakPoints[7] - 0.075, peakPoints[7], peakPoints[7] + 0.075], [0, 1, 0], { clamp: true });

    //Circle anims
    const circleProgress0 = useTransform(scrollYProgress, [0, peakPoints[0]], [1, 1], { clamp: true });
    const circleProgress1 = useTransform(scrollYProgress, [peakPoints[1] - 0.05, peakPoints[1]], [0, 1], { clamp: true });
    const circleProgress2 = useTransform(scrollYProgress, [peakPoints[2] - 0.05, peakPoints[2]], [0, 1], { clamp: true });
    const circleProgress3 = useTransform(scrollYProgress, [peakPoints[3] - 0.05, peakPoints[3]], [0, 1], { clamp: true });
    const circleProgress4 = useTransform(scrollYProgress, [peakPoints[4] - 0.05, peakPoints[4]], [0, 1], { clamp: true });
    const circleProgress5 = useTransform(scrollYProgress, [peakPoints[5] - 0.05, peakPoints[5]], [0, 1], { clamp: true });
    const circleProgress6 = useTransform(scrollYProgress, [peakPoints[6] - 0.05, peakPoints[6]], [0, 1], { clamp: true });
    const circleProgress7 = useTransform(scrollYProgress, [peakPoints[7] - 0.05, peakPoints[7]], [0, 1], { clamp: true });

    
    //Segents anims
    const segmentProgress0 = useTransform(scrollYProgress, [peakPoints[0], peakPoints[1]], ['100%', '0%'], { clamp: true });
    const segmentProgress1 = useTransform(scrollYProgress, [peakPoints[1], peakPoints[2]], ['100%', '0%'], { clamp: true });
    const segmentProgress2 = useTransform(scrollYProgress, [peakPoints[2], peakPoints[3]], ['100%', '0%'], { clamp: true });
    const segmentProgress3 = useTransform(scrollYProgress, [peakPoints[3], peakPoints[4]], ['100%', '0%'], { clamp: true });
    const segmentProgress4 = useTransform(scrollYProgress, [peakPoints[4], peakPoints[5]], ['100%', '0%'], { clamp: true });
    const segmentProgress5 = useTransform(scrollYProgress, [peakPoints[5], peakPoints[6]], ['100%', '0%'], { clamp: true });
    const segmentProgress6 = useTransform(scrollYProgress, [peakPoints[6], peakPoints[7]], ['100%', '0%'], { clamp: true });
    const segmentProgress7 = useTransform(scrollYProgress, [peakPoints[7], 1], ['100%', '0%'], { clamp: true });

    const people = [
        {
            name: "John Doe",
            number: '01',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.png",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity0,
            circleAnim: circleProgress0,
            segmentAnim: segmentProgress0
        },
        {
            name: "Jane Doe",
            number: '02',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/cactus.webp",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity1,
            circleAnim: circleProgress1,
            segmentAnim: segmentProgress1
        },
        {
            name: "Jane Doe",
            number: '03',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/house.webp",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity2,
            circleAnim: circleProgress2,
            segmentAnim: segmentProgress2
        },
        {
            name: "Jane Doe",
            number: '04',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                src: "/svg/tree.png",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity3,
            circleAnim: circleProgress3,
            segmentAnim: segmentProgress3
        },
        {
            name: "Jane Doe",
            number: '05',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/rock.webp",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity4,
            circleAnim: circleProgress4,
            segmentAnim: segmentProgress4
        },
        {
            name: "Jane Doe",
            number: '06',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.webp",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity5,
            circleAnim: circleProgress5,
            segmentAnim: segmentProgress5
        },
        {
            name: "Jane Doe",
            number: '07',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/water.webp",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity6,
            circleAnim: circleProgress6,
            segmentAnim: segmentProgress6
        },
        {
            name: "Jane Doe",
            number: '08',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.png",
            alt: "profile_pic1",
            photo1: '/assets/reviewsBackground.png',
            altText1: 'asset1',
            photo2: '/assets/reviewsBackground.png',
            altText2: 'asset2',
            imageAnim: imageOpacity7,
            circleAnim: circleProgress7,
            segmentAnim: segmentProgress7
        },
    ]

    // Scroll handling with useCallback
    // Modify handleScroll callback
    const handleScroll = useCallback(() => {
        if (!sectionScroll?.current || !isVisible.current || isSnapping.current || !snapActive.current || !peakPoints) return;
        
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            const element = sectionScroll.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const sectionScrollProgress = -rect.top / (rect.height - window.innerHeight);
            
            // Check if we've passed the last point
            if (sectionScrollProgress > peakPoints[peakPoints.length - 1]) {
                setPassedLastPoint(true);
                return; // Exit early - no more snapping
            }

            // Reset passed last point state if we're before last point
            if (sectionScrollProgress < peakPoints[peakPoints.length - 1]) {
                setPassedLastPoint(false);
            }

            // Only continue with snapping if we haven't passed last point
            if (!passedLastPoint) {
                // ...existing closest peak finding logic...
                let closestPeak = peakPoints[0];
                let closestIndex = 0;
                let minDistance = Math.abs(sectionScrollProgress - peakPoints[0]);

                peakPoints.forEach((peak, index) => {
                    const distance = Math.abs(sectionScrollProgress - peak);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestPeak = peak;
                        closestIndex = index;
                    }
                });

                const snapThreshold = 0.05 / points;
                if (minDistance > snapThreshold) {
                    isSnapping.current = true;
                    setActiveIndex(closestIndex);

                    const targetScroll = window.scrollY + (closestPeak - sectionScrollProgress) * (rect.height - window.innerHeight);

                    animate(window.scrollY, targetScroll, {
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                        mass: 0.5,
                        bounce: 0,
                        onComplete: () => {
                            isSnapping.current = false;
                        },
                        onUpdate: (value) => {
                            window.scrollTo({
                                top: value,
                                behavior: 'auto'
                            });
                        },
                        velocity: scrollYProgress.getVelocity(),
                    });
                }
            }
        }, 50);
    }, [peakPoints, points, scrollYProgress, passedLastPoint]);

    // Intersection observer effect
    // Update useEffect to set isVisible.current
    useLayoutEffect(() => {
        const element = sectionScroll.current;
        if (!element) return;
    
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                
                // Get element position relative to viewport
                const elementTop = entry.boundingClientRect.top;
                const elementBottom = entry.boundingClientRect.bottom;
                const windowHeight = window.innerHeight;
                
                // Set thresholds at 10% from top and bottom
                const topThreshold = windowHeight * 0.1;
                const bottomThreshold = windowHeight * 0.9;
                
                // Check if element is within threshold zone
                const isWithinThreshold = 
                    elementTop <= topThreshold && 
                    elementBottom >= bottomThreshold;
    
                // Update refs
                isVisible.current = entry.isIntersecting;
                snapActive.current = isWithinThreshold;
            },
            { 
                rootMargin: "-10% 0px -10% 0px",
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            }
        );
    
        observer.observe(element);
    
        // Optimize scroll handler
        let scrollTimeout;
        const handleScrollDebounced = () => {
            if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
            
            scrollTimeout = window.requestAnimationFrame(() => {
                handleScroll();
            });
        };
    
        window.addEventListener("scroll", handleScrollDebounced, { passive: true });
    
        return () => {
            observer.unobserve(element);
            window.removeEventListener("scroll", handleScrollDebounced);
            window.cancelAnimationFrame(scrollTimeout);
            clearTimeout(scrollTimeout.current);
        };
    }, [handleScroll]);

    return (
        <section className="BenefitRewards" ref={sectionScroll}>
            <motion.div className="BenefitRewards__wrapper">
                {/* Main Info Section */}
                <div className="BenefitRewards__MainInfo">
                    <div className="BenefitRewards__MainInfo__icons__container">
                       <p>A S KAŽDÝM KROKEM NOVÁ ÚROVEŇ. 
                       PROČ? - TVRDÍ DŘÍČI </p>
                    </div>   
                    <div className="BenefitRewards__MainInfo__header">
                        {people.map((person, i) => {
                            return (
                                <motion.div 
                                    key={i} 
                                    className="BenefitRewards__MainInfo__header__container" 
                                    style={{ 
                                        zIndex: i - 1, 
                                        opacity: person.imageAnim
                                    }}
                                >
                                    <Image src={person.photo1} alt={person.altText1} fill={true}/>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Sub Info Section */}
                <div className="BenefitRewards__SubInfo">
                    <div className="BenefitRewards__SubInfo__intro__container">
                        {people.map((person, i) => {
                            return (
                                <motion.div 
                                    key={i} 
                                    className="BenefitRewards__SubInfo__intro" 
                                    style={{ 
                                        zIndex: i - 1, 
                                        opacity: person.imageAnim
                                    }}
                                >
                                    <Image src={person.photo2} alt={person.altText2} fill={true}/>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="BenefitRewards__SubInfo__Moto">
                        <h2>
                            MÁTE CHUŤ
                            BÝT AKTIVNÍMI? TO,
                            JAK RYCHLE SE NA KONEC DOSTANETE, JE ČISTĚ NA VÁS.
                        </h2>
                    </div>
                </div>

                {/* Collage Section with Snapping Transform */}
                <div className="BenefitRewards__Collage">
                    <div className="BenefitRewards__Collage__pics">
                        {people.map((person, i) => (
                            <motion.div 
                                key={i} 
                                className="BenefitRewards__Collage__pic"
                                style={{ 
                                    opacity: person.imageAnim
                                }}
                            >
                                <Image src={person.src} alt={person.alt} fill={true}/>
                            </motion.div>
                        ))}
                    </div>
                    <div className="BenefitRewards__Collage__progress">
                        <div>
                            {people.map((person, i) => (
                                <div key={`circle-${i}`} className="progress__circle">
                                <motion.div style={{ scale: person.circleAnim }}></motion.div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {people.map((person, i) => (
                                <div key={`segment-outline-${i}`} className="progress__segment">
                                <motion.div style={{ x: person.segmentAnim }}></motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}