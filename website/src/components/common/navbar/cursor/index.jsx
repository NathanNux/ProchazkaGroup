'use client'
import { useCursorRef } from "@/context/CursorRefProvider";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import throttle from 'lodash.throttle';

export default function Cursor() {
    const ref = useRef(null);
    const { boundsRefs } = useCursorRef();
    const [activeHoveredRef, setActiveHoveredRef] = useState(null);
    const [CursorDimensions, setCursorDimensions] = useState({ width: 20, height: 20 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    // I have refractured the code to use this state with null value, so I can use it to check if the bounds are hovered and which one - using true or false woulf activate all of them at once. 
    // This is important for the cursor to stick to the center of the hovered bounds
    // Then I redone and simplified the manageMouseMove function to use this state and the useEffects to filter the boundsRefs to use the correct boundsRef
    // Should be simpler and more efficient on memory and performance
    // Determine cursor size based on activeHoveredRef

    // Touch detection on mount
    useEffect(() => {
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0 ||
                (window.DocumentTouch && document instanceof DocumentTouch)
            );
        };
        
        setIsTouchDevice(checkTouch());
    }, []);

    useEffect(() => {
        if (activeHoveredRef) {
            const { width, height } = activeHoveredRef.getBoundingClientRect();
            const newWidth = width * 0.25;
            const newHeight = height * 0.25;
            setCursorDimensions({ width: newWidth, height: newHeight });
        } else {
            setCursorDimensions({ width: 20, height: 20 });
        }
    }, [activeHoveredRef]);

    const CursorSizeWidth = CursorDimensions.width;
    const CursorSizeHeight = CursorDimensions.height;
    

    // Mouse position + smooth
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }

    const smoothMouseOptions = {
        damping: 20,
        stiffness: 200,
        mass: 0.5
    };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothMouseOptions),
        y: useSpring(mouse.y, smoothMouseOptions)
    };

    const manageMouseMove = useCallback((e) => {
        if (!ref.current || isTouchDevice) return;
        
        const { clientX, clientY } = e;
        const { width: widthRef, height: heightRef } = ref.current.getBoundingClientRect();

        if (activeHoveredRef) {
            const boundsRect = activeHoveredRef.getBoundingClientRect();
            const center = { x: boundsRect.left + boundsRect.width / 2, y: boundsRect.top + boundsRect.height / 2 };

            mouse.x.set((center.x - widthRef / 2) + (clientX - center.x) * 0.1);
            mouse.y.set((center.y - heightRef / 2) + (clientY - center.y) * 0.1);
        } else {
            mouse.x.set(clientX - widthRef / 2);
            mouse.y.set(clientY - heightRef / 2);
        }
    }, [activeHoveredRef, mouse.x, mouse.y, isTouchDevice]);

    const throttledMouseMove = useCallback(throttle(manageMouseMove, 16), [manageMouseMove]);

    // note: useCallback is used to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // this is also done to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // and throttle is used to prevent the function from being called too many times in a short period of time to 60fps - this is important for performance and function, it got bugged out when states changed


    // Hover bounds
    // Memoize the hover handlers
    // Handle hover over a specific boundsRef

    const handleBoundsHover = useCallback((boundsRef) => {
        if (!isTouchDevice) {
            setActiveHoveredRef(boundsRef);
        }
    }, [isTouchDevice]);

    const handleBoundsLeave = useCallback((boundsRef) => {
        if (!isTouchDevice && activeHoveredRef === boundsRef) {
            setActiveHoveredRef(null);
        }
    }, [activeHoveredRef, isTouchDevice]);

    useEffect(() => {
        if (!isTouchDevice) {
            window.addEventListener('mousemove', throttledMouseMove);
            return () => {
                window.removeEventListener('mousemove', throttledMouseMove);
                throttledMouseMove.cancel();
            };
        }
    }, [throttledMouseMove, boundsRefs, isTouchDevice]);

    useEffect(() => {
        if (!isTouchDevice) {
            boundsRefs.forEach((boundsRef) => {
                if(boundsRef) {
                    const onHover = () => handleBoundsHover(boundsRef);
                    const onLeave = () => handleBoundsLeave(boundsRef);
                    
                    boundsRef.addEventListener('mouseenter', onHover);
                    boundsRef.addEventListener('mouseleave', onLeave);
                    boundsRef.__onHover = onHover;
                    boundsRef.__onLeave = onLeave;
                }
            });

            return () => {
                boundsRefs.forEach((boundsRef) => {
                    if(boundsRef) {
                        boundsRef.removeEventListener('mouseenter', boundsRef.__onHover);
                        boundsRef.removeEventListener('mouseleave', boundsRef.__onLeave);
                        delete boundsRef.__onHover;
                        delete boundsRef.__onLeave;
                    }
                });
            };
        }
    }, [boundsRefs, handleBoundsHover, handleBoundsLeave, isTouchDevice]);

    return isTouchDevice ? null : (
        <motion.div
            ref={ref}
            className='cursor'
            style={{
                translateX: smoothMouse.x,
                translateY: smoothMouse.y,
                scaleX: scale.x,
                scaleY: scale.y
            }}
            animate={{
                borderRadius: CursorSizeWidth / 2,
                width: CursorSizeWidth,
                height: CursorSizeHeight
            }}
        ></motion.div>
    );
}