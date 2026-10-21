import React from 'react';
import '../styles/MediaPage.css';

const MediaPage: React.FC = () => {
  return (
    <div className="media-page">
      {/* 1. Hero Section */}
      <section className="mp-hero">
        <div className="mp-hero-bg">
          <img src="/images/about_hero.jpg" alt="ConOps Global Press & Media Room" />
        </div>
        <div className="container">
          <div className="mp-hero-content">
            <div className="label">
              <div className="label-square"></div>
              <span>PRESS & EXECUTIVE MEDIA ROOM</span>
            </div>
            <h1 className="mp-hero-title">
              ConOps Global Media Center & Executive Press Kit
            </h1>
            <p className="mp-hero-desc">
              Official press resources, company fact sheet, executive biography for founder Amit Gole, and media assets covering our managed civil engineering workforce model.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Official Executive Bio: Amit Gole */}
      <section className="mp-bio-section">
        <div className="container">
          <div className="mp-bio-grid">
            <div className="mp-bio-media">
              <img
                src="/images/founder.jpeg"
                alt="Amit Gole - Founder & Managing Consultant, ConOps Global"
                className="mp-bio-img"
              />
              <div className="mp-bio-badge">
                <strong>Amit Gole</strong>
                <span>Founder & Principal Managing Consultant</span>
              </div>
            </div>

            <div className="mp-bio-content">
              <div className="label">
                <div className="label-square"></div>
                <span>EXECUTIVE BIOGRAPHY</span>
              </div>
              <h2>Amit Gole</h2>
              <div className="mp-bio-role">
                Founder & Principal Managing Consultant • Civil Infrastructure Specialist
              </div>

              <p className="mp-bio-text">
                Amit Gole is the Founder and Principal Consultant of ConOps Global. With over 15 years of hands-on leadership inside prominent US civil engineering, asphalt paving, and heavy infrastructure firms, Amit has managed high-stakes highway resurfacing projects, ready-mix concrete batch operations, and complex structural estimating workflows.
              </p>

              <p className="mp-bio-text">
                Recognizing the severe labor shortage impacting American civil contractors, Amit established ConOps Global in 2017 to bridge the technical gap. Under his direction, ConOps Global connects US contractors with pre-vetted remote estimators, project engineers, and Procore administrators trained to rigorous State DOT, AASHTO, and ACI standards.
              </p>

              <div className="mp-bio-actions">
                <a
                  href="https://in.linkedin.com/in/amit-gole-1b6306144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-linkedin-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
                <a href="/contact" className="btn btn-primary">
                  Request Media Briefing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Fact Sheet */}
      <section className="mp-facts-section">
        <div className="container">
          <div className="label">
            <div className="label-square"></div>
            <span>COMPANY FACT SHEET</span>
          </div>
          <h2>ConOps Global at a Glance</h2>

          <div className="mp-facts-grid">
            <div className="mp-fact-card">
              <div className="mp-fact-number">2017</div>
              <div className="mp-fact-label">Founded by Amit Gole</div>
            </div>
            <div className="mp-fact-card">
              <div className="mp-fact-number">250+</div>
              <div className="mp-fact-label">US Contracting Partners</div>
            </div>
            <div className="mp-fact-card">
              <div className="mp-fact-number">$375/wk</div>
              <div className="mp-fact-label">Starting Remote Rate</div>
            </div>
            <div className="mp-fact-card">
              <div className="mp-fact-number">7-14 Days</div>
              <div className="mp-fact-label">Average Delivery Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Press Announcements */}
      <section className="mp-releases-section">
        <div className="container">
          <div className="label">
            <div className="label-square"></div>
            <span>PRESS RELEASES & ANNOUNCEMENTS</span>
          </div>
          <h2>Recent News & Industry Updates</h2>

          <div className="mp-releases-list">
            <div className="mp-release-item">
              <div>
                <div className="mp-release-date">October 2026</div>
                <h3 className="mp-release-title">
                  ConOps Global Expands Dedicated Concrete Estimating &amp; Project Controls Pipeline
                </h3>
                <p className="mp-release-desc">
                  Founder Amit Gole announced the expansion of pre-vetted civil estimating and Primavera P6 scheduling talent specifically calibrated for US heavy civil contractors facing bidding capacity crunches.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Media Inquiry
              </a>
            </div>

            <div className="mp-release-item">
              <div>
                <div className="mp-release-date">August 2026</div>
                <h3 className="mp-release-title">
                  Amit Gole Launches Flat-Rate $375/Week Remote Project Management Support
                </h3>
                <p className="mp-release-desc">
                  ConOps Global introduced an all-in-one offshore Project Manager solution combining quantity takeoffs, RFI submittals, and Procore administration into a single dedicated resource.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Media Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPage;
