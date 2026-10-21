import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">

        <div className="footer-top-row">
          <div className="footer-logo">
            <img src="/logo.png" alt="ConOps Global Logo" className="footer-logo-img" />
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>GET IN TOUCH</h4>
              <a href="/media">Media</a>
              <a href="/careers">Careers</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <a href="/about">About</a>
              <a href="/faq">FAQ</a>
              <a href="/services">Services</a>
              <a href="/construction">Construction</a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <div className="footer-legal">
            &copy; {new Date().getFullYear()} ConOps Global. Founded by{' '}
            <a
              href="https://in.linkedin.com/in/amit-gole-1b6306144"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Amit Gole
            </a>
            . All rights reserved.
          </div>
          <div className="footer-credits">
            <span>Developed by </span>
            <a
              href="https://riaanattar.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-developer-link"
            >
              Riaan Attar
            </a>
          </div>
          <div className="footer-location">
            Managed Remote Workforce & Civil Engineering Talent
          </div>
        </div>

      </div>

      <div className="footer-massive-text">
        CONOPS
      </div>
    </footer>
  );
};

export default Footer;
