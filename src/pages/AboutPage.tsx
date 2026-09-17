import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Amit Gole',
    role: 'Managing Director & Founder',
    category: 'US Infrastructure Lead',
    image: '/images/team_1.jpg'
  },
  {
    id: '2',
    name: 'Sarah J. Thompson',
    role: 'VP of Operations Advisory',
    category: 'Asphalt & Civil Ops',
    image: '/images/team_2.jpg'
  },
  {
    id: '3',
    name: 'David Mitchell',
    role: 'Chief Safety & Compliance Officer',
    category: 'OSHA & DOT Safety',
    image: '/images/team_3.jpg'
  },
  {
    id: '4',
    name: 'Elena Rostova',
    role: 'Director of Talent Acquisition',
    category: 'Technical Recruiting',
    image: '/images/team_4.jpg'
  },
  {
    id: '5',
    name: 'Marcus Vance',
    role: 'Fleet & Asset Optimization Lead',
    category: 'Heavy Equipment',
    image: '/images/service_equipment.jpg'
  },
  {
    id: '6',
    name: 'Rachel Chen',
    role: 'Strategic Technology Lead',
    category: 'BIM & Field Tech',
    image: '/images/service_tech.jpg'
  }
];

interface StatItem {
  target: number;
  suffix: string;
  prefix?: string;
  value: string;
  label: string;
  duration?: number;
}

const statsData: StatItem[] = [
  { target: 98, suffix: '%', value: '98%', label: 'Client Retention Rate', duration: 1.8 },
  { target: 500, suffix: '+', value: '500+', label: 'Executive & Key Placements', duration: 2.0 },
  { target: 15, suffix: '+', value: '15+', label: 'Specialized Industry Sectors', duration: 1.6 },
  { target: 14, suffix: ' Days', value: '14 Days', label: 'Average Shortlist Delivery', duration: 1.6 }
];

