import { useCursorRef } from "@/context/CursorRefProvider";
import { animate, transform, useMotionValue, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Magnetic from "@/components/anim/Magnetic";
import { usePerformance } from "@/context/PerformanceProvider";

export default function MyButton({ href, text }) {
    const { registerRef, unregisterRef } = useCursorRef();
    const ButtonBoundsRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false);
    
    // Performance
    const { shouldReduceAnimations } = usePerformance();

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x)
        animate(buttonRef.current, {rotate: `${angle}rad`}, {duration: 0});
        animate(textRef.current, {rotate: `${-angle}rad`}, {duration: 0});
        animate(ButtonBoundsRef.current, {rotate: `${-angle}rad`}, {duration: 0});
    }

    const manageMouseMove = useCallback((e) => {
        if (shouldReduceAnimations) return;

        const { clientX, clientY } = e;
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = buttonRef.current.getBoundingClientRect();

        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };

        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (boundsHovered) {
            rotate(distance);

            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.1], { clamp: true }); // clamps => value will not exceed the range - true
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.9], { clamp: true });
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        } else {return null}
    }, [boundsHovered, scale.x, scale.y, buttonRef]);

    const manageBoundsHover = () => {
        if (!shouldReduceAnimations) {
            setBoundsHovered(true);
        }
    };

    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        animate(buttonRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});
        animate(ButtonBoundsRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});

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
    }, [ButtonBoundsRef, manageBoundsHover, manageBoundsLeave]);

    useEffect(() => {
        if (ButtonBoundsRef.current) {
            registerRef(ButtonBoundsRef.current);
        }

        if (buttonRef.current) {
            registerRef(buttonRef.current);
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
        <Magnetic sensitivity='0.05'>
            <motion.div 
                transformTemplate={template} 
                ref={buttonRef} 
                style={{scaleX: scale.x, scaleY: scale.y}} 
                className='My__button_container'
            >
                <div ref={ButtonBoundsRef} className='My__button_Bounds'></div>
                <Link href='https://matejforejt.com/' ref={textRef} className="logo">
                    <p className="copyright">©</p>
                    <div className="name">
                        <p className="codeBy">Kód od</p>
                        <p className="dennis">Matěje</p>
                        <p className="snellenberg">Forejta</p>
                    </div>
                </Link>
            </motion.div>
        </Magnetic>
    )
}