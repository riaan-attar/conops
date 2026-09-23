import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Comparison.css';

gsap.registerPlugin(ScrollTrigger);

type FeatureValue = boolean | string;

interface CompetitorData {
  id: string;
  label: string;
  model: string;
  pricing: string;
  timeToFill: string;
  features: {
    compliance: FeatureValue;
    fieldVetting: FeatureValue;
    dedicatedSupport: FeatureValue;
    replacement: FeatureValue;
    exclusiveFit: FeatureValue;
  };
}

const featureRows: { key: keyof CompetitorData['features']; label: string }[] = [
  { key: 'compliance', label: 'OSHA & DOT Compliance Vetting' },
  { key: 'fieldVetting', label: 'Field-Verified Experience' },
  { key: 'dedicatedSupport', label: 'Dedicated Account Manager' },
  { key: 'replacement', label: 'Replacement Guarantee' },
  { key: 'exclusiveFit', label: 'Vetted for Your Project' },
];

const competitors: CompetitorData[] = [
  {
    id: 'agencies',
    label: 'Recruiting Agencies',
    model: 'Finds candidates, then steps away',
    pricing: '15%–25% of first-year salary',
    timeToFill: '4–8 weeks',
    features: {
      compliance: false,
      fieldVetting: false,
      dedicatedSupport: false,
      replacement: false,
      exclusiveFit: 'Sometimes',
    },
  },
  {
    id: 'boards',
    label: 'Job Boards & Postings',
    model: 'Post & pray — you screen everyone',
    pricing: '$500–$3K per listing',
    timeToFill: '6–12 weeks',
    features: {
      compliance: false,
      fieldVetting: false,
      dedicatedSupport: false,
      replacement: false,
      exclusiveFit: false,
    },
  },
  {
    id: 'staffing',
    label: 'Staffing Agencies',
    model: 'Temp bodies, high turnover',
    pricing: '1.5x–2x hourly markup',
    timeToFill: '1–3 weeks',
    features: {
      compliance: 'Basic',
      fieldVetting: false,
      dedicatedSupport: false,
      replacement: 'Limited',
      exclusiveFit: false,
    },
  },
  {
    id: 'direct',
    label: 'Direct Recruiting (In-House)',
    model: 'You run the entire search yourself',
    pricing: 'Internal HR + advertising costs',
    timeToFill: '8–16 weeks',
    features: {
      compliance: 'Manual',
      fieldVetting: 'Manual',
      dedicatedSupport: false,
      replacement: false,
      exclusiveFit: 'Always',
    },
  },
];

const conOpsColumn: CompetitorData = {
  id: 'conops',
  label: 'ConOps Global',
  model: 'Full-cycle specialist search & vetting',
  pricing: 'Flat project fee, no % markups',
  timeToFill: '2–4 weeks average',
  features: {
    compliance: true,
    fieldVetting: true,
    dedicatedSupport: true,
    replacement: true,
    exclusiveFit: true,
  },
};

const renderFeatureValue = (value: FeatureValue, isConOps: boolean) => {
  if (value === true) {
    return (
      <span className="comparison-check comparison-check-yes">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        {isConOps ? 'Always' : ''}
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="comparison-check comparison-check-no">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    );
  }
  return <span className="comparison-value-text">{value}</span>;
};

const Comparison: React.FC = () => {
  const [activeId, setActiveId] = useState(competitors[0].id);
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
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="comparison-section">
      <div className="container comparison-container">
        <div ref={headerRef} className="comparison-header">
          <div className="label reveal-item">
            <div className="label-square"></div>
            <span>Compare Options</span>
          </div>
          <h2 className="comparison-heading reveal-item">
            ConOps Global vs Every Other Way<br />to Staff Civil Infrastructure Talent.
          </h2>
          <p className="comparison-sub reveal-item">
            Pick what you're comparing against — see exactly what's different.
          </p>

          <div className="comparison-tabs reveal-item">
            {competitors.map((c) => (
              <button
                key={c.id}
                className={`comparison-tab-btn ${activeId === c.id ? 'active' : ''}`}
                onClick={() => setActiveId(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="comparison-grid">
          <div className="comparison-card comparison-card-left">
            <div className="comparison-card-title-row">
              <h3 className="comparison-card-name">{active.label}</h3>
            </div>

            <div className="comparison-row">
              <span className="comparison-row-label">Model</span>
              <span className="comparison-row-value">{active.model}</span>
            </div>
            <div className="comparison-row">
              <span className="comparison-row-label">Pricing</span>
              <span className="comparison-row-value">{active.pricing}</span>
            </div>
            <div className="comparison-row">
              <span className="comparison-row-label">Time to Fill</span>
              <span className="comparison-row-value">{active.timeToFill}</span>
            </div>
            {featureRows.map((row) => (
              <div className="comparison-row" key={row.key}>
                <span className="comparison-row-label">{row.label}</span>
                <span className="comparison-row-value">
                  {renderFeatureValue(active.features[row.key], false)}
                </span>
              </div>
            ))}
          </div>

          <div className="comparison-card comparison-card-right">
            <div className="comparison-card-title-row">
              <span className="comparison-check-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <h3 className="comparison-card-name">{conOpsColumn.label}</h3>
            </div>

            <div className="comparison-row">
              <span className="comparison-row-label">Model</span>
              <span className="comparison-row-value comparison-row-value-strong">{conOpsColumn.model}</span>
            </div>
            <div className="comparison-row">
              <span className="comparison-row-label">Pricing</span>
              <span className="comparison-row-value comparison-row-value-strong">{conOpsColumn.pricing}</span>
            </div>
            <div className="comparison-row">
              <span className="comparison-row-label">Time to Fill</span>
              <span className="comparison-row-value comparison-row-value-strong">{conOpsColumn.timeToFill}</span>
            </div>
            {featureRows.map((row) => (
              <div className="comparison-row" key={row.key}>
                <span className="comparison-row-label">{row.label}</span>
                <span className="comparison-row-value">
                  {renderFeatureValue(conOpsColumn.features[row.key], true)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="comparison-footer-note">
          <strong>Choose ConOps Global</strong> if you want vetted civil infrastructure specialists who show up ready for the jobsite — without the guesswork of job boards or the markup of staffing agencies.
        </p>
      </div>
    </section>
  );
};

export default Comparison;
