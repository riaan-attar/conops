import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Goal.css';

gsap.registerPlugin(ScrollTrigger);

const Goal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (topRef.current) {
        gsap.fromTo(
          topRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="goal-section">
      <div className="container goal-container">
        <div ref={topRef} className="goal-top">
          <div className="goal-heading-col">
            <div className="label">
              <div className="label-square"></div>
              <span>Our Goal</span>
            </div>
            <h2 className="goal-title">Connect You with the Right People Quickly and Effectively</h2>
            <p className="goal-desc">
              Our clients trust us to deliver consistent recruiting results, unmatched candidate quality, and a partnership built on integrity.
            </p>
          </div>

          <div className="goal-trust-block">
            <div className="trust-card-box">
              <div className="trust-photos">
                <img src="/images/team_1.jpg" alt="Consultant Photo" className="trust-photo" />
                <img src="/images/team_2.jpg" alt="Site Photo" className="trust-photo" />
                <img src="/images/team_3.jpg" alt="Engineer Photo" className="trust-photo" />
                <img src="/images/team_4.jpg" alt="Project Photo" className="trust-photo" />
              </div>

              <div className="trust-stats">
                <div className="trust-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="var(--primary)">
                      <path d="M 10 0.955 L 12.234 7.881 L 19.511 7.865 L 13.614 12.129 L 15.878 19.045 L 10 14.755 L 4.122 19.045 L 6.386 12.129 L 0.489 7.865 L 7.766 7.881 Z" />
                    </svg>
                  ))}
                </div>
                <div className="trust-score"><strong>4.9/5</strong></div>
                <div className="trust-text">200+ Contracting Partners</div>
              </div>
            </div>
          </div>
        </div>

        <div ref={videoRef} className="goal-video">
          <div className="video-icon">
            <svg width="54" height="54" viewBox="0 0 120 120" fill="none">
              <path d="M 102.429 17.571 C 91.093 6.244 76.029 0 60 0 C 43.971 0 28.907 6.242 17.571 17.571 C 6.244 28.907 0 43.971 0 60 C 0 76.029 6.242 91.093 17.571 102.429 C 28.907 113.756 43.971 120 60 120 C 76.029 120 91.093 113.758 102.429 102.429 C 113.756 91.093 120 76.029 120 60 C 120 43.971 113.758 28.907 102.429 17.571 Z" fill="rgba(255,255,255,0.92)" />
              <path d="M 44.799 83.276 L 85.097 60 L 44.799 36.724 Z" fill="var(--primary)" />
            </svg>
          </div>
          <img src="/images/service_operations.jpg" alt="Asphalt & Concrete Operations Video" className="video-cover" />
        </div>
      </div>
    </section>
  );
};

export default Goal;
