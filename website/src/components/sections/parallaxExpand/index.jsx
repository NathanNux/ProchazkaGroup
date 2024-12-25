import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import picture1 from '../../../../public/assets/aboutBackground.png'
import picture2 from '../../../../public/svg/house.webp'
import picture3 from '../../../../public/svg/rock.webp'
import picture4 from '../../../../public/svg/tree.webp'
import picture5 from '../../../../public/svg/water.webp'
import picture6 from '../../../../public/svg/tree.png'
import picture7 from '../../../../public/assets/reviewsBackground.png'
import picture8 from '../../../../public/assets/mainBackground.png'
import picture9 from '../../../../public/svg/cactus.webp'
import Image from "next/image"




export default function ParallaxExpanf() {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: [ 'start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [ 0, 1], [ 1, 4])
    const scale5 = useTransform(scrollYProgress, [ 0, 1], [ 1, 5])
    const scale6 = useTransform(scrollYProgress, [ 0, 1], [ 1, 6])
    const scale8 = useTransform(scrollYProgress, [ 0, 1], [ 1, 8])
    const scale9 = useTransform(scrollYProgress, [ 0, 1], [ 1, 9])

    const pictures = [
        {
            src: picture1,
            scale: scale4,
        },
        {
            src: picture2,
            scale: scale5,
        },
        {
            src: picture3,
            scale: scale6,
        },
        {
            src: picture4,
            scale: scale5,
        },
        {
            src: picture5,
            scale: scale4,
        },
        {
            src: picture6,
            scale: scale6,
        },
        {
            src: picture7,
            scale: scale8,
        },
        {
            src: picture8,
            scale: scale9,
        },
        {
            src: picture9,
            scale: scale5,
        }
    ]

    return (
        <section className="ParallaxExpand" ref={container}>
            <div className="ParallaxExpand__sticky">
                {
                    pictures.map((pic, index) => {
                        const { src, scale } = pic
                        return (
                            <motion.div key={index} style={{ scale }} className="image__wrapper">
                                <div className="image__container">
                                    <Image src={src} alt="image" fill={true} placeholder="blur" style={{ zIndex: `${index}`}}/>
                                </div>
                            </motion.div>
                        )
                    })
                }
            </div>
        </section>
    )
}