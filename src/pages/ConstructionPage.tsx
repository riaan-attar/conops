import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceSectors from '../components/ServiceSectors';
import '../styles/ConstructionPage.css';

gsap.registerPlugin(ScrollTrigger);

interface ConstructionOffering {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  pricingTag: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  isFeatured?: boolean;
}

const activeOfferings: ConstructionOffering[] = [
  {
    id: 'concrete-estimation',
    number: '01',
    title: 'Concrete Estimation',
    tagline: 'Precision Quantity Takeoffs & Cost Modeling for Concrete Infrastructure',
    description: 'Comprehensive quantity takeoffs, rebar and formwork calculations, ready-mix volume estimates, and competitive bid sheet preparation tailored for US concrete contractors.',
    pricingTag: 'Starting at $375/week',
    features: [
      'Digital quantity takeoffs (Planswift, Bluebeam, OST)',
      'Rebar tonnage & formwork surface area calculations',
      'Ready-mix concrete volume & slump mix specs',
      'Labor productivity & margin structuring for US bids'
    ],
    image: '/images/service_recruiting.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )
  },
  {
    id: 'project-engineering-controls',
    number: '02',
    title: 'Project Engineering and Controls',
    tagline: 'Technical Submittals, RFI Tracking & CPM Schedule Management',
    description: 'Full-spectrum technical project support including RFI drafting, shop drawing submittals, Primavera P6/MS Project CPM schedule tracking, and specification compliance.',
    pricingTag: 'Starting at $375/week',
    features: [
      'RFI drafting, technical queries & log maintenance',
      'Submittal package preparation (mix designs & shop drawings)',
      'Primavera P6 & MS Project CPM schedule variance tracking',
      'Quality assurance & State DOT specification reviews'
    ],
    image: '/images/service_safety.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    )
  },
  {
    id: 'project-admin',
    number: '03',
    title: 'Project Admin',
    tagline: 'Procore Administration, Compliance & Back-Office Workflows',
    description: 'Dedicated construction administrative support to streamline field-to-office communication, Procore/Buildertrend management, subcontractor compliance, and AIA billing prep.',
    pricingTag: 'Starting at $375/week',
    features: [
      'Procore, Buildertrend & Autodesk Construction Cloud admin',
      'Subcontractor insurance, COI & lien waiver tracking',
      'Daily jobsite log aggregation & photo documentation',
      'AIA G702/G703 billing prep & invoice verification'
    ],
    image: '/images/service_equipment.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    id: 'offshore-pm',
    number: '04',
    title: 'Offshore PM (Includes Engineering, Controls and Admin)',
    tagline: 'Unified All-in-One Offshore Project Manager & Technical Engine',
    description: 'Our flagship integrated solution: a dedicated offshore Project Manager combining Project Engineering, Controls, and Administrative functions into a seamless, high-efficiency team extension.',
    pricingTag: 'Starting at $375/week',
    isFeatured: true,
    features: [
      'Complete integration of Engineering, Controls & Admin',
      'Dedicated full-time or part-time offshore PM resource',
      'Direct daily syncs with your onshore Superintendents & VPs',
      '85,500+ pre-vetted candidate database access'
    ],
    image: '/images/service_tech.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  }
];

const ConstructionPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const items = heroRef.current.querySelectorAll('.reveal-csp');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.csp-offer-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="construction-page">
      {/* Hero Section */}
      <section ref={heroRef} className="csp-hero">
        <div className="csp-hero-bg">
          <img 
            src="/images/services_hero.jpg" 
            alt="Construction & AEC Solutions" 
          />
          <div className="csp-hero-overlay"></div>
        </div>

        <div className="container csp-hero-container">
          <div className="csp-hero-content">
            <div className="label csp-hero-label reveal-csp">
              <span className="label-square light"></span>
              CONSTRUCTION & AEC ADVISORY
            </div>

            <h1 className="csp-hero-title reveal-csp">
              Offshore Construction & Engineering Support
            </h1>

            <p className="csp-hero-desc reveal-csp">
              Scale your construction firm faster and cheaper with pre-vetted estimators, project engineers, Procore admins, and offshore Project Managers from India — starting at <strong className="csp-highlight-price">$375/week</strong>.
            </p>

            <div className="csp-hero-stats reveal-csp">
              <div className="csp-stat-box">
                <strong>85,500+</strong>
                <span>Candidate Database</span>
              </div>
              <div className="csp-stat-divider"></div>
              <div className="csp-stat-box">
                <strong>7-14 Days</strong>
                <span>Delivery / Time to Hire</span>
              </div>
              <div className="csp-stat-divider"></div>
              <div className="csp-stat-box">
                <strong>$375/wk</strong>
                <span>Starting Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Offerings Grid */}
      <section ref={gridRef} className="csp-offerings-section">
        <div className="container">
          <div className="csp-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>CURRENTLY OFFERED SERVICES</span>
            </div>
            <h2 className="csp-section-title">Active Construction Solutions</h2>
            <p className="csp-section-subtitle">
              We currently specialize in 4 core construction support offerings designed to remove operational bottlenecks from your onshore superintendents and project executives.
            </p>
          </div>

          <div className="csp-offerings-grid">
            {activeOfferings.map((offering) => (
              <div 
                key={offering.id} 
                className={`csp-offer-card ${offering.isFeatured ? 'featured-offer-card' : ''}`}
              >
                {offering.isFeatured && (
                  <div className="featured-top-badge">
                    <span>FLAGSHIP ALL-IN-ONE SOLUTION</span>
                  </div>
                )}

                <div className="csp-card-top">
                  <div className="csp-card-num-row">
                    <span className="csp-num-badge">{offering.number}</span>
                    <span className="csp-price-tag">{offering.pricingTag}</span>
                  </div>
                  <div className="csp-card-title-row">
                    <div className="csp-icon-wrapper">{offering.icon}</div>
                    <h3 className="csp-card-title">{offering.title}</h3>
                  </div>
                  <p className="csp-card-tagline">{offering.tagline}</p>
                </div>

                <div className="csp-card-image-wrap">
                  <img src={offering.image} alt={offering.title} loading="lazy" />
                  <div className="csp-card-img-scrim"></div>
                </div>

                <div className="csp-card-body">
                  <p className="csp-card-desc">{offering.description}</p>
                  
                  <div className="csp-features-wrap">
                    <h4 className="csp-features-heading">Scope & Capabilities:</h4>
                    <ul className="csp-features-list">
                      {offering.features.map((feat, idx) => (
                        <li key={idx}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="csp-card-footer">
                  <a href={`/contact?service=${offering.id}`} className="btn btn-primary csp-card-btn">
                    Inquire for {offering.title}
                    <div className="icon-box">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sectors Navigator */}
      <ServiceSectors />

      {/* Construction CTA Section */}
      <section className="csp-cta-section">
        <div className="container">
          <div className="csp-cta-box">
            <div className="csp-cta-content">
              <div className="label">
                <div className="label-square"></div>
                <span>GET STARTED THIS WEEK</span>
              </div>
              <h2 className="csp-cta-title">Ready to Onboard Your Construction Team Extension?</h2>
              <p className="csp-cta-desc">
                Deploy estimators, project engineers, and Procore administrators in 7 to 14 days starting at just $375/week.
              </p>
              <a href="/contact" className="btn btn-primary csp-cta-btn">
                Schedule a Construction Briefing
                <div className="icon-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;
