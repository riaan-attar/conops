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
  image: string;
  link: string;
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
    image: '/images/service_operations.jpg',
    link: '/contact?service=operations-optimization'
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
    image: '/images/service_recruiting.jpg',
    link: '/contact?service=bidding-estimating'
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
    image: '/images/service_equipment.jpg',
    link: '/contact?service=leadership-advisory'
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
    image: '/images/service_safety.jpg',
    link: '/contact?service=safety-compliance'
  },
  {
    id: 'specialized-resourcing',
    number: '05',
    title: 'BIM & Field Technology Integration',
    category: 'Construction Tech',
    desc: 'Deploying GPS machine control, 3D modeling, and real-time field tracking to eliminate jobsite rework.',
    image: '/images/service_tech.jpg',
    features: ['3D machine control setup', 'Drone site surveying', 'Real-time job cost tracking'],
    link: '/services/tech'
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
                <div className="sp-offer-img-wrapper">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="sp-offer-img-overlay"></div>
                  <span className="sp-offer-num-badge">{item.number}</span>
                  <span className="sp-offer-cat-pill">{item.category}</span>
                </div>

                <div className="sp-offer-card-content">
                  <div className="sp-offer-card-text">
                    <h3 className="sp-offer-card-title">{item.title}</h3>
                    <p className="sp-offer-card-desc">{item.desc}</p>
                    <ul className="sp-offer-features">
                      {item.features.map((feat, i) => (
                        <li key={i}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a href={item.link} className="sp-offer-btn" aria-label={`Learn more about ${item.title}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
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
