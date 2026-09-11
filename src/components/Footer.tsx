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
              <a href="/uses">Uses</a>
              <a href="/stewardship">Stewardship</a>
              <a href="/technology">Technology</a>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom-row">
          <div className="footer-legal">
            &copy; {new Date().getFullYear()} ConOps Global
          </div>
          <div className="footer-location">
            Based in San Francisco, California
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
