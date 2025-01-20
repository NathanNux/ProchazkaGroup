import { useCursorRef } from "@/context/CursorRefProvider";
import { animate, transform, useMotionValue, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Magnetic from "@/components/anim/Magnetic";
import { usePerformance } from "@/context/PerformanceProvider";

export default function CustomImage({ src, altText }) {
    const { registerRef, unregisterRef } = useCursorRef();
    const ImageBoundsRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false); 

    // Performance
    const { shouldReduceAnimations } = usePerformance();


    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x)
        animate(imageContainerRef.current, {rotate: `${angle}rad`}, {duration: 0});
        animate(imageRef.current, {rotate: `${-angle}rad`}, {duration: 0});
    }

    const manageMouseMove = useCallback((e) => {
        if (shouldReduceAnimations) return;

        const { clientX, clientY } = e;
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = imageContainerRef.current.getBoundingClientRect();

        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };

        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (boundsHovered) {
            rotate(distance);
            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.02], { clamp: true }); // clamps => value will not exceed the range - true
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.98], { clamp: true });
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        } else {return null}
    }, [boundsHovered, scale.x, scale.y, imageContainerRef]);

    const manageBoundsHover = () => {
        if (!shouldReduceAnimations) {
            setBoundsHovered(true);
        }
    };

    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        animate(imageContainerRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});
    };

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, [manageMouseMove]);

    useEffect(() => {
        const current = imageContainerRef.current;
        if (current) {
            current.addEventListener('mouseenter', manageBoundsHover);
            current.addEventListener('mouseleave', manageBoundsLeave);

            return () => {
                current.removeEventListener('mouseenter', manageBoundsHover);
                current.removeEventListener('mouseleave', manageBoundsLeave);
            };
        }
    }, [ImageBoundsRef]);

    useEffect(() => {
        if (ImageBoundsRef.current) {
            registerRef(ImageBoundsRef.current);
        }

        return () => {
            if (ImageBoundsRef.current) {
                unregisterRef(ImageBoundsRef.current);
            }
        }
    }, [ImageBoundsRef.current, registerRef, unregisterRef]);

    const template = ({rotate, scaleX, scaleY}) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})` 
    }
    return (
        <Magnetic sensitivity='0.01'>
            <motion.div transformTemplate={template} ref={imageContainerRef} style={{scaleX: scale.x, scaleY: scale.y}} className='Custom__image__container'>
                <div ref={ImageBoundsRef} className='Custom__image__Bounds'></div>
                    <Image 
                        ref={imageRef} 
                        src={src} 
                        alt={altText} 
                        fill={true} 
                        sizes="50vw" 
                        priority={false} 
                        quality={80} 
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/webp"
                    />
            </motion.div>
        </Magnetic>
    )
}