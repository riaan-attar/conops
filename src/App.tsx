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
        title: 'ConOps Global | Founded by Amit Gole — Managed Remote Workforce & Construction Talent',
        desc: 'Founded by Amit Gole, ConOps Global delivers managed remote civil engineering, concrete estimating, project controls, and Procore administration for US contractors starting at $375/week.'
      },
      '/services': {
        title: 'Strategic Industry Services & Talent Solutions | ConOps Global & Amit Gole',
        desc: 'Full-cycle engineering, estimating, safety compliance, and operational optimization consulting for concrete and asphalt contractors led by Amit Gole.'
      },
      '/construction': {
        title: 'Offshore Construction & Engineering Support ($375/wk) | ConOps Global — Amit Gole',
        desc: 'Pre-vetted concrete estimators, project engineering controls, Procore admins, and offshore Project Managers founded by Amit Gole starting at $375/week.'
      },
      '/services/construction': {
        title: 'Offshore Construction & Engineering Support ($375/wk) | ConOps Global — Amit Gole',
        desc: 'Pre-vetted concrete estimators, project engineering controls, Procore admins, and offshore Project Managers founded by Amit Gole starting at $375/week.'
      },
      '/about': {
        title: 'About Amit Gole & ConOps Global | Civil Infrastructure & Leadership',
        desc: 'Meet founder Amit Gole and discover how 15+ years of US civil engineering, asphalt, and concrete operations experience shapes ConOps Global\'s talent consultancy.'
      },
      '/faq': {
        title: 'Frequently Asked Questions | ConOps Global & Amit Gole Managed Workforce',
        desc: 'Answers about ConOps Global, founder Amit Gole, pricing ($375-$1,200/wk), candidate vetting, US time zone overlap, IP protection, and Procore software integration.'
      },
      '/faqs': {
        title: 'Frequently Asked Questions | ConOps Global & Amit Gole Managed Workforce',
        desc: 'Answers about ConOps Global, founder Amit Gole, pricing ($375-$1,200/wk), candidate vetting, US time zone overlap, IP protection, and Procore software integration.'
      },
      '/contact': {
        title: 'Contact Amit Gole & Executive Advisory Team | ConOps Global',
        desc: 'Schedule an executive briefing or consult with founder Amit Gole and the ConOps Global team on scaling your civil engineering and construction workforce.'
      },
      '/careers': {
        title: 'Careers & Global Engineering Opportunities | ConOps Global — Amit Gole',
        desc: 'Explore engineering, estimating, and management career opportunities with ConOps Global and founder Amit Gole across India and the US.'
      },
      '/media': {
        title: 'Press, Media Kit & Executive Bio | Amit Gole & ConOps Global',
        desc: 'Official press resources, executive bio for Amit Gole, company fact sheet, and media announcements from ConOps Global.'
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

    const fullUrl = `https://www.conopsglobal.com${currentPath === '/' ? '/' : currentPath}`;

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentSeo.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', currentSeo.desc);

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', fullUrl);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', fullUrl);

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
