import React, { useState, useId, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HiringCalculator.css';

gsap.registerPlugin(ScrollTrigger);

type RoleId = 'construction-estimator' | 'project-engineer' | 'procore-admin' | 'project-coordinator';
type SeniorityId = 'entry' | 'mid' | 'senior';
type ModelId = 'us-w2' | 'us-1099' | 'freelance' | 'direct-india' | 'conops-managed';

interface RoleOption {
  id: RoleId;
  name: string;
  scope: string;
}

interface SeniorityOption {
  id: SeniorityId;
  name: string;
  label: string;
  description: string;
}

interface HiringModelMeta {
  id: ModelId;
  name: string;
  subtitle: string;
  isConOps?: boolean;
}

const ROLES: RoleOption[] = [
  {
    id: 'construction-estimator',
    name: 'Construction Estimator',
    scope: 'Quantity takeoffs, drawing reviews, cost estimation, bid preparation, and estimating support.',
  },
  {
    id: 'project-engineer',
    name: 'Project Engineer',
    scope: 'Construction project engineering support, RFIs, submittals, drawing coordination, documentation, reporting, and schedule coordination.',
  },
  {
    id: 'procore-admin',
    name: 'Procore Administrator',
    scope: 'Procore project setup, user management, document control, workflow administration, reporting, and platform support.',
  },
  {
    id: 'project-coordinator',
    name: 'Project Coordinator',
    scope: 'Meeting minutes, action-item tracking, document management, project reporting, stakeholder follow-ups, and project administration.',
  },
];

const SENIORITIES: SeniorityOption[] = [
  {
    id: 'entry',
    name: 'Entry-level (0–2 yrs)',
    label: 'Entry-level',
    description: 'Typically 0–2 years of relevant experience',
  },
  {
    id: 'mid',
    name: 'Mid-level (3–6 yrs)',
    label: 'Mid-level',
    description: 'Typically 3–6 years of relevant experience with greater independence',
  },
  {
    id: 'senior',
    name: 'Senior (7+ yrs)',
    label: 'Senior',
    description: 'Typically 7+ years or demonstrated advanced capability',
  },
];

const HIRING_MODELS: HiringModelMeta[] = [
  {
    id: 'us-w2',
    name: 'US W-2 Employee',
    subtitle: 'Estimated employer cost (salary + benefits, payroll taxes, equipment & overhead)',
  },
  {
    id: 'us-1099',
    name: 'US Contractor / 1099',
    subtitle: 'US-based independent contractor spend assuming billable utilization',
  },
  {
    id: 'freelance',
    name: 'Freelance Platform',
    subtitle: 'Hourly platform spend (Upwork/Fiverr) incl. platform fees and turnover risk',
  },
  {
    id: 'direct-india',
    name: 'Direct India Hire',
    subtitle: 'Direct employment cost incl. salary + modest administrative/equipment allowance',
  },
  {
    id: 'conops-managed',
    name: 'ConOps Managed Workforce',
    subtitle: 'Dedicated professional with full managed delivery, compliance, equipment & replacement',
    isConOps: true,
  },
];

// Exact annual benchmark figures from ConOps Global Hiring Cost Comparison document
const BENCHMARKS: Record<RoleId, Record<SeniorityId, Record<ModelId, number>>> = {
  'construction-estimator': {
    entry: {
      'us-w2': 70000,
      'us-1099': 78000,
      freelance: 85000,
      'direct-india': 15000,
      'conops-managed': 24000,
    },
    mid: {
      'us-w2': 95000,
      'us-1099': 110000,
      freelance: 120000,
      'direct-india': 23000,
      'conops-managed': 32000,
    },
    senior: {
      'us-w2': 125000,
      'us-1099': 145000,
      freelance: 160000,
      'direct-india': 35000,
      'conops-managed': 44000,
    },
  },
  'project-engineer': {
    entry: {
      'us-w2': 75000,
      'us-1099': 83000,
      freelance: 90000,
      'direct-india': 16000,
      'conops-managed': 25000,
    },
    mid: {
      'us-w2': 95000,
      'us-1099': 108000,
      freelance: 118000,
      'direct-india': 24000,
      'conops-managed': 33000,
    },
    senior: {
      'us-w2': 120000,
      'us-1099': 138000,
      freelance: 150000,
      'direct-india': 36000,
      'conops-managed': 45000,
    },
  },
  'procore-admin': {
    entry: {
      'us-w2': 60000,
      'us-1099': 68000,
      freelance: 75000,
      'direct-india': 12000,
      'conops-managed': 22000,
    },
    mid: {
      'us-w2': 80000,
      'us-1099': 92000,
      freelance: 100000,
      'direct-india': 20000,
      'conops-managed': 30000,
    },
    senior: {
      'us-w2': 105000,
      'us-1099': 120000,
      freelance: 135000,
      'direct-india': 32000,
      'conops-managed': 42000,
    },
  },
  'project-coordinator': {
    entry: {
      'us-w2': 55000,
      'us-1099': 62000,
      freelance: 70000,
      'direct-india': 12000,
      'conops-managed': 21000,
    },
    mid: {
      'us-w2': 75000,
      'us-1099': 85000,
      freelance: 95000,
      'direct-india': 18000,
      'conops-managed': 28000,
    },
    senior: {
      'us-w2': 95000,
      'us-1099': 108000,
      freelance: 120000,
      'direct-india': 28000,
      'conops-managed': 38000,
    },
  },
};

const formatCurrency = (val: number): string => {
  return '$' + Math.round(val).toLocaleString('en-US');
};

const HiringCalculator: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleId>('construction-estimator');
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityId>('mid');
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

  // Exact benchmark lookups from document matrix
  const currentBenchmarks = BENCHMARKS[selectedRole][selectedSeniority];
  const usW2CostPerHire = currentBenchmarks['us-w2'];
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
              Live calculation. Real benchmarks. No email required. ConOps managed remote workforce pricing: <strong>$21,000–$45,000 per year</strong>, all-inclusive.
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
                  onChange={(e) => setSelectedRole(e.target.value as RoleId)}
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
                  onChange={(e) => setSelectedSeniority(e.target.value as SeniorityId)}
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

          {/* Role Scope & Seniority Banner */}
          <div className="calculator-scope-box">
            <span className="scope-badge">Scope</span>
            <span className="scope-text">{roleObj.scope}</span>
            <span className="scope-badge scope-badge-level">{seniorityObj.label}</span>
            <span className="scope-text">{seniorityObj.description}</span>
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
                  const costPerHire = currentBenchmarks[model.id];
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

          {/* Planning Benchmark Disclaimer from Document */}
          <div className="calculator-disclaimer-box">
            <strong>Planning Disclaimer:</strong> Figures are illustrative planning benchmarks in USD. US W-2 values represent estimated employer costs including salary, benefits, payroll taxes, and equipment. Direct India hire includes salary plus modest equipment and administrative allowances. ConOps Managed Workforce assumes managed delivery, equipment, supervision, and guaranteed replacement. Three-year costs are calculated as annual cost × 3. Results represent estimated savings versus US W-2 employment and are not guaranteed figures or binding quotes.
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
              Scale Your Operations
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
