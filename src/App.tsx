import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Goal from './components/Goal';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for luxurious slow momentum smooth scroll
    const lenis = new Lenis({
      duration: 2.0, // Slow, elegant cinematic scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.75, // Gentle, controlled scroll speed
      touchMultiplier: 1.4,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible for full scroll control/blocking
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      delete (window as any).lenis;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <WhyChooseUs />
      <Goal />
      <About />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;
