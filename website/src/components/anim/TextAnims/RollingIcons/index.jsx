import { partnersIcons } from '@/constants/mainpage';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const RollingLogos = ({ baseVelocity = 100, childrenCount, Scroll }) => {
    const BaseX = useMotionValue(0);
    const scrollVelocity = useVelocity(Scroll);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50, 
        stiffness: 400 
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Adjust wrap values for icons
    const wrapStart = -25;
    const wrapWidth = 100 / 2; // Use actual icons length
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

    return (
        <div className="Rolling_icons_container">
            <motion.div className="icons_wrapper" style={{ x }}>
                {partnersIcons.map((icon, index) =>{ 
                    const { src, alt } = icon;
                    return(
                    <div key={`icon-${index}-${icon.name}`} className="icon_item">
                        <Image
                            src={src}
                            alt={alt}
                            width={200}
                            height={150}
                            style={{ objectFit: 'contain' }}
                            quality={60}
                            loading='lazy'
                        />
                    </div>
                )})}
            </motion.div>
        </div>
    );
};

export default function RollingIcons({ baseVelocity = 5 }) {
    const containerRef = useRef(null);
    const { scrollY } = useScroll({
        target: containerRef
    });

    return (
        <section className='Rolling__icons' ref={containerRef}>
            <RollingLogos 
                baseVelocity={baseVelocity} 
                Scroll={scrollY} 
                childrenCount={partnersIcons.length}
            />
            <RollingLogos 
                baseVelocity={-baseVelocity} 
                Scroll={scrollY} 
                childrenCount={partnersIcons.length}
            />
        </section>
    );
}