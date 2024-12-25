import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function IntroCollage() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const x = useTransform(scrollYProgress, [0, 1], [3000, -6000]);

    return (
        <div className="IntroCollage" ref={container}>
            <div className="sticky">

                <div className="sticky__Loading__Line">
                    <motion.svg
                        className="sticky__Loading__Line__SVG"
                        viewBox="0 0 100 100"
                    >
                        <defs>
                            <filter id="blur-filter">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                            </filter>
                        </defs>
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="49.75%"
                            fill="none"
                            strokeWidth="0.5%"
                            filter="url(#blur-filter)"
                            style={{
                                pathLength: pathLength,
                            }}
                        />
                    </motion.svg>
                    <motion.svg className="sticky__Loading__Line__SVG">
                        <defs>
                            <filter
                                id="shadow-filter"
                                x="-50%"
                                y="-50%"
                                width="200%"
                                height="200%"
                            >
                                <feDropShadow
                                    dx="0"
                                    dy="0"
                                    stdDeviation="5"
                                    floodColor="#00F0FF"
                                />
                            </filter>
                        </defs>
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="40"
                            fill="none"
                            strokeWidth="0.75"
                            filter="url(#shadow-filter)"
                            style={{
                                pathLength: pathLength,
                            }}
                        />
                    </motion.svg>
                </div>

                {/* Text Wrapper */}
                <div className="text__wrapper">
                    <motion.div
                        className="text__container"
                    >
                        <motion.svg
                            className="polygon-svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{
                                width: "50vw",
                                height: "100vh",
                                position: "absolute",
                                right: 0,
                            }}
                        >
                            {/* use correct path */}
                        </motion.svg>
                        <motion.p className="filled-text"
                            style={{
                                x,
                            }}
                        >
                            JSME TU PRO VÁS | UŽ PŘES JEDNU DEKÁDU
                        </motion.p>
                        <motion.p className="outlined-text"
                            style={{
                                x,
                            }}
                        >
                            JSME TU PRO VÁS | UŽ PŘES JEDNU DEKÁDU
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
