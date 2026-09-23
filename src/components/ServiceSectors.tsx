import React, { useState } from 'react';
import '../styles/ServiceSectors.css';

interface SectorItem {
  id: string;
  title: string;
  category: string;
  categoryType: 'construction' | 'dev' | 'support';
  description: string;
  databaseTag: string;
  deliveryTag: string;
  isActive: boolean;
  link?: string;
}

const sectors: SectorItem[] = [
  {
    id: 'construction',
    title: 'Construction',
    category: 'Construction & AEC',
    categoryType: 'construction',
    description: 'Estimators, project coordinators, Procore admins, and CAD drafters from India - starting at $375/week.',
    databaseTag: '85,500+ Candidate database',
    deliveryTag: '7-14 days Delivery time',
    isActive: true,
    link: '/construction'
  },
  {
    id: 'engineering-firms',
    title: 'Engineering Firms',
    category: 'Construction & AEC',
    categoryType: 'construction',
    description: 'CAD drafters, calculation support, and project coordinators from India - starting at $375/week.',
    databaseTag: '85,500+ Candidate database',
    deliveryTag: '7-14 days Delivery time',
    isActive: false
  },
  {
    id: 'startups',
    title: 'Startups',
    category: 'Engineering & Dev',
    categoryType: 'dev',
    description: 'Build your team faster and cheaper - engineers, designers, and operators from India, starting at $375/week.',
    databaseTag: '85,500+ Candidate database',
    deliveryTag: '7-14 days Time to first placement',
    isActive: false
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    category: 'Support & Operations',
    categoryType: 'support',
    description: 'Administrative, research, and operations support for consulting, accounting, and marketing firms - starting at $375/week.',
    databaseTag: '85,500+ Candidate database',
    deliveryTag: '7-14 days Delivery time',
    isActive: false
  }
];

const ServiceSectors: React.FC = () => {
  const [modalSector, setModalSector] = useState<SectorItem | null>(null);

  const handleCardClick = (sector: SectorItem, e: React.MouseEvent) => {
    if (!sector.isActive) {
      e.preventDefault();
      setModalSector(sector);
    }
  };

  const closeModal = () => setModalSector(null);

  return (
    <div className="service-sectors-section">
      <div className="container">
        <div className="sectors-header">
          <div className="label">
            <div className="label-square"></div>
            <span>OFFSHORE TALENT SECTORS</span>
          </div>
          <h2 className="section-title sectors-heading">
            Specialized Industry Verticals
          </h2>
          <p className="section-desc sectors-sub">
            Dedicated offshore talent solutions from India for construction, engineering, tech, and operations.
          </p>
        </div>

        <div className="sectors-grid">
          {sectors.map((sector) => (
            <a
              key={sector.id}
              href={sector.link || '#'}
              onClick={(e) => handleCardClick(sector, e)}
              className={`sector-card ${sector.isActive ? 'active-sector-card' : 'inactive-sector-card'}`}
            >
              {/* Top Accent Line for Active */}
              {sector.isActive && <div className="active-top-accent"></div>}

              <div className="sector-card-header">
                <div className={`sector-category-badge category-${sector.categoryType}`}>
                  <div className="sector-icon">
                    {sector.categoryType === 'construction' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 22h20M12 2v20M6 12l6-6 6 6M6 18h12"/>
                      </svg>
                    )}
                    {sector.categoryType === 'dev' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                      </svg>
                    )}
                    {sector.categoryType === 'support' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                      </svg>
                    )}
                  </div>
                  <span>{sector.category}</span>
                </div>

                {sector.isActive ? (
                  <div className="sector-arrow-btn" aria-label="Explore Construction Services">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                ) : (
                  <span className="coming-soon-pill">Coming Soon</span>
                )}
              </div>

              <div className="sector-card-body">
                <h3 className={`sector-title ${sector.isActive ? 'active-title' : ''}`}>
                  {sector.title}
                </h3>
                <p className="sector-description">{sector.description}</p>
              </div>

              <div className="sector-card-tags">
                <span className="sector-tag">{sector.databaseTag}</span>
                <span className="sector-tag">{sector.deliveryTag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      {modalSector && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-badge-row">
              <span className="modal-status-badge">COMING SOON</span>
            </div>

            <h3 className="modal-title">{modalSector.title} Services</h3>
            <p className="modal-desc">
              We are currently onboarding specialized candidates and establishing dedicated team frameworks for <strong>{modalSector.title}</strong>.
            </p>
            <p className="modal-subtext">
              Right now, our <strong>Construction & AEC</strong> services are fully active and accepting projects starting at $375/week.
            </p>

            <div className="modal-actions">
              <a href="/construction" className="btn btn-primary modal-btn" onClick={closeModal}>
                View Active Construction Services
                <div className="icon-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
              <button className="btn btn-secondary modal-secondary-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSectors;
