import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceSectors from '../components/ServiceSectors';
import '../styles/ServicesPage.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceOfferItem {
  id: string;
  number: string;
  category: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  link: string;
  icon: React.ReactNode;
}

const servicesData: ServiceOfferItem[] = [
  {
    id: 'operations-optimization',
    number: '01',
    category: 'Operations',
    title: 'Operations & Crew Optimization',
    desc: "Strategic workforce planning to maximize equipment utilization and crew efficiency on asphalt and concrete jobsites.",
    features: [
      'Fleet & equipment utilization analysis',
      'Labor productivity tracking & routing',
      'Bottleneck identification & workflow optimization'
    ],
    cta: 'Optimize My Operations',
    link: '/contact?service=operations-optimization',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  },
  {
    id: 'bidding-estimating',
    number: '02',
    category: 'Estimating',
    title: 'Bidding & Estimating Consultation',
    desc: 'Refining your estimating processes and project costing models to win more profitable paving and concrete contracts.',
    features: [
      'Takeoff accuracy review & coaching',
      'Cost margin structuring for competitive markets',
      'Strategic bid pipeline management'
    ],
    cta: 'Improve My Estimating',
    link: '/contact?service=bidding-estimating',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"></rect>
        <line x1="8" y1="6" x2="16" y2="6"></line>
        <line x1="8" y1="10" x2="8" y2="10"></line>
        <line x1="12" y1="10" x2="12" y2="10"></line>
        <line x1="16" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="8" y2="14"></line>
        <line x1="12" y1="14" x2="12" y2="14"></line>
        <line x1="16" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="16" y2="18"></line>
      </svg>
    )
  },
  {
    id: 'leadership-advisory',
    number: '03',
    category: 'Advisory',
    title: 'Leadership & Executive Advisory',
    desc: 'Targeted executive guidance and succession planning to build resilient leadership within your contracting firm.',
    features: [
      'Executive succession & transition planning',
      'C-Suite talent mapping & acquisition',
      'Organizational restructuring & scaling strategy'
    ],
    cta: 'Start Executive Search',
    link: '/contact?service=leadership-advisory',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"></path>
      </svg>
    )
  },
  {
    id: 'safety-compliance',
    number: '04',
    category: 'Safety',
    title: 'Safety & Compliance Programs',
    desc: 'Developing comprehensive safety architectures to ensure compliance with OSHA and industry-specific site regulations.',
    features: [
      'Comprehensive OSHA audit preparation',
      'Custom site-specific safety program development',
      'Risk mitigation & hazard communication training'
    ],
    cta: 'Build My Safety Program',
    link: '/contact?service=safety-compliance',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    id: 'specialized-resourcing',
    number: '05',
    title: 'BIM & Field Technology Integration',
    category: 'Construction Tech',
    desc: 'Deploying GPS machine control, 3D modeling, and real-time field tracking to eliminate jobsite rework.',
    features: ['3D machine control setup', 'Drone site surveying', 'Real-time job cost tracking'],
    cta: 'Deploy Field Technology',
    link: '/services/tech',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  }
];

const ServicesPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Scroll Reveal
      if (heroRef.current) {
        const heroItems = heroRef.current.querySelectorAll('.reveal-hero');
        gsap.fromTo(
          heroItems,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. What We Offer Section Reveal
      if (offerRef.current) {
        const offerHeader = offerRef.current.querySelector('.sp-section-header');
        const offerCards = offerRef.current.querySelectorAll('.sp-offer-card');

        if (offerHeader) {
          gsap.fromTo(
            offerHeader,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: offerHeader,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (offerCards.length > 0) {
          offerCards.forEach((card) => {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0, scale: 0.97 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          });
        }
      }

      // 3. CTA Section Reveal
      if (ctaRef.current) {
        const ctaBox = ctaRef.current.querySelector('.sp-cta-container');
        if (ctaBox) {
          gsap.fromTo(
            ctaBox,
            { y: 35, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaBox,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }
    }, page);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="services-page">
      {/* Services Hero Section */}
      <section ref={heroRef} className="sp-hero">
        <div className="sp-hero-bg">
          <img 
            src="/images/services_hero.jpg" 
            alt="Consultancy Team" 
          />
          <div className="sp-hero-overlay"></div>
        </div>
        
        <div className="container sp-hero-container">
          <div className="sp-hero-content">
            <div className="label reveal-hero">
              <div className="label-square"></div>
              <span>INDUSTRY CONSULTANCY</span>
            </div>
            
            <h1 className="sp-hero-title reveal-hero">
              Strategic Consultancy for Concrete & Asphalt Contractors
            </h1>
            
            <p className="sp-hero-desc reveal-hero">
              Discover specialized consulting solutions designed to optimize operations, improve estimating, and build resilient leadership for the US paving and concrete industry.
            </p>

            <div className="sp-hero-actions reveal-hero">
              <a href="/contact" className="btn btn-primary sp-hero-btn">
                Consult With Us
                <div className="icon-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals / Service Sectors */}
      <ServiceSectors />

      {/* What We Offer Section */}
      <section ref={offerRef} className="sp-offer-section">
        <div className="container">
          <div className="sp-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>OUR EXPERTISE</span>
            </div>
            <h2 className="sp-section-title">Comprehensive Industry Solutions</h2>
            <p className="sp-section-subtitle">
              We provide end-to-end consulting designed to scale your contracting business with speed, safety, and operational excellence.
            </p>
          </div>
          
          <div className="sp-offer-grid">
            {servicesData.map((item) => (
              <div key={item.id} className="sp-offer-card">
                <div className="sp-offer-icon-box">
                  {item.icon}
                </div>

                <div className="sp-offer-card-text">
                  <h3 className="sp-offer-card-title">{item.title}</h3>
                  <p className="sp-offer-card-desc">{item.desc}</p>
                </div>

                <ul className="sp-offer-features">
                  {item.features.map((feat, i) => (
                    <li key={i}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href={item.link} className="sp-offer-btn">
                  {item.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="sp-cta-section">
        <div className="sp-cta-bg">
          <img 
            src="/images/services_hero.jpg" 
            alt="ConOps Services Operations" 
          />
          <div className="sp-cta-overlay"></div>
        </div>

        <div className="container sp-cta-container">
          <div className="sp-cta-content">
            <div className="label">
              <div className="label-square"></div>
              <span>GET STARTED</span>
            </div>
            <h2 className="sp-cta-title">
              Elevate Your Contracting Business
            </h2>
            <p className="sp-cta-desc">
              Partner with a specialized consultancy dedicated to the growth, safety, and operational excellence of US concrete and asphalt contractors.
            </p>
            <a href="/contact" className="btn btn-primary sp-cta-btn">
              Get Started Today
              <div className="icon-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
