import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children, sensitivity }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    // this code is bit broken, in order to fix it, I need to add top and left and calculate the middle of the element diferently
    // the code behaved diffrerently because the element was not folowing the mouse properly, behaved like crazy

    // const handleMouseMove = (e) => {
    //     const { clientX, clientY } = e;
    //     const { width, height } = ref.current.getBoundingClientRect();
    //     const  middleX =clientX - (width / 2);
    //     const middleY = clientY - (height / 2);
    //     setPosition({x: middleX * 0.05, y: middleY * 0.05});
    // }

    //new code
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, top, left } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({x: middleX * sensitivity, y: middleY * sensitivity});
    }

    const reset = () => {
        setPosition({x: 0, y: 0});
    }

    const { x, y } = position;

    const animationSettings = {
        type: 'spring',
        damping: 5,
        stiffness: 350,
        mass: 0.5
    }

    return (
        <motion.div 
            ref={ref} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={reset}
            style={{position: 'relative'}}
            animate={{x, y}}
            transition={animationSettings}
            className="magnetic"
        >
            {children}
        </motion.div>
    )

}