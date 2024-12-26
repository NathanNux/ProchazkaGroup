import { partnersIcons } from '@/constants/mainpage';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const RollingLogos = ({ baseVelocity = 100, childrenCount, Scroll }) => {
    const BaseX = useMotionValue(0);
    const wrapperRef = useRef(null);
    const scrollVelocity = useVelocity(Scroll);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const directionFactor = useRef(1);
    const containerWidth = 100 * partnersIcons.length;
    
    const x = useTransform(BaseX, (value) => {
        const normalized = value % containerWidth;
        return `${normalized}%`;
    });

    useAnimationFrame((t, delta) => {
        if (!wrapperRef.current) return;
        
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        const currentX = BaseX.get();

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        // Reset position when reaching threshold
        if (Math.abs(currentX) >= containerWidth / 2) {
            BaseX.set(0);
        } else {
            BaseX.set(currentX - moveBy);
        }
    });

    // Triple the icons for seamless loop
    const loopedIcons = [...partnersIcons, ...partnersIcons, ...partnersIcons, ...partnersIcons];

    return (
        <div className="Rolling_icons_container">
            <motion.div className="icons_wrapper" ref={wrapperRef} style={{ x }}>
                {loopedIcons.map((icon, index) =>{ 
                    const { src, alt } = icon;
                    return(
                    <div key={`icon-${index}-${icon.name}`} className="icon_item">
                        <Image
                            src={src}
                            alt={alt}
                            width={200}
                            height={200}
                            loading='lazy'
                            style={{ 
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%'
                            }}
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