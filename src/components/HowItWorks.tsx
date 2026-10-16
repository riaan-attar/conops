import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

interface StepItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  highlighted?: boolean;
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  {
    id: 'share-needs',
    number: '1',
    title: 'Share Your Needs',
    desc: 'Role requirements, project scope, and timezone. Takes 15 minutes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z"></path>
        <rect x="5" y="4" width="14" height="18" rx="2"></rect>
        <line x1="9" y1="11" x2="15" y2="11"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    )
  },
  {
    id: 'screen-match',
    number: '2',
    title: 'We Screen & Match',
    desc: 'A 3-stage vetting process: skills assessment, technical interview, culture fit.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    id: 'interview-choose',
    number: '3',
    title: 'You Interview & Choose',
    desc: 'We present 2-3 pre-vetted candidates. You pick. No pressure, no minimum.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </svg>
    )
  },
  {
    id: 'deploy-support',
    number: '4',
    title: 'ConOps Deploys & Supports',
    desc: 'We handle onboarding, equipment, payroll, and ongoing performance management.',
    highlighted: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!section || !track || !fill) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
      gsap.set(fill, { scaleY: 0, transformOrigin: 'top center' });

      const tween = gsap.to(fill, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.4,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hiw-section">
      <div className="container hiw-container">
        <div className="hiw-header">
          <div className="label">
            <div className="label-square"></div>
            <span>How It Works</span>
          </div>
          <h2 className="hiw-heading">From Brief to Deployed in 14 Days.</h2>
          <p className="hiw-sub">We handle every step. You interview shortlisted candidates and choose.</p>
        </div>

        <div className="hiw-carousel">
          <div ref={trackRef} className="hiw-track">
            <div className="hiw-timeline-rail"></div>
            <div ref={fillRef} className="hiw-timeline-fill"></div>

            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="hiw-step">
                  <div className={`hiw-icon-box ${step.highlighted ? 'hiw-icon-box-highlight' : ''}`}>
                    {step.icon}
                    <span className="hiw-number-badge">{step.number}</span>
                  </div>
                  <div className="hiw-step-body">
                    <h3 className="hiw-step-title">{step.title}</h3>
                    <p className="hiw-step-desc">{step.desc}</p>
                  </div>
                </div>
                {index < steps.length - 1 && <div className="hiw-connector"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hiw-cta-row">
          <a href="/contact" className="btn btn-primary hiw-cta-btn">
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
  );
};

export default HowItWorks;
