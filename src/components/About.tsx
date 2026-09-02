import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sophia Martinez',
    role: 'Managing Director',
    category: 'Executive Search',
    bio: '12+ years shaping executive leadership teams for fast-growing global enterprises.',
    image: 'https://framerusercontent.com/images/RA0jh2y68ywQWHWWQpomMWQ9E.jpg?width=1200&height=1260'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Head of Talent Strategy',
    category: 'Recruitment',
    bio: 'Specialized in building high-performance cross-functional engineering and product teams.',
    image: 'https://framerusercontent.com/images/Lq1gb92gdt14Hyt69zGTsQfPfo.jpg?width=800&height=800'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Director of Operations',
    category: 'Staffing Solutions',
    bio: 'Delivering agile workforce scaling, contract staffing, and interim HR leadership.',
    image: 'https://framerusercontent.com/images/OEpDygq6wqOFQSOyllADSOuI50.jpg?width=800&height=800'
  },
  {
    id: '4',
    name: 'Marcus Vance',
    role: 'Principal Partner',
    category: 'Consulting',
    bio: 'Partnering with founders to align human capital strategies with long-term business goals.',
    image: 'https://framerusercontent.com/images/2E0VB3mgztkUdCsR4DAzOD4L40.jpg?width=800&height=800'
  }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.team-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="container about-container">
        <div ref={headerRef} className="about-header">
          <div className="about-header-left">
            <div className="label">
              <div className="label-square"></div>
              <span>Meet Our Team</span>
            </div>
            <h2 className="section-title about-heading">People-Focused. Results-Driven.</h2>
          </div>

          <div className="about-header-right">
            <p className="about-intro-text">
              With a deep understanding of people, roles, and industry demands, we go beyond filling positions to help you build a high-performing workforce.
            </p>
            <a href="/about" className="btn btn-primary about-btn">
              Learn More
              <div className="icon-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>

        <div ref={gridRef} className="about-team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-media">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-img" 
                />
                <div className="team-card-overlay"></div>
              </div>

              <div className="team-card-top">
                <span className="team-badge">{member.category}</span>
              </div>

              <div className="team-card-bottom">
                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
                <div className="team-social-row">
                  <span className="team-social-link">
                    Connect on LinkedIn
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
