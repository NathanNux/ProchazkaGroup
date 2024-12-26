import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import GetChars from './getChars'
import Magnetic from '@/components/anim/Magnetic'
import ONViewLogo from '@/components/anim/LogoAnims/onView'
import { NavLinks, NavAddLinks, NavIcons } from '@/constants/common'


const rows = [
    {
        number: 0,
    },
    {
        number: 1,
    },
    {
        number: 2,
    }
]

const textShow = {
    initial: {
        opacity: 0,
        y: '100%'
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            delay: (i * 0.05) + 0.6
        }
    }),
    exit: (i) => ({
        opacity: 0,
        y: '100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: ((NavLinks.length - i - 1) * 0.05)
        }
    })
};


const logoShow = {
    initial: {
        opacity: 0,
        y: '-100%'
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.7}
    },
    exit: {
        opacity: 0,
        y: '-100%',
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1}
    }
}

const background = {
    initial: {
        x: '100%'
    },
    enter: {
        x: '0%',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        x: '100%',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.6}
    }
}
const rowSlide = {
    initial: {
      x: '100%',
    },
    enter: (i) => ({
      x: '0%',
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1], 
        delay: ((rows.length - i - 1) * 0.1 ) + 0.2 },
    }),
    exit: (i) => ({
      x: '100%',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: (i * 0.15 ) + 0.3  },
    }),
};


export default function NavbarBody({setMenu}) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
  const pathname = usePathname();


  return (
    <div className='navbar__body'>
      <motion.div
        className='navbar__body__background'
        variants={background}
        initial='initial'
        animate='enter'
        exit='exit'
        onClick={() => setMenu(false)}
      ></motion.div>
      <div className='navbar__body__rows__container'>
        <motion.div 
            className='navbar__body__rows__logo'
            initial='initial'
            animate='enter'
            exit='exit'
            variants={logoShow}
        >
            <ONViewLogo />
        </motion.div>
        {rows.map((row, index) => {
            const { number } = row;
            return (
            <motion.div
                key={number}
                className='navbar__body__row'
                variants={rowSlide}
                initial='initial'
                animate='enter'
                exit='exit'
                custom={index}
            ></motion.div>
            );
        })}
      </div>
      <div className='navbar__body__container'>
        {NavLinks.map((link, index) => {
          const { href, text } = link;
          const initialColor = pathname === href ? '#00F0FF' : '#fff';
          return (
            <Magnetic key={`magns${index}`} sensitivity='0.1'>
                <motion.div
                key={`bds${index}`}
                className={`navbar__body__link ${pathname === href ? 'active' : ''}`}
                onMouseEnter={() => setSelectedLink({ isActive: true, index })}
                onMouseLeave={() => setSelectedLink({ isActive: false, index })}
                variants={textShow}
                initial='initial'
                animate='enter'
                exit='exit'
                custom={index}
                >
                <Link href={href}>
                    <motion.p>
                        <GetChars
                        text={text}
                        selectedLink={selectedLink}
                        index={index}
                        initialColor={initialColor}
                        />
                    </motion.p>
                </Link>
                </motion.div>
            </Magnetic>
          );
        })}
      </div>
      <div className='navbar__body__add__container'>
        <div className='navbar__body__add__devider'>
            {NavAddLinks.map((link, index) => {
                const { href, text } = link;
                const newIndex = index + NavLinks.length;
                const initialColor = pathname === href ? '#00F0FF' : '#fff';
                return (
                    <Magnetic key={`magnts${newIndex}`} sensitivity='0.1'>
                        <motion.div
                            key={`adddiv${newIndex}`}
                            className='navbar__body__add-link'
                            onMouseEnter={() => setSelectedLink({ 
                                isActive: true, 
                                index: newIndex 
                            })}
                            onMouseLeave={() => setSelectedLink({ 
                                isActive: false, 
                                index: newIndex 
                            })}
                            variants={textShow}
                            initial='initial'
                            animate='enter'
                            exit='exit'
                            custom={newIndex}
                        >
                            <Link href={href}>
                                <motion.p>
                                    <GetChars
                                        text={text}
                                        selectedLink={selectedLink}
                                        index={newIndex}
                                        initialColor={initialColor}
                                    />
                                </motion.p>
                            </Link>
                        </motion.div>
                    </Magnetic>
                );
            })}
        </div>
        <div className='navbar__body__add__devider'>
            {NavIcons.map((icon, index) => {
                const { href, text } = icon;
                const iconIndex = index + NavLinks.length + NavAddLinks.length;
                const initialColor = pathname === href ? '#00F0FF' : '#fff';
                return (
                    <Magnetic key={`iconsmag${iconIndex}`} sensitivity='0.1'>
                        <motion.div
                            key={`iconsdiv${iconIndex}`}
                            onMouseEnter={() => setSelectedLink({ 
                                isActive: true, 
                                index: index + NavLinks.length + NavAddLinks.length 
                            })}
                            onMouseLeave={() => setSelectedLink({ 
                                isActive: false, 
                                index: index + NavLinks.length + NavAddLinks.length 
                            })}
                            className='navbar__body__icon'
                            variants={textShow}
                            initial='initial'
                            animate='enter'
                            exit='exit'
                            custom={iconIndex}
                        >
                            <Link href={href}>
                                <motion.p>
                                    <GetChars
                                        text={text}
                                        selectedLink={selectedLink}
                                        index={iconIndex}
                                        initialColor={initialColor}
                                    />
                                </motion.p>
                            </Link>
                        </motion.div>
                    </Magnetic>
                );
            })}
        </div>
      </div>
    </div>
  );
}