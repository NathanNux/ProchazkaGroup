import { useEffect, useRef, useState } from "react"
import SVGPathButton from "../../ButtonSVGPath";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SVGPath ({ text, scroll, textButton }) {
    const texts = useRef([]);
    const pathRef = useRef(null);


    const [pathLength, setPathLength ] = useState(0); 
    const progressX = useMotionValue(0);
    const progressY = useMotionValue(0);


    const buttonScale = useTransform(
        scroll,
        [0, 0.35, 0.45, 0.6, 0.7, 1],
        [0, 0, 1, 1, 0, 0], 
        { clamp: true }
    );

    const buttonIconScale = useTransform(
        scroll,
        [0, 0.35, 0.45, 0.6, 0.7, 1],
        [1, 0.75, 0, 0, 0.75, 1], 
        { clamp: true }
    );

    useEffect(() => {
        if(pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    },[])
    
    const length = useTransform(scroll, [0, 1], [0, pathLength]);

    // the issue I'm experiencing now is that the internal coords of the path are smaller than I display it, so I need to find out that displayed path and initial coords of the path
    // Copilot helped me with getting the right functuons to get the right coords of the path


    useEffect(() => {
        if( pathRef.current) {
            const path = pathRef.current;

            const updatePosition = () => {
                const lengthValue = length.get();
                const point = path.getPointAtLength(lengthValue);

                //I need to get teh displayed path and the initial path not the internal
                const ctm = path.getScreenCTM();
                const svgPoint = path.ownerSVGElement.createSVGPoint();

                svgPoint.x = point.x;
                svgPoint.y = point.y;
                const transformedPoint = svgPoint.matrixTransform(ctm);

                progressX.set(transformedPoint.x);
                progressY.set(transformedPoint.y);

                // the issue is that the path is not displayed correctly, so I need to get the right coords of the path
                // not it works
            }


            const unsubscribeScroll = length.on('change', updatePosition);
            updatePosition();

            return () => {
                unsubscribeScroll();
            }
        }
    }, [length, progressX, progressY]);
    useEffect(() => {

        scroll.on('change', v => {
            texts.current.forEach((text, i) => {
                text.setAttribute("startOffset", `${-40 +(i * 40) + (v * 40)}%`);
            });
        });
    }, [scroll, progressX, progressY]);
    return (
        <div className="svg__path__container">
            <svg viewBox="0 0 250 90">
                <path ref={pathRef} id="curve" d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"/>
                <text className="path__Text">
                    { [...Array(3)].map((_, i) => {
                        return (
                            <textPath key={i} ref={ref => texts.current[i] = ref} href="#curve" startOffset={`${i * 40}%`}>
                                {text}
                            </textPath>
                        )
                    })}
                </text>
            </svg>
             {/* Animated Button */}
            <motion.div
                className="svg__button__container"
                style={{
                position: "fixed",
                left: 0,
                top: 0,
                scale: buttonScale,
                x: progressX,
                y: progressY,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 2,
                }}
            >
                <SVGPathButton text={textButton} href="/" />
            </motion.div>
            {/* Animated Icon */}
            <motion.div
                style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#050A10",
                border: "1px solid #00F0FF",
                scale: buttonIconScale,
                x: progressX,
                y: progressY,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 1,
                }}
            />
        </div>
    )
}

// in the tutorial if needed, there is a good parallax effect on a footer. 

// it is really good idea for a short fotter with a few links. Oliver Larose svg path text animation.



//NOTE: The text is just the pathText - very simple. use the useffect for the text and the textPath and style it. just use the scroll to make the change on scroll, thats it
// the rest of the anim is the motion.div pathing basde on the DISPLAYED Value of the 