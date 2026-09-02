
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" className="logo-brand">
            <span className="logo-symbol">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="var(--primary)" />
                <path d="M7 12L11 16L17 8" stroke="#1b2f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>ConOps <span className="logo-accent">Global</span></span>
          </a>
        </div>
        <nav className="navbar-nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/services" className="nav-link">Services</a>
          <a href="/services#faqs" className="nav-link">FAQs</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="/contact" className="btn btn-primary nav-contact-btn">
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