const credentialsData = [
  'SHRM Certified Strategic Partner',
  'Top 100 Global Talent Consultancy',
  'Diversity & Inclusion Certified',
  'Executive Search Accredited'
];

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const credentialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Reveal (Who We Are)
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

      // 2. High-Emphasis Founder Section Reveal (Directly After Who We Are)
      if (founderRef.current) {
        const card = founderRef.current.querySelector('.ap-founder-card');
        const img = founderRef.current.querySelector('.ap-founder-img');
        const contentItems = founderRef.current.querySelectorAll('.reveal-founder');
        const pillarCards = founderRef.current.querySelectorAll('.ap-pillar-card');
        const milestonePills = founderRef.current.querySelectorAll('.ap-milestone-pill');

        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Subtle Parallax on the Founder Portrait image
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            );
          }
        }

        if (contentItems.length > 0) {
          gsap.fromTo(
            contentItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentItems[0],
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (pillarCards.length > 0) {
          gsap.fromTo(
            pillarCards,
            { y: 30, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: pillarCards[0],
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (milestonePills.length > 0) {
          gsap.fromTo(
            milestonePills,
            { y: 20, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: milestonePills[0],
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 3. Mission Section Reveal
      if (missionRef.current) {
        const logo = missionRef.current.querySelector('.ap-mission-logo');
        const text = missionRef.current.querySelector('.ap-mission-text');

        if (logo) {
          gsap.fromTo(
            logo,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: missionRef.current,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: text,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 4. Our Story Section Reveal
      if (storyRef.current) {
        const img = storyRef.current.querySelector('.ap-story-img');
        const text = storyRef.current.querySelector('.ap-story-text');

        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.94, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text.children,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: text,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 5. Stats Section Reveal
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.ap-stat-item');
        if (statItems.length > 0) {
          gsap.fromTo(
            statItems,
            { y: 35, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statItems[0],
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 6. Team Section Reveal
      if (teamRef.current) {
        const teamHeader = teamRef.current.querySelector('.ap-section-header');
        const teamCards = teamRef.current.querySelectorAll('.ap-team-card');

        if (teamHeader) {
          gsap.fromTo(
            teamHeader,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: teamHeader,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (teamCards.length > 0) {
          gsap.fromTo(
            teamCards,
            { y: 40, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: teamCards[0],
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 7. Credentials Section Reveal
      if (credentialsRef.current) {
        const credBoxes = credentialsRef.current.querySelectorAll('.ap-credential-box');
        if (credBoxes.length > 0) {
          gsap.fromTo(
            credBoxes,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: credentialsRef.current,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 8. CTA Section Reveal
      if (ctaRef.current) {
        const ctaContainer = ctaRef.current.querySelector('.ap-cta-container');
        if (ctaContainer) {
          gsap.fromTo(
            ctaContainer,
            { y: 35, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaContainer,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 9. Synchronized Incrementing Animation for All Stats & Numbers
      const counterElements = page.querySelectorAll<HTMLElement>('.ap-counter');
      counterElements.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const startVal = parseFloat(el.getAttribute('data-start') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = parseFloat(el.getAttribute('data-duration') || '1.8');
        const delay = parseFloat(el.getAttribute('data-delay') || '0');

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = `${prefix}${targetVal.toLocaleString()}${suffix}`;
          return;
        }

        // Set initial text before scroll trigger fires
        el.textContent = `${prefix}${startVal.toLocaleString()}${suffix}`;

        const counterState = { val: startVal };
        const triggerEl = el.closest('.ap-stat-item, .ap-milestone-pill, .ap-founder-card, .ap-founder-eyebrow') || el;

        gsap.fromTo(
          counterState,
          { val: startVal },
          {
            val: targetVal,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse',
            },
            onUpdate: () => {
              const currentInt = Math.round(counterState.val);
              el.textContent = `${prefix}${currentInt.toLocaleString()}${suffix}`;
            },
            onReverseComplete: () => {
              el.textContent = `${prefix}${startVal.toLocaleString()}${suffix}`;
            },
          }
        );
      });
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
    <div ref={pageRef} className="about-page">
      {/* 1. Hero Section: Who We Are */}
      <section ref={heroRef} className="ap-hero">
        <div className="ap-hero-bg">
          <img 
            src="/images/about_hero.jpg" 
            alt="ConOps Global Executive Team" 
          />
          <div className="ap-hero-overlay"></div>
        </div>

        <div className="container ap-hero-content">
          <div className="label reveal-hero">
            <div className="label-square"></div>
            <span>ABOUT US</span>
          </div>

          <h1 className="ap-hero-title reveal-hero">
            Who We Are
          </h1>

          <p className="ap-hero-desc reveal-hero">
            ConOps Global is a dedicated People & Talent Consultancy built on one simple belief: extraordinary organizations are powered by exceptional people.
          </p>
        </div>
      </section>

      {/* 2. High-Emphasis "Meet Our Founder" Showcase Section (DIRECTLY AFTER WHO WE ARE) */}
      <section ref={founderRef} className="ap-founder-showcase-section">
        <div className="ap-founder-ambient-glow ap-glow-1"></div>
        <div className="ap-founder-ambient-glow ap-glow-2"></div>

        <div className="container ap-founder-showcase-container">
          <div className="ap-founder-showcase-grid">
            {/* Left: Sculpted Executive Portrait Monolith */}
            {/* Left: Sculpted Executive Portrait Monolith */}
            <div className="ap-founder-portrait-col">
              <div className="ap-founder-card">
                <div className="ap-founder-media">
                  <img 
                    src="/images/team_1.jpg" 
                    alt="Amit, Founder & Managing Partner" 
                    className="ap-founder-img"
                  />
                  <div className="ap-founder-scrim"></div>
                </div>

                {/* Floating Top Badge */}
                <div className="ap-founder-top-badge">
                  <span className="ap-founder-live-dot"></span>
                  <span>FOUNDER & MANAGING PARTNER</span>
                </div>

                {/* Floating Bottom Monolith Card */}
                <div className="ap-founder-bottom-card">
                  <div className="ap-founder-monogram-row">
                    <div className="ap-founder-monogram">A</div>
                    <div>
                      <h4 className="ap-founder-name-tag">Amit</h4>
                      <p className="ap-founder-subtag">Founder, ConOps Global</p>
                    </div>
                  </div>
                  <div className="ap-founder-highlight-line">
                    <span className="ap-founder-check-icon">✓</span>
                    <span><strong className="ap-counter" data-target="15" data-suffix="+">15+</strong> Years US Civil Engineering & Material Operations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & Philosophy Manifesto */}
            <div className="ap-founder-manifesto-col">
              <div className="ap-founder-eyebrow reveal-founder">
                <div className="label">
                  <div className="label-square"></div>
                  <span>LEADERSHIP & US DOMAIN EXPERIENCE</span>
                </div>
                <span className="ap-founder-id-tag">EST. <span className="ap-counter" data-target="2018" data-start="2000" data-duration="1.4">2018</span></span>
              </div>

              <h2 className="ap-founder-manifesto-title reveal-founder">
                "In heavy civil infrastructure and material operations, generic recruiting fails. Real experience makes the difference."
              </h2>

              <p className="ap-founder-lead reveal-founder">
                With a proven background working directly inside US-based civil engineering and heavy infrastructure firms, Amit founded ConOps Global to deliver true domain authority in talent consultancy. Specializing in asphalt paving operations, concrete mix engineering, and heavy civil estimating, Amit ensures every engagement is backed by technical rigor.
              </p>

              {/* Founder Handwritten Signature Artifact */}
              <div className="ap-founder-signature-wrap reveal-founder">
                <svg className="founder-signature-svg" width="200" height="52" viewBox="0 0 220 60" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 12 36 C 22 14, 38 10, 42 26 C 45 42, 34 46, 50 34 C 64 22, 75 20, 82 30 C 86 36, 92 40, 102 28 C 112 16, 122 14, 128 24 C 132 32, 138 36, 150 26 C 160 18, 172 14, 178 26 C 182 34, 195 24, 210 20" />
                  <path d="M 26 30 L 82 28" />
                  <circle cx="212" cy="20" r="2" fill="var(--primary)" />
                </svg>
                <div className="ap-signature-meta">
                  <strong>Amit</strong>
                  <span>Founder & Principal Civil Infrastructure Consultant</span>
                </div>
              </div>

              {/* 3 Interactive Editorial Principles Bento Cards */}
              <div className="ap-founder-pillars-grid">
                <div className="ap-pillar-card">
                  <div className="ap-pillar-num">01</div>
                  <h4 className="ap-pillar-title">US Firm Experience</h4>
                  <p className="ap-pillar-desc">
                    Direct hands-on experience working inside US civil contracting and asphalt/concrete operations.
                  </p>
                </div>

                <div className="ap-pillar-card">
                  <div className="ap-pillar-num">02</div>
                  <h4 className="ap-pillar-title">Material & Crew Mastery</h4>
                  <p className="ap-pillar-desc">
                    Deep expertise in Hot Mix Asphalt, Superpave specs, ready-mix concrete, and crew logistics.
                  </p>
                </div>

                <div className="ap-pillar-card">
                  <div className="ap-pillar-num">03</div>
                  <h4 className="ap-pillar-title">DOT & OSHA Rigor</h4>
                  <p className="ap-pillar-desc">
                    Uncompromising alignment with State DOT regulations, AASHTO standards, and site safety.
                  </p>
                </div>
              </div>

              {/* Executive Milestones Strip */}
              <div className="ap-founder-milestones-row">
                <div className="ap-milestone-pill">
                  <strong className="ap-counter" data-target="15" data-suffix="+" data-duration="1.6" data-delay="0">15+</strong>
                  <span>Years Industry Leadership</span>
                </div>
                <div className="ap-milestone-pill">
                  <strong className="ap-counter" data-target="500" data-suffix="+" data-duration="2.0" data-delay="0.1">500+</strong>
                  <span>Executive Placements</span>
                </div>
                <div className="ap-milestone-pill">
                  <strong className="ap-counter" data-target="98" data-suffix="%" data-duration="1.8" data-delay="0.2">98%</strong>
                  <span>Client Retention Rate</span>
                </div>
              </div>

              {/* Actions Row */}
              <div className="ap-founder-actions reveal-founder">
                <a href="/contact" className="btn btn-primary ap-founder-btn">
                  Schedule an Executive Briefing
                  <div className="icon-box">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ap-founder-social-btn"
                  title="Connect on LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Statement Section */}
      <section ref={missionRef} className="ap-mission-section">
        <div className="container ap-mission-container">
          <div className="ap-mission-logo">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M4 19V9M20 19V9M4 9C4 9 7 4 12 4C17 4 20 9 20 9M4 9C4 9 6 12 12 12C18 12 20 9 20 9M4 14H20M9 19V4M15 19V4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="ap-mission-text">
            Our Mission: Driving <span className="highlight-green">growth</span> through <span className="highlight-green">human-centered</span> talent consulting that <span className="highlight-green">builds</span> high-performing teams, <span className="highlight-green">enhances</span> organizational capability, and supports <span className="highlight-green">long-term</span> enterprise success.
          </h2>
        </div>
      </section>

      {/* 4. Our Story Section */}
      <section ref={storyRef} className="ap-story-section">
        <div className="container ap-story-container">
          <div className="ap-story-content-wrapper">
            <div className="ap-story-img">
              <img 
                src="/images/about_story.jpg" 
                alt="ConOps Global Executive Team" 
                className="ab-story-img"
              />
            </div>
            <div className="ap-story-text">
              <div className="label">
                <div className="label-square"></div>
                <span>OUR STORY</span>
              </div>
              <h2 className="ap-section-title">Built to Redefine How Companies Build Teams</h2>
              <p>
                ConOps Global was founded with a clear mission: to replace transactional recruitment with deep, strategic talent consultancy.
              </p>
              <p>
                Too many companies struggle with commoditized hiring processes and automated keyword-matching that overlook cultural alignment, leadership potential, and specialized capability.
              </p>
              <p>
                We engineered a consultancy model that puts people and relationship-building back at the core — where qualitative matching, organizational design, and long-term retention take precedence over sheer volume.
              </p>
              <p>
                Today, we partner with early-stage pioneers, fast-scaling technology scale-ups, and global enterprises to build teams that outperform expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stats by the Numbers Section */}
      <section ref={statsRef} className="ap-stats-section">
        <div className="container">
          <div className="ap-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>BY THE NUMBERS</span>
            </div>
            <h2 className="ap-section-title">Results You Can Trust</h2>
          </div>
          
          <div className="ap-stats-grid">
            {statsData.map((stat, idx) => (
              <div key={idx} className="ap-stat-item">
                <h3>
                  <span 
                    className="ap-counter" 
                    data-target={stat.target} 
                    data-suffix={stat.suffix}
                    data-prefix={stat.prefix || ''}
                    data-duration={stat.duration || 1.8}
                    data-delay={idx * 0.1}
                  >
                    {stat.value}
                  </span>
                </h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Leadership Team Section */}
      <section ref={teamRef} className="ap-team-section">
        <div className="container">
          <div className="ap-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>OUR LEADERSHIP TEAM</span>
            </div>
            <h2 className="ap-section-title">Consulting Partners You Can Rely On</h2>
            <p className="ap-team-desc">
              At ConOps Global, our consulting team combines specialized industry depth with human intuition and rigor.
            </p>
          </div>
          
          <div className="ap-team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="ap-team-card">
                <div className="ap-team-img-wrapper">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <span className="ap-team-category-badge">{member.category}</span>
                </div>
                <div className="ap-team-card-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Recognized Credentials Section */}
      <section ref={credentialsRef} className="ap-credentials-section">
        <div className="container">
          <div className="ap-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>CREDENTIALS</span>
            </div>
            <h2 className="ap-section-title">Recognized Industry Standards</h2>
          </div>
          <div className="ap-credentials-grid">
            {credentialsData.map((cred, idx) => (
              <div key={idx} className="ap-credential-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Section */}
      <section ref={ctaRef} className="ap-cta-section">
        <div className="ap-cta-bg">
          <img 
            src="/images/about_hero.jpg" 
            alt="ConOps Infrastructure Growth" 
          />
          <div className="ap-cta-overlay"></div>
        </div>
        <div className="container ap-cta-container">
          <div className="ap-cta-content">
            <div className="label">
              <div className="label-square"></div>
              <span>GET STARTED</span>
            </div>
            <h2 className="ap-cta-title">
              Let's Build Your Next Team Together
            </h2>
            <p className="ap-cta-desc">
              Whether you're scaling fast, filling a critical leadership vacancy, or restructuring your human capital strategy, we're here to deliver with precision.
            </p>
            <a href="/contact" className="btn btn-primary ap-cta-btn">
              Consult with Our Team
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

export default AboutPage;
