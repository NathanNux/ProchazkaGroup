import React from "react"
import { motion } from "framer-motion"

const draw = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i) => {
        const delay = i * 0.15;
        return {
            pathLength: 1.1,
            opacity: 1,
            transition: {
                ease: [ 0.76, 0, 0.24, 1 ],
                pathLength: {delay, duration: 1.5, type: 'spring', bounce: 0},
                opacity: {delay, duration: i * 0.5},
            }
        }
    },
}

export default function SVGFillCircles () {
    const rotation = [0, 120, 240];
    return (
        <div className="svg__fillc__main">
            <div className="svg__fillc__Tcontainer">
                <p>Some random text to fill the space</p>
            </div>
            <div className="svg__fillc__Ccontainer">
                <div className="svg__fillc__Ccontainer">
                    <motion.svg 
                        viewBox="0 0 100 100" 
                        initial='initial' 
                        whileInView='animate'
                        style={{
                            transform: `rotate(${rotation[0]}deg)`,
                            transformOrigin: "50% 50%", // Ensure rotation around center
                        }}
                    >
                        <motion.path
                            variants={draw} 
                            custom={1}
                            d="
                                M50,50
                                m-45,0
                                a45,45 0 1,0 90,0
                                a45,45 0 1,0 -90,0
                            "
                            fill="none"
                        />
                    </motion.svg>
                    <motion.svg 
                        viewBox="0 0 100 100"
                        initial='initial' 
                        whileInView='animate'
                        style={{
                            transform: `rotate(${rotation[1]}deg)`,
                            transformOrigin: "50% 50%", // Ensure rotation around center
                        }}
                    >
                        <motion.path
                            variants={draw} 
                            custom={2}
                            d="
                                M50,50
                                m-45,0
                                a45,45 0 1,0 90,0
                                a45,45 0 1,0 -90,0
                            "
                            fill="none"
                        />
                    </motion.svg>
                    <motion.svg 
                        viewBox="0 0 100 100"
                        initial='initial' 
                        whileInView='animate'
                        style={{
                            transform: `rotate(${rotation[2]}deg)`,
                            transformOrigin: "50% 50%", // Ensure rotation around center
                        }}
                    >
                        <motion.path
                            variants={draw}
                            custom={3}
                            d="
                                M50,50
                                m-45,0
                                a45,45 0 1,0 90,0
                                a45,45 0 1,0 -90,0
                            "
                            fill="none"
                        />
                    </motion.svg>
                </div>
            </div>
        </div>
    )
}