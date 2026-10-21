import React from 'react';
import '../styles/CareersPage.css';

interface JobOpening {
  id: string;
  title: string;
  type: string;
  desc: string;
  tags: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Concrete Estimator & Quantity Surveyor',
    type: 'Full-Time Remote (India)',
    desc: 'Perform digital takeoffs using Bluebeam and Planswift for US commercial concrete and heavy civil contractors. Formulate bid sheets and material calculations.',
    tags: ['Bluebeam', 'Planswift', 'Quantity Takeoffs', 'Rebar Detailing', 'US Codes']
  },
  {
    id: '2',
    title: 'Civil Project Controls Engineer (Primavera P6)',
    type: 'Full-Time Remote (India)',
    desc: 'Develop and maintain baseline CPM schedules in Primavera P6 and MS Project. Manage submittals, RFI queries, and change order impact tracking for US highway projects.',
    tags: ['Primavera P6', 'CPM Scheduling', 'Submittals', 'RFIs', 'State DOT']
  },
  {
    id: '3',
    title: 'Procore & Construction Systems Administrator',
    type: 'Full-Time Remote (India)',
    desc: 'Administer Procore project hubs, daily log reviews, subcontractor compliance records, and AIA billing reconciliation for high-volume US contractors.',
    tags: ['Procore Certified', 'Buildertrend', 'AIA G702/G703', 'Compliance']
  },
  {
    id: '4',
    title: 'Offshore Construction Project Manager',
    type: 'Full-Time Remote (India)',
    desc: 'Lead offshore engineering teams coordinating directly with onshore superintendents, project managers, and executive leadership.',
    tags: ['Project Management', 'Client Communications', 'Civil Engineering', 'Team Leadership']
  }
];

const CareersPage: React.FC = () => {
  return (
    <div className="careers-page">
      {/* 1. Hero Section */}
      <section className="car-hero">
        <div className="car-hero-bg">
          <img src="/images/service_recruiting.jpg" alt="Careers at ConOps Global" />
        </div>
        <div className="container">
          <div className="car-hero-content">
            <div className="label">
              <div className="label-square"></div>
              <span>CAREERS AT CONOPS GLOBAL</span>
            </div>
            <h1 className="car-hero-title">
              Build Your Engineering Career With ConOps Global &amp; Amit Gole
            </h1>
            <p className="car-hero-desc">
              Join a high-rigor civil engineering and managed workforce firm working directly on premier US highway, infrastructure, and concrete construction projects.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Open Positions */}
      <section className="car-roles-section">
        <div className="container">
          <div className="label">
            <div className="label-square"></div>
            <span>OPEN POSITIONS</span>
          </div>
          <h2>Join Our Technical Delivery Team</h2>

          <div className="car-roles-grid">
            {jobOpenings.map((job) => (
              <div key={job.id} className="car-role-card">
                <div>
                  <span className="car-role-type">{job.type}</span>
                  <h3 className="car-role-title">{job.title}</h3>
                  <p className="car-role-desc">{job.desc}</p>
                  <div className="car-role-tags">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="car-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <a href="/contact" className="car-apply-btn">
                  Apply for this Role
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
