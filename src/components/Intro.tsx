
import '../styles/Intro.css';

const Intro: React.FC = () => {
  return (
    <section className="intro-section">
      <div className="container intro-container">
        <h2 className="intro-text">
          At <strong className="text-highlight">ConOps Global</strong>, led by <strong className="text-highlight">Amit Gole</strong>, we become an <span className="text-highlight">extension of your team</span>, providing the expertise and <span className="text-highlight">operational support</span> you need to scale. We handle heavy civil estimating, project controls, and administration behind the scenes so you can <span className="text-highlight">focus on growth.</span>
        </h2>
      </div>
    </section>
  );
};

export default Intro;
