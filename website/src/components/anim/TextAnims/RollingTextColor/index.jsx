import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap, useInView } from 'framer-motion';
import { useRef, Fragment } from 'react';


const AnimatedCharacter = ({ char, scrollVelocity, isInView }) => {
    // need the anim to work also the way up not just down
    const scale = useTransform(scrollVelocity, [-1000, 0, 1000], [25, 1, 25], { clamp: true });
    const color = useTransform(scrollVelocity, [-15, 0, 15], ['#00F0FF' ,'#fff', '#00F0FF'], { clamp: true });

    return (
        <motion.span
            style={{
                display: 'inline-block',
                marginRight: '0.02em',
                scale: isInView ? scale : 1,
                color: isInView ? color : '#fff'
            }}
        >
            {char}
        </motion.span>
    );
};

const RollingParagraph = ({ text, baseVelocity = 100, childrenCount, Scroll }) => {
    const BaseX = useMotionValue(0);
    const scrollVelocity = useVelocity(Scroll);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50, 
        stiffness: 400 
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    const wrapStart = -20;
    const wrapWidth = 100 / childrenCount;
    const wrapEnd = wrapStart - wrapWidth;
    const x = useTransform(BaseX, (v) => `${wrap(wrapStart, wrapEnd, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if(velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        BaseX.set(BaseX.get() + moveBy);
    });

    const paragraphRef = useRef(null);
    const isInView = useInView(paragraphRef, { margin: '0px' });

    const characters = text.split('');

    return (
        <div className="Rolling_text_container">
            <motion.p style={{ x }} ref={paragraphRef}>
                {Array.from({ length: childrenCount }).map((_, childIndex) => (
                    <Fragment key={childIndex}>
                        {characters.map((char, charIndex) => {
                            if (char === ' ') {
                                return <span key={`space-${childIndex}-${charIndex}`}>&nbsp;</span>; 
                            } else {
                                return (
                                    <AnimatedCharacter 
                                        key={`${childIndex}-${charIndex}`} 
                                        char={char} 
                                        scrollVelocity={velocityFactor} 
                                        isInView={isInView}
                                    />
                                )
                            }
                        })}
                    </Fragment>
                ))}
            </motion.p>
        </div>
    );
}

export default function RollingTextColor ({ text, baseVelocity, textsCount }) {
    const containerRef = useRef(null);
    const { scrollY } = useScroll({
        target: containerRef
    });

    return (
        <section className='Rolling__text__color' ref={containerRef}>
            <RollingParagraph text={text} baseVelocity={-1} Scroll={scrollY} childrenCount={textsCount}/>
            <RollingParagraph text={text} baseVelocity={1} Scroll={scrollY} childrenCount={textsCount}/>
        </section>
    )
}