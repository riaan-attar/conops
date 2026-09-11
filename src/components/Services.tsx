import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Services.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  details: string;
  image: string;
  link: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'executive-search',
    number: '01',
    category: 'Executive Search',
    title: 'Executive Search',
    tagline: "Find leaders who shape your company's future.",
    details: 'Targeted headhunting for C-suite and VP-level executives with precision culture matching and rigorous leadership assessment.',
    image: 'https://framerusercontent.com/images/yzE85ebgJh3YuomISMRuqz2Yiw4.jpg?width=2000&height=1333',
    link: '/services/executive-search'
  },
  {
    id: 'professional-recruitment',
    number: '02',
    category: 'Recruitment',
    title: 'Professional Recruitment',
    tagline: 'From entry-level talent to seasoned experts.',
    details: 'End-to-end recruitment for high-impact specialized roles across tech, operations, product, and finance.',
    image: 'https://framerusercontent.com/images/WebNxmpxaoNoZwSGnWFLjHmBKM.jpg?width=2000&height=1333',
    link: '/services/professional-recruitment'
  },
  {
    id: 'contract-staffing',
    number: '03',
    category: 'Staffing Solutions',
    title: 'Contract Staffing',
    tagline: 'Flexible people solutions—exactly when you need them.',
    details: 'Agile workforce scaling with pre-vetted contractors, interim leaders, and specialized project teams ready to deliver.',
    image: 'https://framerusercontent.com/images/TuJ1CJwRxAmL4iXoabS1ZZr57h0.jpg?width=2000&height=1333',
    link: '/services/contract-staffing'
  },
  {
    id: 'talent-strategy-consulting',
    number: '04',
    category: 'Consulting',
    title: 'Talent Strategy Consulting',
    tagline: 'Optimize your hiring process with proven methods.',
    details: 'Data-backed organizational design, employer branding, compensation benchmarking, and talent retention strategies.',
    image: 'https://framerusercontent.com/images/hYQ2qYxLPoQ1o0LzB7Sl6gTKFhE.jpg?width=2000&height=1333',
    link: '/services/talent-strategy-consulting'
  },
  {
    id: 'global-workforce-solutions',
    number: '05',
    category: 'Global Solutions',
    title: 'Global Workforce Solutions',
    tagline: 'Scale borderless teams with agility and compliance.',
    details: 'International recruitment, employer of record navigation, global talent mobility, and cross-border workforce integration built for rapid expansion.',
    image: 'https://framerusercontent.com/images/RA0jh2y68ywQWHWWQpomMWQ9E.jpg?width=1200&height=1260',
    link: '/services/global-workforce-solutions'
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressThumbRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stage = stageRef.current;
    if (!section || !header || !stage) return;

    const ctx = gsap.context(() => {
      // 1. Scroll Reveal Animation for Header elements
      const revealItems = header.querySelectorAll('.reveal-item');
      if (revealItems.length > 0) {
        gsap.fromTo(
          revealItems,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. Initial Entrance Reveal for Cards Stage (Clean, No Card Transform Glitch)
      if (stage) {
        gsap.fromTo(
          stage,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 3. Smooth Horizontal Parallax Stacking Timeline
      const cards = stage.querySelectorAll<HTMLElement>('.service-horizontal-card');
      if (cards.length === 0) return;

      const numCards = cards.length;
      const transitionsCount = numCards - 1;
      const dwellDuration = 1.0; // Generous hold duration so the 5th card remains fully visible and pinned

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'services-scroll',
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // Silky smooth scrubbing with physics momentum
          onUpdate: (self) => {
            const rawProgress = self.progress;
            // Map progress evenly across all 5 cards
            const idx = Math.min(
              numCards - 1,
              Math.max(0, Math.floor(rawProgress * numCards))
            );
            setCurrentIndex(idx);

            if (progressThumbRef.current) {
              progressThumbRef.current.style.width = `${Math.max(8, self.progress * 100)}%`;
            }
          },
        },
      });

      // Initialize starting positions in exact strict sequence
      // Card 0 is centered at xPercent: 0, zIndex: 10
      // Cards 1..4 start safely off-screen to the right with ascending z-index so incoming cards always layer on top
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, {
            xPercent: 105,
            scale: 1,
            opacity: 1,
            zIndex: 10 + i * 5,
          });
        } else {
          gsap.set(card, {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
          });
        }
      });

      // Build sequential transitions between cards in strict order
      for (let i = 1; i < numCards; i++) {
        const incomingCard = cards[i];
        const incomingImg = incomingCard.querySelector('.service-parallax-img');
        const timeStart = i - 1;

        // Incoming card slides into position from the right cleanly
        tl.to(
          incomingCard,
          {
            xPercent: 0,
            ease: 'none',
            duration: 1,
          },
          timeStart
        );

        // Internal image counter-parallax
        if (incomingImg) {
          tl.fromTo(
            incomingImg,
            { xPercent: 8 },
            { xPercent: 0, ease: 'none', duration: 1 },
            timeStart
          );
        }

        // Preceding cards stack underneath, staying 100% visible and bright (no black screen or filter)
        for (let prev = 0; prev < i; prev++) {
          const prevCard = cards[prev];
          const prevImg = prevCard.querySelector('.service-parallax-img');
          const depth = i - prev;
          const targetX = -Math.min(depth * 4, 16);
          const targetScale = Math.max(0.93, 1 - depth * 0.02);

          tl.to(
            prevCard,
            {
              xPercent: targetX,
              scale: targetScale,
              ease: 'none',
              duration: 1,
            },
            timeStart
          );

          if (prevImg) {
            tl.to(
              prevImg,
              {
                xPercent: -depth * 3,
                ease: 'none',
                duration: 1,
              },
              timeStart
            );
          }
        }
      }

      // Hold the 5th card pinned and completely visible at the end of scroll
      tl.to({}, { duration: dwellDuration }, transitionsCount);
    }, section);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const scrollToCard = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollTop;
    const scrollDistance = section.offsetHeight - window.innerHeight;

    // Distribute targets so clicking arrow/card scrolls directly to that card
    const targetProgress = index === 0 
      ? 0 
      : index === servicesData.length - 1 
        ? 0.95 
        : (index + 0.3) / servicesData.length;
    const targetScrollY = sectionTop + targetProgress * scrollDistance;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScrollY, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="services-parallax-section">
      <div className="services-sticky-wrapper">
        {/* Top Header Bar with Scroll Reveal */}
        <div ref={headerRef} className="services-header-bar">
          <div className="container services-header-inner">
            <div className="services-title-col">
              <div className="label reveal-item">
                <div className="label-square"></div>
                <span>Our Services</span>
              </div>
              <h2 className="section-title services-heading reveal-item">
                Smart Hiring Solutions Built for Growth
              </h2>
            </div>

            <div className="services-controls-col">
              <p className="section-desc services-sub reveal-item">
                At ConOps Global, we provide end-to-end recruitment solutions designed to help companies scale with confidence.
              </p>
              <div className="services-nav-actions reveal-item">
                <a href="/contact" className="btn btn-primary services-btn">
                  Start Work with Us
                  <div className="icon-box">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>

                <div className="services-nav-arrows">
                  <button 
                    onClick={() => scrollToCard(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    className="nav-arrow-btn"
                    aria-label="Previous service"
                    title="Previous service"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                  <span className="services-counter">
                    <strong>0{currentIndex + 1}</strong> / 0{servicesData.length}
                  </span>
                  <button 
                    onClick={() => scrollToCard(Math.min(servicesData.length - 1, currentIndex + 1))}
                    disabled={currentIndex === servicesData.length - 1}
                    className="nav-arrow-btn"
                    aria-label="Next service"
                    title="Next service"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flat Horizontal Cards Parallax Stacking Stage */}
        <div className="services-stage-container">
          <div ref={stageRef} className="services-cards-stage">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className={`service-horizontal-card ${index === currentIndex ? 'active-card' : ''}`}
              >
                {/* Left Content Column */}
                <div className="service-card-left">
                  <div className="service-card-meta">
                    <div className="service-badge-group">
                      <span className="service-num-badge">{service.number}</span>
                      <span className="service-category-badge">{service.category}</span>
                    </div>
                    <span className="service-status-pill">
                      <span className="pulsing-green-dot"></span>
                      Consultancy Solution
                    </span>
                  </div>

                  <div className="service-card-main">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-tagline">{service.tagline}</p>
                    <p className="service-card-details">{service.details}</p>
                  </div>

                  <div className="service-card-footer">
                    <a href={service.link} className="service-cta-btn">
                      <span>Explore Solution</span>
                      <div className="cta-arrow-circle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </a>
                    <span className="service-step-label">Service 0{index + 1} of 0{servicesData.length}</span>
                  </div>
                </div>

                {/* Right Media Column */}
                <div className="service-card-right">
                  <div className="service-img-wrapper">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="service-parallax-img"
                    />
                    <div className="service-img-scrim"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="services-bottom-controls">
          <div className="container services-bottom-inner">
            <div className="services-progress-track">
              <div 
                ref={progressThumbRef}
                className="services-progress-thumb"
                style={{ width: '8%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
