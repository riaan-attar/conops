import React, { useState, useId, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HiringCalculator.css';

gsap.registerPlugin(ScrollTrigger);

interface RoleOption {
  id: string;
  name: string;
  multiplier: number;
}

interface SeniorityOption {
  id: string;
  name: string;
  multiplier: number;
}

const ROLES: RoleOption[] = [
  { id: 'software-engineer', name: 'Software Engineer', multiplier: 1.0 },
  { id: 'fullstack-dev', name: 'Full Stack Developer', multiplier: 1.02 },
  { id: 'devops-cloud', name: 'DevOps & Cloud Engineer', multiplier: 1.08 },
  { id: 'qa-automation', name: 'QA / Test Automation Engineer', multiplier: 0.88 },
  { id: 'data-ai', name: 'Data Engineer / AI Specialist', multiplier: 1.12 },
  { id: 'ui-ux', name: 'UI / UX Designer', multiplier: 0.85 },
  { id: 'civil-engineer', name: 'Civil / Construction Estimator', multiplier: 0.92 },
  { id: 'product-pm', name: 'Technical Project Manager', multiplier: 0.95 },
];

const SENIORITIES: SeniorityOption[] = [
  { id: 'junior', name: 'Junior (1–3 yrs)', multiplier: 0.75 },
  { id: 'mid', name: 'Mid-level', multiplier: 1.0 },
  { id: 'senior', name: 'Senior (5–8 yrs)', multiplier: 1.35 },
  { id: 'lead', name: 'Lead / Principal (8+ yrs)', multiplier: 1.65 },
];

interface ModelBenchmark {
  id: string;
  name: string;
  subtitle: string;
  baseAnnual: number;
  isConOps?: boolean;
}

const HIRING_MODELS: ModelBenchmark[] = [
  {
    id: 'us-w2',
    name: 'US W-2 Employee',
    subtitle: 'Full-time US-based hire on W-2 payroll',
    baseAnnual: 177208,
  },
  {
    id: 'us-1099',
    name: 'US Contractor / 1099',
    subtitle: 'US-based independent contractor, hourly',
    baseAnnual: 199240,
  },
  {
    id: 'freelance',
    name: 'Freelance Platform (Upwork/Fiverr)',
    subtitle: 'Hourly platform freelancer with platform fee + turnover risk',
    baseAnnual: 246002,
  },
  {
    id: 'direct-india',
    name: 'Direct India Hire (no managed support)',
    subtitle: 'You source, hire, manage compliance, equipment, replacement yourself',
    baseAnnual: 38529,
  },
  {
    id: 'conops-managed',
    name: 'ConOps Managed Remote Workforce',
    subtitle: 'Weekly all-inclusive — ConOps sources, vets, employs, equips, manages, replaces',
    baseAnnual: 52000,
    isConOps: true,
  },
];

const formatCurrency = (val: number): string => {
  return '$' + Math.round(val).toLocaleString('en-US');
};

const HiringCalculator: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('software-engineer');
  const [selectedSeniority, setSelectedSeniority] = useState<string>('mid');
  const [numHires, setNumHires] = useState<number>(1);

  const roleSelectId = useId();
  const senioritySelectId = useId();
  const hiresSliderId = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const roleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const seniorityObj = SENIORITIES.find((s) => s.id === selectedSeniority) || SENIORITIES[1];
  const combinedMultiplier = roleObj.multiplier * seniorityObj.multiplier;

  // Calculate baseline US W-2 for comparisons
  const usW2BaseAnnual = HIRING_MODELS[0].baseAnnual;
  const usW2CostPerHire = Math.round(usW2BaseAnnual * combinedMultiplier);
  const usW2TotalAnnual = usW2CostPerHire * numHires;

  return (
    <section ref={sectionRef} className="calculator-section" id="calculator">
      <div className="container calculator-container">
        <div ref={cardRef} className="calculator-card">
          {/* Badge & Title Header */}
          <div className="calculator-header">
            <div className="calculator-badge">
              <span className="calc-badge-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="16" y1="14" x2="16" y2="18"></line>
                  <line x1="8" y1="10" x2="8" y2="10.01"></line>
                  <line x1="12" y1="10" x2="12" y2="10.01"></line>
                  <line x1="16" y1="10" x2="16" y2="10.01"></line>
                  <line x1="8" y1="14" x2="8" y2="14.01"></line>
                  <line x1="12" y1="14" x2="12" y2="14.01"></line>
                  <line x1="8" y1="18" x2="8" y2="18.01"></line>
                  <line x1="12" y1="18" x2="12" y2="18.01"></line>
                </svg>
              </span>
              <span>FREE TOOL</span>
            </div>

            <h2 className="calculator-title">Compare 5 Hiring Models for Your Role</h2>
            <p className="calculator-subtitle">
              Live calculation. Real benchmarks. No email required. ConOps managed remote workforce pricing: <strong>$375–$1,200 per week</strong>, all-inclusive.
            </p>
          </div>

          {/* Interactive Controls Filter Row */}
          <div className="calculator-controls">
            <div className="control-group">
              <label htmlFor={roleSelectId} className="control-label">ROLE TYPE</label>
              <div className="select-wrapper">
                <select
                  id={roleSelectId}
                  className="calc-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {ROLES.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="select-chevron">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="control-group">
              <label htmlFor={senioritySelectId} className="control-label">SENIORITY</label>
              <div className="select-wrapper">
                <select
                  id={senioritySelectId}
                  className="calc-select"
                  value={selectedSeniority}
                  onChange={(e) => setSelectedSeniority(e.target.value)}
                >
                  {SENIORITIES.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
                <div className="select-chevron">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="control-group slider-control-group">
              <div className="slider-label-row">
                <label htmlFor={hiresSliderId} className="control-label">
                  NUMBER OF HIRES: <span className="highlight-count">{numHires}</span>
                </label>
              </div>
              <div className="slider-wrapper">
                <input
                  id={hiresSliderId}
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={numHires}
                  onChange={(e) => setNumHires(parseInt(e.target.value, 10) || 1)}
                  className="calc-range-slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                      ((numHires - 1) / (15 - 1)) * 100
                    }%, #e5e0d3 ${((numHires - 1) / (15 - 1)) * 100}%, #e5e0d3 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Results Comparison Table */}
          <div className="calculator-table-responsive">
            <table className="calculator-table">
              <thead>
                <tr>
                  <th className="th-model">Hiring model</th>
                  <th className="th-num">Annual cost / hire</th>
                  <th className="th-num">Total ({numHires} {numHires === 1 ? 'hire' : 'hires'})</th>
                  <th className="th-num">3-year total</th>
                  <th className="th-savings">Savings vs US W-2</th>
                </tr>
              </thead>
              <tbody>
                {HIRING_MODELS.map((model) => {
                  const costPerHire = Math.round(model.baseAnnual * combinedMultiplier);
                  const totalAnnual = costPerHire * numHires;
                  const threeYearTotal = totalAnnual * 3;

                  let savingsContent: React.ReactNode;
                  let savingsClass = '';

                  if (model.id === 'us-w2') {
                    savingsContent = <span className="savings-baseline">baseline</span>;
                  } else {
                    const diff = usW2TotalAnnual - totalAnnual;
                    if (diff < 0) {
                      // More expensive
                      savingsClass = 'savings-more';
                      savingsContent = (
                        <span className="savings-pill savings-pill-alert">
                          {formatCurrency(Math.abs(diff))} more
                        </span>
                      );
                    } else {
                      // Cost savings
                      const percent = Math.round((diff / usW2TotalAnnual) * 100);
                      savingsClass = model.isConOps ? 'savings-conops' : 'savings-positive';
                      savingsContent = (
                        <span className={`savings-pill ${model.isConOps ? 'savings-pill-conops' : 'savings-pill-positive'}`}>
                          {formatCurrency(diff)} ({percent}%)
                        </span>
                      );
                    }
                  }

                  return (
                    <tr
                      key={model.id}
                      className={`calc-row ${model.isConOps ? 'calc-row-conops' : ''}`}
                    >
                      <td className="td-model">
                        <div className="model-name-wrapper">
                          {model.isConOps && (
                            <span className="conops-star-icon">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </span>
                          )}
                          <strong className="model-name">{model.name}</strong>
                        </div>
                        <p className="model-subtitle">{model.subtitle}</p>
                      </td>
                      <td className="td-num">
                        <span className="val-text">{formatCurrency(costPerHire)}</span>
                      </td>
                      <td className="td-num">
                        <span className="val-text">{formatCurrency(totalAnnual)}</span>
                      </td>
                      <td className="td-num">
                        <span className="val-text">{formatCurrency(threeYearTotal)}</span>
                      </td>
                      <td className={`td-savings ${savingsClass}`}>
                        {savingsContent}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Card Footer Call to Action */}
          <div className="calculator-footer-bar">
            <div className="calc-footer-info">
              <span className="calc-shield-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </span>
              <p className="calc-footer-text">
                With <strong>ConOps Global</strong>, you get full-time dedicated talent, pre-vetted domain expertise, guaranteed replacement, and complete payroll & compliance handled.
              </p>
            </div>
            <a href="/contact" className="btn btn-primary calc-cta-btn">
              Start Recruiting Now
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
  );
};

export default HiringCalculator;
