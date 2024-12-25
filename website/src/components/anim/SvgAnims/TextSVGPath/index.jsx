import { useScroll } from "framer-motion";
import SVGPath from "./svgPath";
import { useRef } from "react";

export default function SVGPathText({ text, textButton }) {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0.4 end", "end end"] 
    });
    return (
        <div ref={ref} className="svg__main">
            <SVGPath text={text} scroll={scrollYProgress} textButton={textButton}/>
            <div className="space"></div>
        </div>
    )
}