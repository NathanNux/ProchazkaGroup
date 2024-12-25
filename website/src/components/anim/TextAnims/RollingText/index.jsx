import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { useRef } from 'react';

const RollingParagraph = ({ text, baseVelocity = 100, childrenCount, Scroll }) => {
    //we need to set the basedX to the position on X
    const BaseX = useMotionValue(0);
    // then since I have that I need to use onScroll to get the scroll position
    // Now I need the velocity of the scroll to make the X position move faster
    const scrollVelocity = useVelocity(Scroll);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50, 
        stiffness: 400 
    });
    // now I I have created velocity, I need to set the BaseX to the scrollVelocity and smooth one to create anim effect
    // I now need the factor I want to speed up the movement of the text based on how fast you scroll the mouse on top of the movement
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {clamp: false}); //clamp: false => value will exceed the range if it is outside of the range
    // now what I have how much I want to move the x value based on the scroll velocity

    const wrapStart = -20;
    const wrapWidht = 100 / childrenCount;
    const wrapEnd = wrapStart - wrapWidht;
    // Now I need to create that x anim effect based on the velocity factor and baseX whihc is the scroll movement 1 or -1 scroling up or down
    // wrap: Ensures the x value loops within a specified range, creating a seamless scrolling effect.
    const x = useTransform( BaseX, (v) => `${wrap(wrapStart, wrapEnd, v)}%`);
    // the v is a value of the BaseX and that is wrapped in -20 and -45% to make the text move left or right based on the scroll velocity and the differnce is 25% because of 4 children span elements
    // Can be calculated dynamically based on the number of children elements

    // to make it move faster based on the velocity of the scroll go for lower values, to go slower use higher values.
    // this creates a range of that loop from -20 to -45 or 20 to 45 or 0 to 25 or 0 to 45 to make the loop faster or slower 
    // the higher the value the slower the loop, the lower the value the faster the loop

    // Now I need to set the anim in motion, so I need a direction where we are going to move the text scroll up or down
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        // delta is like in math the differnce between two points, so the difference between the last frame and the current frame in time miliseconds
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000); // that is the speed of the scroll in pixels per second

        // now I need to move the text based on the direction and the moveBy value
        if(velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        // if the direction is 1 then we move the text by the moveBy value that means we are scrolling down
        // if the direction is -1 then we move the text by the moveBy value that means we are scrolling up

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        // this calculates the distance and the speed of the scroll based on the velocity of the scroll to move the component faster or slower based on the scroll velocity so on how fast you are scrollling up or down
        // the += is the same as moveBy = moveBy + directionFactor.current + moveBy * velocityFactor.get(); just shorter

        BaseX.set(BaseX.get() + moveBy);// this is the movement of the text based on the scroll velocity, so the distance and the speed of the scroll so duration of animation to move the text either left or right based on the scroll velocity and the direction of the scroll
    });

    return (
        <div className="Rolling_text_container">
            <motion.p style={{ x }}>
                {Array.from({ length: childrenCount }, (_, index) => (
                    <span key={index}>{text} </span>
                ))}
            </motion.p>
        </div>
    )
}

export default function RollingText ({ text, baseVelocity, textsCount }) {
    const containerRef = useRef(null);
    const { scrollY } = useScroll({
        target: containerRef
    });

    return (
        <section className='Rolling__text' ref={containerRef}>
            <RollingParagraph text={text} baseVelocity={(baseVelocity) || 1} Scroll={scrollY} childrenCount={textsCount}/>
            <RollingParagraph text={text} baseVelocity={-(baseVelocity) || -1} Scroll={scrollY} childrenCount={textsCount}/>
        </section>
    )
}

//WIP: Redo this code to make it to an icon list anim for the main page Sponsors logos and Parnters logos 
//NOTE: This is just a prototype, that is animating texts based on scroll velocity.



//NOTE at the end - Since the scrollY is for the whole page I need to target the current section to make the text move based on the scroll velocity much smaller
// So either way it will save bit of performance and make the text move based on the scroll velocity of the current section