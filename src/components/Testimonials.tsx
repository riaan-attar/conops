
import '../styles/Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "“From initial consultation to final interview, the experience was exceptional. They provided a curated shortlist of high-quality candidates who exceeded expectations.”",
      name: "James P.",
      position: "Founder",
      image: "https://framerusercontent.com/images/Lq1gb92gdt14Hyt69zGTsQfPfo.jpg?width=800&height=800"
    },
    {
      text: "“The level of candidate quality was outstanding. Every person they presented was a real contender. ConOps Global has become our go-to partner for all critical hires.”",
      name: "Melissa R.",
      position: "Talent Acquisition Manager",
      image: "https://framerusercontent.com/images/OEpDygq6wqOFQSOyllADSOuI50.jpg?width=800&height=800"
    },
    {
      text: "“We've partnered with many talent consultancies, but none delivered the consistency and quality that ConOps Global provides. They're our go-to for every critical hire.”",
      name: "Alicia T.",
      position: "Founder & CEO",
      image: "https://framerusercontent.com/images/n7E1GT1fpTfsMwiUH2ptPcj60Cw.jpg?width=800&height=800"
    },
    {
      text: "“Thanks to ConOps Global, we filled a critical leadership role in record time. Their professionalism, communication, and insight were unmatched. Highly recommended.”",
      name: "Monica L.",
      position: "COO",
      image: "https://framerusercontent.com/images/qGMKkDoj09djB7dKmEOpGkXQDaA.jpg?width=800&height=800"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container testimonials-container">
        <div className="label">
          <div className="label-square"></div>
          <span>Testimonials</span>
        </div>
        <h2 className="section-title">What Our Clients Say</h2>
        
        <div className="testimonials-wrap">
          <div className="testimonials-left">
            <div className="testimonials-left-bg">
              <img src="https://framerusercontent.com/images/icYPXd8SSSOjYMBCrrdGyzOcsc.jpg?width=1200&height=1128" alt="Testimonials" />
              <div className="testimonials-overlay"></div>
            </div>
            <div className="testimonials-left-content">
              <div className="testimonials-rating-huge">
                <span className="rating-num">4.9</span>
                <span className="rating-max"> / 5</span>
              </div>
              <div className="testimonials-stars-huge">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="32" height="32" viewBox="0 0 20 20" fill="var(--white)">
                    <path d="M 10 0.955 L 12.234 7.881 L 19.511 7.865 L 13.614 12.129 L 15.878 19.045 L 10 14.755 L 4.122 19.045 L 6.386 12.129 L 0.489 7.865 L 7.766 7.881 Z" />
                  </svg>
                ))}
              </div>
              <p className="testimonials-left-desc">Based on Client Reviews</p>
            </div>
          </div>
          
          <div className="testimonials-right">
            <div className="testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="var(--primary)">
                        <path d="M 10 0.955 L 12.234 7.881 L 19.511 7.865 L 13.614 12.129 L 15.878 19.045 L 10 14.755 L 4.122 19.045 L 6.386 12.129 L 0.489 7.865 L 7.766 7.881 Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} className="author-img" />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-position">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
