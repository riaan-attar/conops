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
    title: 'Executive & Leadership Search',
    tagline: 'Find leaders who master heavy civil and infrastructure operations.',
    details: 'Targeted executive search for Vice Presidents, General Managers, and Operations Directors with deep US asphalt, concrete, and heavy civil contracting experience.',
    image: '/images/service_recruiting.jpg',
    link: '/services/executive-search'
  },
  {
    id: 'professional-recruitment',
    number: '02',
    category: 'Recruitment',
    title: 'Asphalt & Concrete Specialist Hiring',
    tagline: 'Superintendents, Estimators & Plant Managers.',
    details: 'End-to-end recruitment for specialized civil engineering roles including Hot Mix Asphalt plant managers, Superpave quality control leads, and concrete batch superintendents.',
    image: '/images/service_operations.jpg',
    link: '/services/professional-recruitment'
  },
  {
    id: 'contract-staffing',
    number: '03',
    category: 'Staffing Solutions',
    title: 'Project Crew & Contract Resourcing',
    tagline: 'Flexible workforce scaling for peak paving seasons.',
    details: 'Agile workforce mobilization delivering pre-vetted field engineers, quality control technicians, and site supervisors ready for immediate deployment.',
    image: '/images/service_equipment.jpg',
    link: '/services/contract-staffing'
  },
  {
    id: 'talent-strategy-consulting',
    number: '04',
    category: 'Consulting',
    title: 'Operations & Bidding Consultancy',
    tagline: 'Optimize estimating workflows and jobsite productivity.',
    details: 'Consultative guidance from US firm veterans to streamline bid estimation, crew routing, equipment utilization, and OSHA/DOT compliance.',
    image: '/images/service_safety.jpg',
    link: '/services/talent-strategy-consulting'
  },
  {
    id: 'global-workforce-solutions',
    number: '05',
    category: 'Global Solutions',
    title: 'Civil Infrastructure Talent Mobility',
    tagline: 'Connecting US contractors with world-class engineering talent.',
    details: 'Specialized cross-border talent acquisition bringing experienced material engineers and heavy civil project leaders to top US infrastructure firms.',
    image: '/images/service_tech.jpg',
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
              start: 'top 92%',
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
              start: 'top 92%',
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
      const dwellDuration = 0.2; // Snappy hold: 5th card settles nicely without lingering or causing a long scroll
      const totalUnits = transitionsCount + dwellDuration;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'services-scroll',
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // Silky smooth scrubbing with physics momentum
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const currentUnit = rawProgress * totalUnits;
            const idx = Math.min(
              numCards - 1,
              Math.max(0, Math.floor(currentUnit + 0.5))
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
            height: '100%',
          });
        } else {
          gsap.set(card, {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
            height: '100%',
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

        // Preceding cards stay stationary at full size directly beneath incoming card
        // No scale-down or negative x-shift so no edges peak out like a shadow
        for (let prev = 0; prev < i; prev++) {
          const prevCard = cards[prev];
          tl.set(
            prevCard,
            {
              xPercent: 0,
              scale: 1,
            },
            timeStart
          );
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
    const totalUnits = (servicesData.length - 1) + 0.2;
    const targetProgress = index === 0 
      ? 0 
      : index === servicesData.length - 1 
        ? 0.98 
        : index / totalUnits;
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
                Smart Solutions Built for Growth
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
