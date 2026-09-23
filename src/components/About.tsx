import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      if (mainGridRef.current) {
        const leftCol = mainGridRef.current.querySelector('.trust-leader-col');
        const rightCards = mainGridRef.current.querySelectorAll('.trust-domain-card');

        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: mainGridRef.current,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }

        if (rightCards.length > 0) {
          gsap.fromTo(
            rightCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mainGridRef.current,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section trust-leadership-section">
      <div className="container about-container">
        {/* Header */}
        <div ref={headerRef} className="about-header">
          <div className="about-header-left">
            <div className="label">
              <div className="label-square"></div>
              <span>DOMINANT INDUSTRY TRUST</span>
            </div>
            <h2 className="section-title about-heading">
              Led by Hands-On US Civil Engineering Expertise
            </h2>
          </div>

          <div className="about-header-right">
            <p className="about-intro-text">
              We bring direct experience from US-based heavy civil infrastructure firms, specializing in asphalt paving operations, concrete mix design, and high-stakes project execution.
            </p>
            <a href="/about" className="btn btn-primary about-btn">
              Explore Our Founder's Story
              <div className="icon-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Main Trust Showcase Grid */}
        <div ref={mainGridRef} className="trust-showcase-grid">
          {/* Left Column: Amit's Executive Profile Monolith */}
          <div className="trust-leader-col">
            <div className="trust-leader-card">
              <div className="trust-leader-media">
                <img
                  src="/images/founder.jpeg"
                  alt="Amit - Civil Infrastructure Leader"
                  className="trust-leader-img"
                />
                <div className="trust-leader-overlay"></div>
              </div>

              <div className="trust-leader-badge">
                <span className="live-status-dot"></span>
                FOUNDER & MANAGING CONSULTANT
              </div>

              <div className="trust-leader-content">
                <div className="trust-leader-meta">
                  <h3 className="trust-leader-name">Amit</h3>
                  <p className="trust-leader-title">Civil Engineering & Infrastructure Specialist</p>
                </div>

                <div className="trust-credentials-pill">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  <span>US Infrastructure Firm Veteran • Asphalt & Concrete Operations</span>
                </div>

                <p className="trust-leader-bio">
                  Amit brings years of direct experience working inside prominent US-based civil engineering and heavy infrastructure firms. Having managed complex asphalt paving, batch plant logistics, and structural concrete projects, Amit understands contractor pain points firsthand.
                </p>

                <div className="trust-metrics-row">
                  <div className="trust-metric-item">
                    <strong>15+ Yrs</strong>
                    <span>US Firm Domain Experience</span>
                  </div>
                  <div className="trust-metric-item">
                    <strong>200+</strong>
                    <span>Paving & Concrete Projects</span>
                  </div>
                  <div className="trust-metric-item">
                    <strong>100%</strong>
                    <span>Technical Vetting Rigor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Technical Domain Pillars */}
          <div className="trust-pillars-col">
            <div className="trust-domain-card">
              <div className="trust-domain-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
              </div>
              <div className="trust-domain-body">
                <span className="trust-domain-tag">CORE COMPETENCY</span>
                <h4 className="trust-domain-title">Asphalt Paving & Plant Operations</h4>
                <p className="trust-domain-desc">
                  Deep technical familiarity with Hot Mix Asphalt (HMA), Superpave & Marshall mix specs, batch plant operations, asphalt milling, resurfacing, and paving crew optimization across US highway projects.
                </p>
              </div>
            </div>

            <div className="trust-domain-card">
              <div className="trust-domain-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <div className="trust-domain-body">
                <span className="trust-domain-tag">MATERIAL EXCELLENCE</span>
                <h4 className="trust-domain-title">Concrete & Heavy Structural Engineering</h4>
                <p className="trust-domain-desc">
                  Firsthand experience in ready-mix batching, high-performance concrete placement, slump testing, structural pours for bridges & foundations, and ASTM/AASHTO quality compliance.
                </p>
              </div>
            </div>

            <div className="trust-domain-card">
              <div className="trust-domain-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div className="trust-domain-body">
                <span className="trust-domain-tag">REGULATORY ACCURACY</span>
                <h4 className="trust-domain-title">US Contracting & DOT Standards</h4>
                <p className="trust-domain-desc">
                  Comprehensive mastery of State Department of Transportation (DOT) project standards, OSHA safety frameworks, heavy civil bidding, and jobsite labor compliance.
                </p>
              </div>
            </div>

            <div className="trust-domain-card">
              <div className="trust-domain-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="trust-domain-body">
                <span className="trust-domain-tag">FIELD-TESTED MATCHING</span>
                <h4 className="trust-domain-title">Uncompromising Technical Talent Vetting</h4>
                <p className="trust-domain-desc">
                  Because Amit understands civil engineering from the inside out, we evaluate candidates on actual technical capability — delivering Project Engineers, Superintendents, and Estimators ready to perform immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Quote Banner */}
        <div className="trust-quote-banner">
          <div className="trust-quote-content">
            <svg className="quote-mark-icon" width="36" height="36" viewBox="0 0 24 24" fill="var(--primary)" opacity="0.4">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="trust-quote-text">
              "In civil infrastructure and material operations, generic recruiting fails. Having worked inside US-based contracting firms, I built ConOps Global to bridge the gap between technical rigor and strategic human capital."
            </p>
            <div className="trust-quote-author">
              <strong>Amit</strong>
              <span>Founder & Principal Civil Infrastructure Consultant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
