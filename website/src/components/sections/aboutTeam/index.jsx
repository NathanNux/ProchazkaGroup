// index.jsx

import Magnetic from "@/components/anim/Magnetic";
import { icons } from "@/constants/pages/reviews";
import { useScroll, useTransform, motion, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo, useCallback, useLayoutEffect, useEffect } from "react";


export default function AboutTeam() {
    const sectionScroll = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollTimeout = useRef(null);
    const isSnapping = useRef(false);
    const isVisible = useRef(false);
    const [passedLastPoint, setPassedLastPoint] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                (window.navigator && window.navigator.maxTouchPoints > 0) ||
                (window.navigator && window.navigator.msMaxTouchPoints > 0)
            );
        };
        setIsTouchDevice(checkTouch());
    }, []);

    const snapActive = useRef(false);


    const { scrollYProgress } = useScroll({
        target: sectionScroll,
    });

    const points = 8;
    // Calculate peak points with useMemo
    const peakPoints = useMemo(() => (
        Array.from({ length: points }, (_, i) => (i / points) + (1 / (points * 2)))
    ), [points]);

    // WIP: Look at the anim and fix the snapping - it's buggy - copy the code from the rewards component

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

    //NOTE: poeple data are here also, needs to be updated here manually because of the animation
    const people = [
        {
            name: "John Doe",
            number: '01',
            moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.webp",
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
                src: "/svg/tree.webp",
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
            src: "/svg/tree.webp",
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
    // Enhanced snap detection and animation
    // Updated handleScroll
    const handleScroll = useCallback(() => {
        try {
            // Safety checks
            if (!sectionScroll?.current || 
                !isVisible?.current || 
                isSnapping?.current || 
                !snapActive?.current || 
                !peakPoints || 
                peakPoints.length === 0 || 
                typeof window === 'undefined') return;
            
            // Clear existing timeout
            if (scrollTimeout?.current) {
                clearTimeout(scrollTimeout.current);
            }
            
            // Set timeout duration based on device
            const timeoutDuration = isTouchDevice ? 1000 : 50;
            
            scrollTimeout.current = setTimeout(() => {
                const element = sectionScroll.current;
                if (!element) return;
    
                // Calculate scroll progress
                const rect = element.getBoundingClientRect();
                const sectionScrollProgress = -rect.top / (rect.height - window.innerHeight);
                
                // Validate scroll progress
                if (isNaN(sectionScrollProgress) || !isFinite(sectionScrollProgress)) return;
                
                // Check last point
                if (sectionScrollProgress > peakPoints[peakPoints.length - 1]) {
                    setPassedLastPoint(true);
                    return;
                }
    
                // Reset on scroll up
                if (sectionScrollProgress < peakPoints[peakPoints.length - 1]) {
                    setPassedLastPoint(false);
                }
    
                // Continue only if not passed last point
                if (!passedLastPoint) {
                    let closestPeak = peakPoints[0];
                    let closestIndex = 0;
                    let minDistance = Math.abs(sectionScrollProgress - peakPoints[0]);
    
                    // Find closest peak
                    peakPoints.forEach((peak, index) => {
                        const distance = Math.abs(sectionScrollProgress - peak);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestPeak = peak;
                            closestIndex = index;
                        }
                    });
    
                    // Adjust threshold based on device
                    const snapThreshold = isTouchDevice ? 0.1 / points : 0.03 / points;
                    
                    // Animate if beyond threshold
                    if (minDistance > snapThreshold) {
                        isSnapping.current = true;
                        setActiveIndex(closestIndex);
    
                        const targetScroll = window.scrollY + 
                            (closestPeak - sectionScrollProgress) * 
                            (rect.height - window.innerHeight);
    
                        let animation = animate(window.scrollY, targetScroll, {
                            type: "spring",
                            stiffness: isTouchDevice ? 200 : 400,
                            damping: isTouchDevice ? 40 : 30,
                            mass: isTouchDevice ? 1 : 0.5,
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
                            velocity: scrollYProgress.getVelocity() * (isTouchDevice ? 0.3 : 1),
                        });
    
                        // Cleanup animation on component unmount
                        return () => {
                            if (animation) animation.stop();
                        };
                    }
                }
            }, timeoutDuration);
        } catch (error) {
            console.error('Scroll handler error:', error);
            isSnapping.current = false;
            snapActive.current = false;
        }
    }, [
        peakPoints, 
        points, 
        scrollYProgress, 
        isTouchDevice, 
        passedLastPoint,
        setActiveIndex, 
        setPassedLastPoint
    ]);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const element = sectionScroll.current;
        if (!element) return;
        
        let rafId;
        let observerTimeout;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                
                const elementTop = entry.boundingClientRect.top;
                const elementBottom = entry.boundingClientRect.bottom;
                const windowHeight = window.innerHeight;
                
                const topThreshold = windowHeight * 0.1;
                const bottomThreshold = windowHeight * 0.9;
                
                const isWithinThreshold = 
                    elementTop <= topThreshold && 
                    elementBottom >= bottomThreshold;

                isVisible.current = entry.isIntersecting;
                snapActive.current = isWithinThreshold;
            },
            { 
                rootMargin: "-10% 0px -10% 0px",
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            }
        );

        observer.observe(element);

        const handleScrollDebounced = () => {
            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                if (!isSnapping.current) handleScroll();
            });
        };

        window.addEventListener("scroll", handleScrollDebounced, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (observerTimeout) clearTimeout(observerTimeout);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            if (observer) observer.disconnect();
            
            window.removeEventListener("scroll", handleScrollDebounced);
            
            isVisible.current = false;
            snapActive.current = false;
            isSnapping.current = false;
        };
    }, [handleScroll]);

    return (
        <section className="AboutTeam" ref={sectionScroll}>
            <motion.div className="AboutTeam__wrapper">
                {/* Main Info Section */}
                <div className="AboutTeam__MainInfo">
                    <div className="AboutTeam__MainInfo__header">
                        {people.map((person, i) => {
                            return (
                                <motion.div key={i} className="AboutTeam__MainInfo__header__container" style={{ zIndex: i + 1, opacity: person.imageAnim}}>
                                    <h2>{person.name}</h2>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="AboutTeam__MainInfo__text__container">
                        <div className="AboutTeam__MainInfo__text">
                            {people.map((person, i) => {
                                return (
                                    <motion.div key={i} className="AboutTeam__MainInfo__text__container__text" style={{ zIndex: i + 1, opacity: person.imageAnim}}>
                                        <p>{person.number}</p>
                                        <p>{person.moto}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="AboutTeam__MainInfo__icons__container">
                        <div className="AboutTeam__MainInfo__icons">
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
                <div className="AboutTeam__SubInfo">
                    <div className="AboutTeam__SubInfo__intro__container">
                        <div className="AboutTeam__SubInfo__intro">
                            <p>01</p>
                            <p>Jednoduché Moto</p>
                        </div>
                    </div>
                    <div className="AboutTeam__SubInfo__Moto">
                        <h2>
                            CELKOVÉ HESLO PRO KOMPLETNĚ CELÝ TÝM KTERÉHO SE DRŽÍ NEBO
                            VIZE CO CHTEJÍ VYTVOŘIT 
                        </h2>
                    </div>
                </div>

                {/* Collage Section with Snapping Transform */}
                <div className="AboutTeam__Collage">
                    <div className="AboutTeam__Collage__pics">
                        {people.map((person, i) => (
                            <motion.div 
                                key={i} 
                                className="AboutTeam__Collage__pic"
                                style={{ opacity: person.imageAnim }}
                            >
                                <Image 
                                    src={person.src} 
                                    alt={person.alt}
                                    fill={true}
                                    sizes="50vw"
                                    quality={100}
                                    priority={false}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/webp"
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="AboutTeam__Collage__progress">
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