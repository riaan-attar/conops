
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo-brand">
              <span className="logo-symbol">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="var(--primary)" />
                  <path d="M7 12L11 16L17 8" stroke="#1b2f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>ConOps <span className="logo-accent">Global</span></span>
            </a>
            <p className="footer-desc">
              Empowering companies with the talent they need to move forward.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/services">Services</a>
              <a href="/careers">Careers</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="/blog">Blog</a>
              <a href="/services#faqs">FAQs</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ConOps Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
