import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ConstructionPage from './pages/ConstructionPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import MediaPage from './pages/MediaPage';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

gsap.registerPlugin(ScrollTrigger);


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle location changes (e.g. back button)
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    // Intercept link clicks for client-side routing
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        // Skip links that are meant to be opened in a new tab
        if (target.getAttribute('target') === '_blank') return;
        
        // Handle anchor links on the same page
        const url = new URL(target.href);
        if (url.pathname === window.location.pathname && url.hash) {
          const targetEl = document.querySelector(url.hash);
          if (targetEl) {
            e.preventDefault();
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(targetEl, { duration: 1.2 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
          return;
        }

        e.preventDefault();
        const path = url.pathname;
        window.history.pushState({}, '', path + url.search + url.hash);
        setCurrentPath(path);

        if (url.hash) {
          setTimeout(() => {
            const targetEl = document.querySelector(url.hash);
            if (targetEl) {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(targetEl, { duration: 1.2 });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 150);
        } else {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        }
      }
    };
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

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

  useEffect(() => {
    // Dynamic page title & meta description updater for SPA navigation & search engine scrapers
    const routeSeo: Record<string, { title: string; desc: string }> = {
      '/': {
        title: 'ConOps Global | Managed Remote Workforce, Civil Engineering & Construction Talent',
        desc: 'Founded by Amit Gole, ConOps Global delivers managed remote workforces and specialized technical talent for US heavy civil, asphalt, concrete, and construction engineering contractors.'
      },
      '/services': {
        title: 'Strategic Industry Services & Talent Solutions | ConOps Global',
        desc: 'Full-cycle engineering, estimating, safety compliance, and operational optimization consulting for concrete and asphalt contractors led by Amit Gole.'
      },
      '/construction': {
        title: 'Offshore Construction & Engineering Support ($375/wk) | ConOps Global',
        desc: 'Pre-vetted concrete estimators, project engineering controls, Procore admins, and offshore Project Managers for US contractors starting at $375/week.'
      },
      '/services/construction': {
        title: 'Offshore Construction & Engineering Support ($375/wk) | ConOps Global',
        desc: 'Pre-vetted concrete estimators, project engineering controls, Procore admins, and offshore Project Managers for US contractors starting at $375/week.'
      },
      '/about': {
        title: 'About Amit Gole & Leadership Team | ConOps Global',
        desc: 'Meet founder Amit Gole and discover how 15+ years of US civil engineering and heavy infrastructure experience shapes our high-rigor talent consultancy.'
      },
      '/faq': {
        title: 'Frequently Asked Questions | ConOps Global Managed Workforce',
        desc: 'Answers about pricing ($375-$1,200/wk), candidate vetting, US time zone overlap, IP protection, NDAs, and Procore software integration.'
      },
      '/faqs': {
        title: 'Frequently Asked Questions | ConOps Global Managed Workforce',
        desc: 'Answers about pricing ($375-$1,200/wk), candidate vetting, US time zone overlap, IP protection, NDAs, and Procore software integration.'
      },
      '/contact': {
        title: 'Contact Our Advisory Team | ConOps Global',
        desc: 'Schedule an executive briefing or consult with Amit Gole and the ConOps Global team on scaling your civil engineering and construction workforce.'
      },
      '/careers': {
        title: 'Careers & Global Opportunities | ConOps Global',
        desc: 'Explore engineering, estimating, and management career opportunities with ConOps Global across India and the US.'
      },
      '/media': {
        title: 'Press & Media Resources | ConOps Global',
        desc: 'Media announcements, press kit, and industry insights from ConOps Global and founder Amit Gole.'
      }
    };

    const currentSeo = routeSeo[currentPath] || routeSeo['/'];
    document.title = currentSeo.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', currentSeo.desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.desc);

    // Refresh ScrollTrigger when path changes and DOM might have updated
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentPath]);


  const renderPage = () => {
    switch (currentPath) {
      case '/services':
        return <ServicesPage />;
      case '/about':
        return <AboutPage />;
      case '/construction':
      case '/services/construction':
        return <ConstructionPage />;
      case '/faq':
      case '/faqs':
        return <FaqPage />;
      case '/contact':
        return <ContactPage />;
      case '/careers':
        return <CareersPage />;
      case '/media':
        return <MediaPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Navbar />
      {renderPage()}
      <Footer />
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
    </>

  );
}

export default App;
