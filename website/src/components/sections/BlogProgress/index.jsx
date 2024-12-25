import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";


export default function BlogProgress() {
    const sectionRef = useRef(null);
    const paragraphRefs = useRef([]);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });
    const points = 5

    const handleCircleClick = (index) => {
        const targetElement = paragraphRefs.current[index];
        if (targetElement) {
            if (window.lenis) {
                window.lenis.scrollTo(targetElement, {
                    offset: 0,
                    immediate: false,
                    duration: 0.3,
                    easing: (t) => t,
                });
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Calculate peak points with useMemo
    const peakPoints = useMemo(() => (
        Array.from({ length: points }, (_, i) => (i / points) + (1 / (points * 2)))
    ), [points]);

    //Circle anims
    const circleProgress0 = useTransform(scrollYProgress, [0, peakPoints[0]], [1, 1], { clamp: true });
    const circleProgress1 = useTransform(scrollYProgress, [peakPoints[1] - 0.05, peakPoints[1]], [0, 1], { clamp: true });
    const circleProgress2 = useTransform(scrollYProgress, [peakPoints[2] - 0.05, peakPoints[2]], [0, 1], { clamp: true });
    const circleProgress3 = useTransform(scrollYProgress, [peakPoints[3] - 0.05, peakPoints[3]], [0, 1], { clamp: true });
    const circleProgress4 = useTransform(scrollYProgress, [peakPoints[4] - 0.05, peakPoints[4]], [0, 1], { clamp: true });

    
    //Segents anims
    const segmentProgress0 = useTransform(scrollYProgress, [peakPoints[0], peakPoints[1]], ['100%', '0%'], { clamp: true });
    const segmentProgress1 = useTransform(scrollYProgress, [peakPoints[1], peakPoints[2]], ['100%', '0%'], { clamp: true });
    const segmentProgress2 = useTransform(scrollYProgress, [peakPoints[2], peakPoints[3]], ['100%', '0%'], { clamp: true });
    const segmentProgress3 = useTransform(scrollYProgress, [peakPoints[3], peakPoints[4]], ['100%', '0%'], { clamp: true });
    const segmentProgress4 = useTransform(scrollYProgress, [peakPoints[4], 1], ['100%', '0%'], { clamp: true });

    const paragraphs = [
        {
            title: 'Blog Progress1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: '/blogprogress',
            circleAnim: circleProgress0,
            segmentAnim: segmentProgress0
        },
        {
            title: 'Blog Progress2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: '/blogprogress',
            circleAnim: circleProgress1,
            segmentAnim: segmentProgress1
        },{
            title: 'Blog Progress3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: '/blogprogress',
            circleAnim: circleProgress2,
            segmentAnim: segmentProgress2
        },{
            title: 'Blog Progress4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: '/blogprogress',
            circleAnim: circleProgress3,
            segmentAnim: segmentProgress3
        },{
            title: 'Blog Progress5',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: '/blogprogress',
            circleAnim: circleProgress4,
            segmentAnim: segmentProgress4
        }
    ]
    return (
        <section className="Blog__MainPage" ref={sectionRef}>
            <div className="Blog__MainPage__Container">
                {paragraphs.map((paragraph, index) => {
                    return (
                        <div 
                            key={index} 
                            className="Blog__MainPage__Paragraph" 
                            id={paragraph.link}
                            ref={(el) => (paragraphRefs.current[index] = el)}
                        >
                            <h2>{paragraph.title}</h2>
                            <p>{paragraph.content}</p>

                        </div>
                    )
                })}
            </div>
            <div className="Blog__MainPage__progressBar">
                <div className="Blog__MainPage__progressBar_div">
                    {paragraphs.map((paragraph, index) => {
                        const isLastItem = index === paragraphs.length - 1;
                        return (
                            <div className="Blog__MainPage__progressBar__Container" key={index}>
                                <div className="circle" onClick={() => handleCircleClick(index)}>
                                    <motion.div className="circle__inner" style={{ scale: circleAnim}}></motion.div>
                                </div>
                                { !isLastItem && <div className="segment">
                                    <motion.div className="segment__inner" style={{ y: segmentAnim}}></motion.div>
                                </div> }
                            </div> 
                        )
                    })}
                </div>
                
            </div>
        </section>
    )
}