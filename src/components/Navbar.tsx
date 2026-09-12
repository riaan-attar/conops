import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" className="logo-brand">
            <img src="/logo.png" alt="ConOps Global" className="nav-logo-img" />
          </a>
        </div>
        <nav className={`navbar-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="/services#faqs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>FAQs</a>

          <a href="/contact" className="btn btn-primary nav-contact-btn nav-contact-desktop" onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </a>
        </nav>
        {/* Contact Us visible directly in mobile navbar bar */}
        <a href="/contact" className="btn btn-primary nav-contact-mobile-inline">
          Contact Us
        </a>
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
