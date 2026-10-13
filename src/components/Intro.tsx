
import '../styles/Intro.css';

const Intro: React.FC = () => {
  return (
    <section className="intro-section">
      <div className="container intro-container">
        <h2 className="intro-text">
          We become an <span className="text-highlight">extension of your team</span>, providing the expertise and <span className="text-highlight">operational support</span> you need to move forward. We handle the work behind the scenes so you can <span className="text-highlight">focus on growth.</span>
        </h2>
      </div>
    </section>
  );
};

export default Intro;
