import { useCursorRef } from "@/context/CursorRefProvider";
import { animate, transform, useMotionValue, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/Sticky/Magnetic";

export default function SVGPathButton({ href, text }) {
    const { registerRef, unregisterRef } = useCursorRef();
    const ButtonBoundsRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false); 

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    // this will calculate the angle of the point of the cursor to what angle the center of the navbar will ratate to 
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x)
        animate(buttonRef.current, {rotate: `${angle}rad`}, {duration: 0});
        //text cannot be rotated, so we need to rotate it in the opposite direction to stay in place
        animate(textRef.current, {rotate: `${-angle}rad`}, {duration: 0});
    }

    const manageMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = buttonRef.current.getBoundingClientRect();

        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };

        // the distance from the center of the navbar bounds to the mouse
        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (boundsHovered) {
            // rotation to the cursor
            rotate(distance);
            // for scale we need positive values
            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            // now I need to calculate the stretch factor
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.15], { clamp: true }); // clamps => value will not exceed the range - true
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.9], { clamp: true });
            // now I need to calculate the scale factor
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        } else {return null}
        // this above is condition to either stick the mouse to the center of the navbar bounds or just to follow the mouse
    }, [boundsHovered, scale.x, scale.y, buttonRef]);

    // note: useCallback is used to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // this only needs to be done when we are using utils like getMousePosition - this is not needed for this example above

    // Hover bounds
    const manageBoundsHover = () => {
        setBoundsHovered(true);
    };

    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        animate(buttonRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});
    };

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, [manageMouseMove]);

    useEffect(() => {
        const current = ButtonBoundsRef.current;
        if (current) {
            current.addEventListener('mouseenter', manageBoundsHover);
            current.addEventListener('mouseleave', manageBoundsLeave);

            return () => {
                current.removeEventListener('mouseenter', manageBoundsHover);
                current.removeEventListener('mouseleave', manageBoundsLeave);
            };
        }
    }, [ButtonBoundsRef]);

    useEffect(() => {
        if (ButtonBoundsRef.current) {
            registerRef(ButtonBoundsRef.current);
        }

        return () => {
            if (ButtonBoundsRef.current) {
                unregisterRef(ButtonBoundsRef.current);
            }
        }
    }, [ButtonBoundsRef.current, registerRef, unregisterRef]);

    const template = ({rotate, scaleX, scaleY}) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})` 
    }
    return (
        <Magnetic sensitivity='0.3'>
            <motion.div transformTemplate={template} ref={buttonRef} style={{scaleX: scale.x, scaleY: scale.y}} className='SVGPath__button_container'>
                <div ref={ButtonBoundsRef} className='SVGPath__button_Bounds'></div>
                    <Link href={href}>
                        <p ref={textRef}>{text}</p>
                    </Link>
            </motion.div>
        </Magnetic>
    )
}