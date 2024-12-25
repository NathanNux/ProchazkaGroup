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
    // I have refractured the code to use this state with null value, so I can use it to check if the bounds are hovered and which one - using true or false woulf activate all of them at once. 
    // This is important for the cursor to stick to the center of the hovered bounds
    // Then I redone and simplified the manageMouseMove function to use this state and the useEffects to filter the boundsRefs to use the correct boundsRef
    // Should be simpler and more efficient on memory and performance
    // Determine cursor size based on activeHoveredRef
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
        const { clientX, clientY } = e;
        const { width: widthRef, height: heightRef } = ref.current.getBoundingClientRect();

        // NOTE: If we map over multiple Refs, like in this case, I cannot use .current, ther is no .current on boundsRefs, its a list of refs
        if (activeHoveredRef) {
            const boundsRect = activeHoveredRef.getBoundingClientRect();
            const center = { x: boundsRect.left + boundsRect.width / 2, y: boundsRect.top + boundsRect.height / 2 };

            mouse.x.set((center.x - widthRef / 2) + (clientX - center.x) * 0.1);
            mouse.y.set((center.y - heightRef / 2) + (clientY - center.y) * 0.1);
        } else {
            // Follow the mouse
            mouse.x.set(clientX - widthRef / 2);
            mouse.y.set(clientY - heightRef / 2);
        }
        // this above is condition to either stick the mouse to the center of the navbar bounds or just to follow the mouse


        // // // for scale we need positive values
        // // const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
        // // // now I need to calculate the stretch factor
        // // const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.25], { clamp: true }); // clamps => value will not exceed the range - true
        // // const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.75], { clamp: true });
        // // // now I need to calculate the scale factor
        // // scale.x.set(newScaleX);
        // // scale.y.set(newScaleY);
    }, [activeHoveredRef, mouse.x, mouse.y]);

    const throttledMouseMove = useCallback(throttle(manageMouseMove, 16), [manageMouseMove]);

    // note: useCallback is used to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // this is also done to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // and throttle is used to prevent the function from being called too many times in a short period of time to 60fps - this is important for performance and function, it got bugged out when states changed


    // Hover bounds
    // Memoize the hover handlers
    // Handle hover over a specific boundsRef
    const handleBoundsHover = useCallback((boundsRef) => {
        setActiveHoveredRef(boundsRef);
    }, []);

    // Handle mouse leaving a specific boundsRef
    const handleBoundsLeave = useCallback((boundsRef) => {
        // Ensure that the activeHoveredRef is the one leaving
        if (activeHoveredRef === boundsRef) {
            setActiveHoveredRef(null);
        }
    }, [activeHoveredRef]);

    useEffect(() => {
        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
            throttledMouseMove.cancel();
        };
    }, [throttledMouseMove, boundsRefs]);

    useEffect(() => {
        // here we first figure out which boundsRef is hovered from the boundsRefs list
        boundsRefs.forEach((boundsRef) => {
            if(boundsRef) {
                // Bind the specific boundsRef to the handler
                const onHover = () => handleBoundsHover(boundsRef);
                const onLeave = () => handleBoundsLeave(boundsRef);
                
                boundsRef.addEventListener('mouseenter', onHover);
                boundsRef.addEventListener('mouseleave', onLeave);

                // Store the handlers to remove them later
                // handlers are stored on the element itself and not in the component state, so its not a memory leak
                boundsRef.__onHover = onHover;
                boundsRef.__onLeave = onLeave;
            }
        });

        return () => {
            // Remove the event listeners
            boundsRefs.forEach((boundsRef) => {
                if(boundsRef) {
                    boundsRef.removeEventListener('mouseenter', boundsRef.__onHover);
                    boundsRef.removeEventListener('mouseleave', boundsRef.__onLeave);
                    delete boundsRef.__onHover;
                    delete boundsRef.__onLeave;
                }
            });
        };
    }, [boundsRefs, handleBoundsHover, handleBoundsLeave]);

    return (
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