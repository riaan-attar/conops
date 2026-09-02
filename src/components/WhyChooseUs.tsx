import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import handshakeImg from '../assets/why_choose_us.jpg';
import '../styles/WhyChooseUs.css';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const features: FeatureItem[] = [
  {
    id: 'expertise',
    number: '01',
    tag: 'Proven Track Record',
    title: 'Proven Hiring Expertise',
    desc: 'Decades of combined recruiting experience ensure you get candidates who truly fit your culture and goals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 4.5L18 4L18.5 7.5L21.5 9L20.5 12.5L22 15.5L19 17.5L18 21L14.5 20.5L12 23L9.5 20.5L6 21L5 17.5L2 15.5L3.5 12.5L2.5 9L5.5 7.5L6 4L9.5 4.5L12 2Z" fill="var(--primary)" />
        <path d="M8.5 12L11 14.5L15.5 9.5" stroke="#1b2f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'time',
    number: '02',
    tag: '45% Faster Turnaround',
    title: 'Faster Time-to-Hire',
    desc: 'Our streamlined process reduces hiring bottlenecks so you can fill roles quickly without sacrificing quality.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 16.5C3.5 14.5 3 13 3 13L7 9L11 13L7 17C7 17 5.5 17.5 4.5 16.5Z" fill="var(--primary)" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="var(--primary)" />
        <circle cx="15" cy="9" r="1.5" fill="#1b2f04" />
      </svg>
    )
  },
  {
    id: 'quality',
    number: '03',
    tag: 'Top 3% Vetted Talent',
    title: 'Quality-Driven Matching',
    desc: 'Every candidate is pre-vetted, skills-tested, and aligned with your organizational needs.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="var(--primary)" />
        <path d="M9 12l2 2 4-4" stroke="#1b2f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'knowledge',
    number: '04',
    tag: 'Domain Specialists',
    title: 'Industry-Specific Knowledge',
    desc: 'We understand your field—allowing us to source talent that performs from day one.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" fill="var(--primary)" />
        <path d="M9 19h6M10 22h4" stroke="#1b2f04" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="6" x2="12" y2="12" stroke="#1b2f04" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="14" r="1" fill="#1b2f04" />
      </svg>
    )
  },
  {
    id: 'communication',
    number: '05',
    tag: 'Real-Time Updates',
    title: 'Transparent Communication',
    desc: 'Clear updates at every stage, so you always know where things stand — from initial search to final offer.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="var(--primary)" />
        <circle cx="8" cy="11.5" r="1.2" fill="#1b2f04" />
        <circle cx="12" cy="11.5" r="1.2" fill="#1b2f04" />
        <circle cx="16" cy="11.5" r="1.2" fill="#1b2f04" />
      </svg>
    )
  }
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Add scroll-triggered scale effects on stacked cards
      if (cardsRef.current) {
        const cardElements = cardsRef.current.querySelectorAll('.why-us-stack-card');
        cardElements.forEach((card, i) => {
          if (i < cardElements.length - 1) {
            const nextCard = cardElements[i + 1];
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.85,
              ease: 'none',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 70%',
                end: 'top 30%',
                scrub: true
              }
            });
          }
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-us-section">
      <div className="container why-us-container">
        <div ref={headerRef} className="why-us-header">
          <div className="label">
            <div className="label-square"></div>
            <span>Why Choose Us</span>
          </div>
          <h2 className="section-title why-us-heading">
            Why ConOps Global<br />Stands Out
          </h2>
        </div>

        <div className="why-us-content-grid">
          <div ref={imageRef} className="why-us-media-col">
            <div className="why-us-image-wrapper">
              <img 
                src={handshakeImg} 
                alt="Partnership Handshake" 
                className="why-us-img"
              />
              <div className="why-us-img-badge">
                <span className="badge-highlight">100%</span>
                <span className="badge-text">Dedicated Partnership</span>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className="why-us-cards-stack-col">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className="why-us-stack-card"
                style={{
                  '--card-index': index,
                  top: `calc(120px + ${index * 24}px)`,
                  zIndex: index + 1
                } as React.CSSProperties}
              >
                <div className="why-us-card-top-row">
                  <div className="why-us-card-icon-box">
                    {feature.icon}
                  </div>
                  <div className="why-us-card-meta">
                    <span className="why-us-tag-pill">{feature.tag}</span>
                    <span className="why-us-number-badge">{feature.number}</span>
                  </div>
                </div>

                <div className="why-us-card-body">
                  <h3 className="why-us-card-title">{feature.title}</h3>
                  <p className="why-us-card-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
