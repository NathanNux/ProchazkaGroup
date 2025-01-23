import "@/styles/globals.scss";
import '@/styles/styles.scss';
import { useEffect } from "react";
import Lenis from "lenis";
import { LoadProvider } from "@/context/LoadProvider";
import { CursorRefProvider } from "@/context/CursorRefProvider";
import Transition from "@/components/anim/Transition";
import { Toaster } from "@/components/ui/toaster";
import { PerformanceProvider } from "@/context/PerformanceProvider";
import CookiesBar from "@/components/modems/Cookies";
import CookiesBanner from "@/components/modems/CookiesModem";
import { CookiesProvider } from "@/context/CookiesProvider";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.lenis = new Lenis({
      duration: 1.2,           
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      lerp: 0.8,               
      smoothWheel: true,       
      wheelMultiplier: 1,      
      touchMultiplier: 1,      
      autoRaf: false,          
    });

    function raf(time) {
      window.lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.lenis.destroy()
    }
  }, [])


  return (
    <CookiesProvider>
      <PerformanceProvider>
        <LoadProvider>
          <CursorRefProvider>
            <Transition> 
              <CookiesBar />
              <Component {...pageProps} />
              <Toaster />
            </Transition>
          </CursorRefProvider>
        </LoadProvider>
      </PerformanceProvider>
    </CookiesProvider>
  );
}