import React from 'react';
import '../styles/ComingSoon.css';

interface ComingSoonProps {
  label: string;
  title: string;
  description: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ label, title, description }) => {
  return (
    <section className="coming-soon-section">
      <div className="container coming-soon-container">
        <div className="coming-soon-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>

        <div className="label coming-soon-label">
          <div className="label-square"></div>
          <span>{label}</span>
        </div>

        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-desc">{description}</p>

        <div className="coming-soon-actions">
          <a href="/contact" className="btn btn-primary coming-soon-btn">
            Contact Us
            <div className="icon-box">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
          <a href="/" className="coming-soon-back-link">Back to Home</a>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
