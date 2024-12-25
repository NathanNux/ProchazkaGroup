'use client'
import NavbarBody from './body';
import { useState} from 'react';
import Menu from './menu';
import { AnimatePresence } from 'framer-motion';

export default function Navbar () {
    const [menu, setMenu] = useState(false);
  return (
    <section className='navbar'>
        <Menu menu={menu} setMenu={setMenu} />
        <AnimatePresence mode='sync'>
            {menu && <NavbarBody setMenu={setMenu}/>}
        </AnimatePresence>
    </section>
  ) 
}
