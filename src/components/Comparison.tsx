import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Comparison.css';

gsap.registerPlugin(ScrollTrigger);

interface CompetitorData {
  id: string;
  label: string;
  model: string;
  pricing: string;
  timeToHire: string;
  hrPayroll: string;
  equipment: string;
  performanceMgmt: string;
  replacement: string;
  exclusivelyYours: string;
}

const competitors: CompetitorData[] = [
  {
    id: 'recruiting-agencies',
    label: 'Recruiting Agencies',
    model: 'Finds talent, you manage',
    pricing: '$5K–$20K flat fee',
    timeToHire: '4–12 weeks',
    hrPayroll: 'No',
    equipment: 'No',
    performanceMgmt: 'No',
    replacement: 'No',
    exclusivelyYours: 'Sometimes',
  },
  {
    id: 'freelance-platforms',
    label: 'Freelance Platforms',
    model: 'Gig workers',
    pricing: 'Hourly ($15–$150/hr)',
    timeToHire: '1–2 weeks',
    hrPayroll: 'No',
    equipment: 'No',
    performanceMgmt: 'No',
    replacement: 'No',
    exclusivelyYours: 'Rarely',
  },
  {
    id: 'eor-services',
    label: 'EOR Services',
    model: 'Compliance only',
    pricing: '$599–$1,500/mo + salary',
    timeToHire: '4–8 weeks',
    hrPayroll: 'Yes',
    equipment: 'Optional',
    performanceMgmt: 'No',
    replacement: 'No',
    exclusivelyYours: 'Yes',
  },
  {
    id: 'direct-hire',
    label: 'Direct Hire',
    model: 'You manage',
    pricing: 'Full salary + benefits',
    timeToHire: '6–16 weeks',
    hrPayroll: 'You handle',
    equipment: 'You handle',
    performanceMgmt: 'You handle',
    replacement: 'Rehire cost',
    exclusivelyYours: 'Yes',
  },
];

const conOpsData = {
  label: 'ConOps',
  model: 'Full managed workforce',
  pricing: '$375-$1,200/week all-in',
  timeToHire: '7-14 business days',
  hrPayroll: true,
  equipment: true,
  performanceMgmt: true,
  replacement: 'Free anytime',
  exclusivelyYours: 'Always',
};

const Comparison: React.FC = () => {
  const [activeId, setActiveId] = useState('recruiting-agencies');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const active = competitors.find((c) => c.id === activeId) ?? competitors[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.reveal-item'),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="compare-section">
      <div className="compare-container">
        <div ref={headerRef} className="compare-header">
          <p className="compare-badge reveal-item">COMPARE OPTIONS</p>
          <h2 className="compare-heading reveal-item">
            ConOps vs Every other way to hire remote talent.
          </h2>
          <p className="compare-subheading reveal-item">
            Pick what you're comparing against - see exactly what's different.
          </p>

          <div
            role="tablist"
            aria-label="Compare ConOps against"
            className="compare-tablist reveal-item"
          >
            {competitors.map((c) => {
              const isSelected = activeId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`compare-tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveId(c.id)}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={gridRef} className="compare-grid">
          {/* Competitor / Selected Option Column */}
          <div className="compare-card compare-card-neutral">
            <div className="compare-card-title-row">
              <p className="compare-card-title">{active.label}</p>
            </div>
            <dl className="compare-dl">
              <div className="compare-row">
                <dt className="compare-dt">Model</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.model}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Pricing</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.pricing}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Time to Hire</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.timeToHire}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">HR &amp; Payroll</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.hrPayroll}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Equipment</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.equipment}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Performance Mgmt</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.performanceMgmt}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Replacement</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.replacement}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Exclusively Yours, Full-Time</dt>
                <dd className="compare-dd">
                  <span className="compare-val-neutral">{active.exclusivelyYours}</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* ConOps Column */}
          <div className="compare-card compare-card-highlight">
            <div className="compare-card-title-row">
              <span className="compare-badge-check" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="compare-check-icon"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="compare-card-title-highlight">{conOpsData.label}</p>
            </div>
            <dl className="compare-dl">
              <div className="compare-row">
                <dt className="compare-dt">Model</dt>
                <dd className="compare-dd">
                  <span className="compare-val-bold">{conOpsData.model}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Pricing</dt>
                <dd className="compare-dd">
                  <span className="compare-val-bold">{conOpsData.pricing}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Time to Hire</dt>
                <dd className="compare-dd">
                  <span className="compare-val-bold">{conOpsData.timeToHire}</span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">HR &amp; Payroll</dt>
                <dd className="compare-dd">
                  <span className="compare-check-lead">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="compare-check-icon shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Equipment</dt>
                <dd className="compare-dd">
                  <span className="compare-check-lead">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="compare-check-icon shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Performance Mgmt</dt>
                <dd className="compare-dd">
                  <span className="compare-check-lead">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="compare-check-icon shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Replacement</dt>
                <dd className="compare-dd">
                  <span className="compare-check-lead">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="compare-check-icon shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {conOpsData.replacement}
                  </span>
                </dd>
              </div>
              <div className="compare-row">
                <dt className="compare-dt">Exclusively Yours, Full-Time</dt>
                <dd className="compare-dd">
                  <span className="compare-check-lead">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="compare-check-icon shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {conOpsData.exclusivelyYours}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="compare-footer-note">
          <strong>Choose ConOps</strong> if you want a full-time professional who works exclusively for you - without the overhead of direct employment or the limitations of agency and platform models.
        </p>
      </div>
    </section>
  );
};

export default Comparison;
