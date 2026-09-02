import React, { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  details: string;
  tags: string[];
  image: string;
  link: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'executive-search',
    number: '01',
    title: 'Executive Search',
    desc: "Find leaders who shape your company's future.",
    details: 'Targeted headhunting for C-suite and VP-level executives with precision culture matching.',
    tags: ['C-Suite', 'VP Roles', 'Confidential'],
    image: 'https://framerusercontent.com/images/yzE85ebgJh3YuomISMRuqz2Yiw4.jpg?width=2000&height=1333',
    link: '/services/executive-search'
  },
  {
    id: 'professional-recruitment',
    number: '02',
    title: 'Professional Recruitment',
    desc: 'From entry-level talent to seasoned experts.',
    details: 'End-to-end recruitment for high-impact specialized roles across tech, operations, and finance.',
    tags: ['Tech & Product', 'Operations', 'Finance'],
    image: 'https://framerusercontent.com/images/WebNxmpxaoNoZwSGnWFLjHmBKM.jpg?width=2000&height=1333',
    link: '/services/professional-recruitment'
  },
  {
    id: 'contract-staffing',
    number: '03',
    title: 'Contract Staffing',
    desc: 'Flexible HR solutions—exactly when you need them.',
    details: 'Agile workforce scaling with pre-vetted contractors, interim leaders, and project teams.',
    tags: ['Agile Teams', 'Interim Roles', 'Rapid Scale'],
    image: 'https://framerusercontent.com/images/TuJ1CJwRxAmL4iXoabS1ZZr57h0.jpg?width=2000&height=1333',
    link: '/services/contract-staffing'
  },
  {
    id: 'talent-strategy-consulting',
    number: '04',
    title: 'Talent Strategy Consulting',
    desc: 'Optimize your hiring process with proven methods.',
    details: 'Data-backed organizational design, employer branding, compensation benchmarking, and retention.',
    tags: ['Retention', 'Comp Analysis', 'Process Audit'],
    image: 'https://framerusercontent.com/images/hYQ2qYxLPoQ1o0LzB7Sl6gTKFhE.jpg?width=2000&height=1333',
    link: '/services/talent-strategy-consulting'
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowH;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollable;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clampedProgress);

      const trackWidth = track.scrollWidth;
      const windowW = window.innerWidth;
      // Calculate how far track should translate so all cards are viewable
      const maxTranslate = Math.max(0, trackWidth - windowW + 96);
      const newTranslateX = clampedProgress * maxTranslate;
      setTranslateX(newTranslateX);

      // Determine active index
      const activeIdx = Math.min(
        servicesData.length - 1,
        Math.floor(clampedProgress * servicesData.length)
      );
      setCurrentIndex(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetProgress = index / (servicesData.length - 1);
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = containerTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="services-parallax-section">
      <div className="services-sticky-wrapper">
        <div className="services-header-bar">
          <div className="container services-header-inner">
            <div className="services-title-col">
              <div className="label">
                <div className="label-square"></div>
                <span>Our Services</span>
              </div>
              <h2 className="section-title services-heading">
                Smart Hiring Solutions Built for Growth
              </h2>
            </div>

            <div className="services-controls-col">
              <p className="section-desc services-sub">
                At ConOps Global, we provide end-to-end recruitment solutions designed to help companies scale with confidence.
              </p>
              <div className="services-nav-actions">
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

        <div className="services-track-container">
          <div 
            ref={trackRef} 
            className="services-horizontal-track"
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {servicesData.map((service, index) => {
              const cardOffset = index / (servicesData.length - 1);
              const parallaxShift = (progress - cardOffset) * 60;

              return (
                <a 
                  key={service.id} 
                  href={service.link} 
                  className={`service-parallax-card ${index === currentIndex ? 'active-card' : ''}`}
                >
                  <div className="service-card-media">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="parallax-img"
                      style={{
                        transform: `scale(1.15) translateX(${parallaxShift}px)`
                      }}
                    />
                    <div className="service-card-scrim"></div>
                  </div>

                  <div className="service-card-top">
                    <span className="service-card-badge">{service.number}</span>
                    <div className="service-tag-pill">{service.tags[0]}</div>
                  </div>

                  <div className="service-card-bottom">
                    <div className="service-card-info">
                      <div className="service-tags-row">
                        {service.tags.map((t, idx) => (
                          <span key={idx} className="service-mini-tag">{t}</span>
                        ))}
                      </div>
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-desc">{service.desc}</p>
                    </div>

                    <div className="service-card-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="services-progress-wrapper">
          <div className="services-progress-track">
            <div 
              className="services-progress-thumb"
              style={{ width: `${Math.max(10, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
