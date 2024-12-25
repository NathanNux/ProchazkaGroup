import { useCursorRef } from "@/context/CursorRefProvider";
import { animate, transform, useMotionValue, motion, useScroll, useVelocity, useSpring, useTransform, wrap, useAnimationFrame } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/anim/Magnetic";

export default function RotatingButton({ href, text }) {
    const { registerRef, unregisterRef } = useCursorRef();
    const ButtonBoundsRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false);
    
    const { scrollY } = useScroll();
    const BaseVelocity = 50;

    const CurrentRotation = useMotionValue(0); // Single source of truth
    const isAnimating = useRef(true);

    const Velocity = useVelocity(scrollY)
    const SmoothVelocity = useSpring(Velocity, {
        stiffness: 400, 
        damping: 50
    });
    const velocityFactor = useTransform(SmoothVelocity, [0, 1000], [0, 5], {clamp: false}); //clamp: false => value will exceed the range if it is outside of the range

    const loopStart = 0;
    const loopEnd = 360;

    const rotation = useTransform(CurrentRotation, (v) => `${wrap(0, 360, v)}deg`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        if (!isAnimating.current) return;
    
        let moveBy = directionFactor.current * BaseVelocity * (delta / 1000);
    
        if(velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }
    
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        CurrentRotation.set(CurrentRotation.get() + moveBy);
    });


    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    const HoverRotate = useMotionValue(0);
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
        HoverRotate.set(angle);
        if(boundsHovered) {
            animate(buttonRef.current, {rotate: `${angle}deg`}, {duration: 0});
            animate(textRef.current, {rotate: `${-angle}deg`}, {duration: 0});
        }
    }

    const manageMouseMove = useCallback((e) => {
        if (!buttonRef.current) return;
        
        const { clientX, clientY } = e;
        const bounds = buttonRef.current.getBoundingClientRect();
        
        if (!bounds) return;
        
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = bounds;
    
        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };
    
        if (boundsHovered) {
            rotate(distance);
            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.05], { clamp: true });
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.95], { clamp: true });
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        }
    }, [boundsHovered, scale.x, scale.y, buttonRef]);

    const manageBoundsHover = () => {
        setBoundsHovered(true);
        isAnimating.current = false; // Completely stop animation
    };
    
    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        isAnimating.current = true; // Resume from current position
    };

    const renderCircularText = (text) => {
        const letters = text.split('');
        const totalLetters = letters.length;
        const radius = 90; // Adjust the radius as needed

        return letters.map((letter, index) => {
            const angle = (360 / totalLetters) * index;
            return (
                <span
                    key={index}
                    className="Rotating__button_letter"
                    style={{
                        transform: `rotate(${angle}deg) translate(${radius}px) rotate(${90}deg)`
                    }}
                >
                    {letter}
                </span>
            )
        });
    }
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
        const hover = HoverRotate.get();
        return `rotate(${CurrentRotation.get() + hover}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    };
    return (
        <Magnetic sensitivity='0.1'>
            <motion.div transformTemplate={template} ref={buttonRef} style={{scaleX: scale.x, scaleY: scale.y}} className='Rotating__button_container'>
                <div ref={ButtonBoundsRef} className='Rotating__button_Bounds'></div>
                    <Link href={href}>
                        <motion.p ref={textRef} style={{ rotate: rotation }}>{renderCircularText(text)}</motion.p>
                        <div className="Rotating__button_Center"></div>
                    </Link>
            </motion.div>
        </Magnetic>
    )
}