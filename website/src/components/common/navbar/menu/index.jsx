import Magnetic from "@/components/anim/Magnetic";
import { useCursorRef } from "@/context/CursorRefProvider";
import { useMotionValue, motion, animate, transform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";


export default function Menu({menu, setMenu}) {
    const { registerRef, unregisterRef } = useCursorRef();
    const menuBoundsRef = useRef(null);
    const menuRef = useRef(null);
    const textRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false); 

    
    const textChange = {
        initial: {
            opacity: 0
        },
        open: {
            opacity: 1,
            transition: {duration: 0.5}
        },
        closed: {
            opacity: 0,
            transition: {duration: 0.5}
        }
    }

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x)
        animate(menuRef.current, {rotate: `${angle}rad`}, {duration: 0});
        animate(textRef.current, {rotate: `${-angle}rad`}, {duration: 0});
    }

    const manageMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = menuRef.current.getBoundingClientRect();

        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };

        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (boundsHovered) {
            rotate(distance);
            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.15], { clamp: true }); // clamps => value will not exceed the range - true
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.9], { clamp: true });
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        } else {return null}
    }, [boundsHovered, scale.x, scale.y, menuRef]);

    const manageBoundsHover = () => {
        setBoundsHovered(true);
    };

    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        animate(menuRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});
    };

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, [manageMouseMove]);

    useEffect(() => {
        const current = menuBoundsRef.current;
        if (current) {
            current.addEventListener('mouseenter', manageBoundsHover);
            current.addEventListener('mouseleave', manageBoundsLeave);

            return () => {
                if(current) {
                    current.removeEventListener('mouseenter', manageBoundsHover);
                    current.removeEventListener('mouseleave', manageBoundsLeave);
                }
            };
        }
    }, [menuBoundsRef, manageBoundsHover, manageBoundsLeave]);

    useEffect(() => {
        if (menuBoundsRef.current) {
            registerRef(menuBoundsRef.current);
        }

        return () => {
            if (menuBoundsRef.current) {
                unregisterRef(menuBoundsRef.current);
            }
        }
    }, [menuBoundsRef.current, registerRef, unregisterRef]);

    const template = ({rotate, scaleX, scaleY}) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})` 
    }
    return (
        <div className="navbar__container">
            <Magnetic sensitivity='0.15'>
                <motion.div transformTemplate={template} ref={menuRef} style={{scaleX: scale.x, scaleY: scale.y}} className='navbar__menu' onClick={() => setMenu(!menu)}
                    >
                    <div ref={menuBoundsRef} className='navbar__bounds'></div>
                    <div ref={textRef}>
                        <motion.p variants={textChange} animate={!menu ? "open" : "closed"}>Menu</motion.p>
                        <motion.p variants={textChange} animate={menu ? "open" : "closed"}>Close</motion.p>
                    </div>
                </motion.div>
            </Magnetic>
        </div>
    )
}