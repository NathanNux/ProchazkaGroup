import React, { useState } from 'react'
import { motion } from 'framer-motion'
export default function HoverLogo2() {
    const [hovered, setHovered] = useState(false);

    const textIntro = {
        initial: {
            opacity: 0.5,
        },
        enter: (i) =>{
            return {
                times: [0, 1],
                opacity: [0.5, 1],
                transition: {
                    delay: 0.75 + (i * 0.3),
                    duration: 0.5,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        },
        exit: (i) => {
            return {
                opacity: 0.5,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        }  
    }
    
    const textIntroPath = {
        initial: {
            opacity: 0.5,
            pathLength: 1,
        },
        enter: (i) =>{
            return {
                times: [0, 1],
                opacity: [0.5, 1],
                pathLength: [1, 1],
                transition: {
                    delay: 0.25 + (i * 0.3),
                    duration: 0.5,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        },
        exit: (i) => {
            return {
                opacity: 0.5,
                pathLength: 1,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        }  
    }
    
    const IntroLogo = {
        initial: {
            opacity: 0.5,
            pathLength: 1,
        },
        enter: (i) => {
            return {
                times: [0, 1],
                opacity: [0.5, 1],
                pathLength: [1, 1],
                transition: {
                    delay: i * 0.2,
                    duration: 0.5,
                    type: 'spring', 
                    bounce: 0,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        },
        exit: (i) => {
            return {
                opacity: 0.5,
                pathLength: 1,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                    type: 'spring', 
                    bounce: 0,
                    ease: [ 0.76, 0, 0.24, 1 ],
                }
            }
        }
    }

    return (
        <div className="HoverLogo"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="HoverLogo__Logo__Container">
                <motion.svg 
                    width="73" 
                    height="78" 
                    viewBox="0 0 78 78" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="HoverLogo__Logo"
                    initial='initial'
                    animate={hovered ? 'enter' : 'exit'}
                    transition={{
                        duration: 0.5,
                        ease: [ 0.76, 0, 0.24, 1 ], 
                    }}
                >
                    <motion.line 
                        x1="71.5" 
                        y1="41" 
                        x2="71.5" 
                        y2="5.25" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={2}
                        style={{ scaleY: -1}}
                        // top right
                    />
                    <motion.line 
                        x1="0.7" 
                        y1="40.5" 
                        x2="0.7" 
                        y2="76.5" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={2}
                        style={{ scaleY: -1}}
                        // bottom left
                    />
                    <motion.line 
                        x1="71.75" 
                        y1="40.75" 
                        x2="0.5" 
                        y2="40.75" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={3}
                        style={{ scaleX: -1}}
                        // top bottom
                    />
                    <motion.line 
                        x1="0.5" 
                        y1="76.25" 
                        x2="36.25" 
                        y2="76.25" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={2}
                        //bottom bottom
                    />
                    <motion.path 
                        d="M0.65 76.25L71.2943 5.65" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={1}
                    />
                    <motion.line 
                        x1="36.1" 
                        y1="5.25" 
                        x2="36.1" 
                        y2="76.45" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={3}
                        style={{ scaleY: -1}}
                        // midle straight
                    />
                    <motion.line 
                        x1="71.75" 
                        y1="5.35" 
                        x2="35.9" 
                        y2="5.35" 
                        stroke="white"
                        variants={IntroLogo}
                        custom={2}
                        // top top
                    />
                    <motion.path 
                        d="M26.724 19.4521C26.724 20.751 26.4359 21.8789 25.8598 22.8359C25.2836 23.793 24.4633 24.5352 23.3988 25.0625C22.3441 25.5801 21.0844 25.8389 19.6195 25.8389H13.5551V33.8809H10.7572V13.2412H19.4437C21.7582 13.2412 23.5502 13.7832 24.8197 14.8672C26.0892 15.9512 26.724 17.4795 26.724 19.4521ZM23.9115 19.4814C23.9115 16.8154 22.3099 15.4824 19.1068 15.4824H13.5551V23.627H19.224C20.7865 23.627 21.9584 23.2852 22.7396 22.6016C23.5209 21.9082 23.9115 20.8682 23.9115 19.4814Z" 
                        fill="white"   
                        variants={textIntroPath}
                        custom={1}
                    />
                    <motion.path 
                        d="M56.2641 68.6406C57.6117 68.6406 58.8666 68.4355 60.0287 68.0254C61.2006 67.6152 62.1478 67.0586 62.8705 66.3555V62.6348H56.7035V60.291H65.4486V67.4102C64.3549 68.5234 63.0121 69.3877 61.4203 70.0029C59.8383 70.6084 58.1195 70.9111 56.2641 70.9111C54.1156 70.9111 52.265 70.4766 50.7123 69.6074C49.1596 68.7383 47.9633 67.5029 47.1234 65.9014C46.2836 64.29 45.8637 62.3906 45.8637 60.2031C45.8637 56.8535 46.7621 54.2607 48.559 52.4248C50.3558 50.5889 52.8803 49.6709 56.1322 49.6709C58.4174 49.6709 60.2728 50.0566 61.6986 50.8281C63.1244 51.5996 64.223 52.835 64.9945 54.5342L62.3285 55.3252C61.7426 54.1533 60.932 53.2988 59.8969 52.7617C58.8715 52.2246 57.5922 51.9561 56.059 51.9561C53.6762 51.9561 51.8549 52.6787 50.5951 54.124C49.3353 55.5596 48.7055 57.5859 48.7055 60.2031C48.7055 62.8105 49.3744 64.8711 50.7123 66.3848C52.0502 67.8887 53.9008 68.6406 56.2641 68.6406Z" 
                        fill="white"
                        variants={textIntroPath}
                        custom={2}
                    />
                </motion.svg>
            </div>
            <div className="HoverLogo__Text">
                <motion.h3 
                    variants={textIntro} 
                    initial='initial' 
                    animate={hovered ? 'enter' : 'exit'}
                    transition={{
                        duration: 0.5,
                        ease: [ 0.76, 0, 0.24, 1 ],
                    }}
                    custom={1}
                >
                    Procházka Group
                </motion.h3>
                <motion.p 
                    variants={textIntro} 
                    initial='initial' 
                    animate={hovered ? 'enter' : 'exit'}
                    transition={{
                        duration: 0.5,
                        ease: [ 0.76, 0, 0.24, 1 ],
                    }}
                    custom={2}
                >
                    Finance a vzdělání
                </motion.p>
            </div>
        </div>
    )
}