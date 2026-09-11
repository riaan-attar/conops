import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" className="logo-brand">
            <img src="/logo.png" alt="ConOps Global" className="nav-logo-img" />
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
