
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg">
        <video 
          src="/videos/hero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="label">
            <div className="label-square"></div>
            <span>People Consultancy</span>
          </div>
          
          <h1 className="hero-title">
            Connecting Companies with Exceptional Talent
          </h1>
          
          <p className="hero-subtitle">
            We bridge the gap between top-performing professionals and forward-thinking companies and organizations.
          </p>
          
          <a href="/contact" className="btn btn-white hero-btn">
            Start Recruiting
            <div className="icon-box">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
