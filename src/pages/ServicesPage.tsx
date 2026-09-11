import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ServicesPage.css';
import Testimonials from '../components/Testimonials';

gsap.registerPlugin(ScrollTrigger);

interface ServiceOfferItem {
  id: string;
  number: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  link: string;
}

const servicesData: ServiceOfferItem[] = [
  {
    id: 'executive-search',
    number: '01',
    category: 'Executive Search',
    title: 'Executive Search',
    desc: "Targeted headhunting for C-suite and VP-level leaders who shape your organization's future.",
    image: 'https://framerusercontent.com/images/yzE85ebgJh3YuomISMRuqz2Yiw4.jpg?width=2000&height=1333',
    link: '/contact?service=executive-search'
  },
  {
    id: 'professional-recruitment',
    number: '02',
    category: 'Recruitment',
    title: 'Professional Recruitment',
    desc: 'End-to-end recruitment for high-impact specialized talent across tech, operations, and finance.',
    image: 'https://framerusercontent.com/images/WebNxmpxaoNoZwSGnWFLjHmBKM.jpg?width=2000&height=1333',
    link: '/contact?service=professional-recruitment'
  },
  {
    id: 'contract-staffing',
    number: '03',
    category: 'Staffing Solutions',
    title: 'Contract Staffing',
    desc: 'Flexible people solutions—agile workforce scaling with pre-vetted contractors and interim leaders.',
    image: 'https://framerusercontent.com/images/TuJ1CJwRxAmL4iXoabS1ZZr57h0.jpg?width=2000&height=1333',
    link: '/contact?service=contract-staffing'
  },
  {
    id: 'talent-strategy-consulting',
    number: '04',
    category: 'Consulting',
    title: 'Talent Strategy Consulting',
    desc: 'Organizational design, compensation benchmarking, and retention strategies to optimize growth.',
    image: 'https://framerusercontent.com/images/hYQ2qYxLPoQ1o0LzB7Sl6gTKFhE.jpg?width=2000&height=1333',
    link: '/contact?service=talent-strategy-consulting'
  }
];

const faqsData = [
  {
    question: 'What industries does ConOps Global specialize in?',
    answer: 'We specialize in Tech & Product, Operations, Finance, Executive Leadership, and Specialized Engineering across high-growth sectors.'
  },
  {
    question: 'How long does the typical candidate placement cycle take?',
    answer: 'Our streamlined search methodology typically delivers a curated shortlist within 5 to 10 days, with final placements completed in 3 to 5 weeks.'
  },
  {
    question: 'Do you work with startups as well as larger enterprise companies?',
    answer: 'Yes. We partner with seed-stage startups, rapidly scaling scale-ups, and established global enterprises requiring specialized people solutions.'
  },
  {
    question: 'What makes ConOps Global different from traditional recruitment firms?',
    answer: 'We operate strictly as a People & Talent Consultancy. Rather than mass-resuming, we offer consultative workforce design, rigorous vetting, and culture-matched placement.'
  },
  {
    question: 'Do you offer contract, fractional, or interim staffing solutions?',
    answer: 'Yes. Our Contract Staffing practice provides pre-vetted, immediate-impact professionals, fractional executives, and dedicated project squads.'
  },
  {
    question: 'Can you help audit and improve our internal hiring process?',
    answer: 'Absolutely. Through our Talent Strategy Consulting service, we audit recruitment pipelines, optimize employer branding, and design competitive compensation frameworks.'
  },
  {
    question: 'How rigorous is your candidate vetting process?',
    answer: 'Every candidate undergoes deep behavioral profiling, technical assessment, reference benchmarking, and alignment checks with your company values.'
  },
  {
    question: 'What geographic locations and time zones do you support?',
    answer: 'We operate internationally, supporting on-site placements in major global hubs as well as distributed, remote-first teams across North America, Europe, and Asia.'
  }
];

const ServicesPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Scroll Reveal
      if (heroRef.current) {
        const heroItems = heroRef.current.querySelectorAll('.reveal-hero');
        gsap.fromTo(
          heroItems,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. What We Offer Section Reveal
      if (offerRef.current) {
        const offerHeader = offerRef.current.querySelector('.sp-section-header');
        const offerCards = offerRef.current.querySelectorAll('.sp-offer-card');

        if (offerHeader) {
          gsap.fromTo(
            offerHeader,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: offerRef.current,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (offerCards.length > 0) {
          gsap.fromTo(
            offerCards,
            { y: 50, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: offerRef.current,
                start: 'top 75%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 3. FAQs Section Reveal
      if (faqRef.current) {
        const faqLeft = faqRef.current.querySelector('.sp-faq-left');
        const faqItems = faqRef.current.querySelectorAll('.sp-faq-item');

        if (faqLeft) {
          gsap.fromTo(
            faqLeft,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: faqRef.current,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        if (faqItems.length > 0) {
          gsap.fromTo(
            faqItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: faqRef.current,
                start: 'top 75%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }

      // 4. CTA Section Reveal
      if (ctaRef.current) {
        const ctaBox = ctaRef.current.querySelector('.sp-cta-container');
        if (ctaBox) {
          gsap.fromTo(
            ctaBox,
            { y: 40, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      }
    }, page);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="services-page">
      {/* Services Hero Section */}
      <section ref={heroRef} className="sp-hero">
        <div className="sp-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
            alt="Consultancy Team" 
          />
          <div className="sp-hero-overlay"></div>
        </div>
        
        <div className="container sp-hero-container">
          <div className="sp-hero-content">
            <div className="label reveal-hero">
              <div className="label-square"></div>
              <span>PEOPLE CONSULTANCY</span>
            </div>
            
            <h1 className="sp-hero-title reveal-hero">
              Smart Hiring Solutions for Every Stage of Growth
            </h1>
            
            <p className="sp-hero-desc reveal-hero">
              Discover consultative people solutions tailored to your organization—strategic, agile, and human-centered.
            </p>

            <div className="sp-hero-actions reveal-hero">
              <a href="/contact" className="btn btn-primary sp-hero-btn">
                Start Hiring With Us
                <div className="icon-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
              <a href="#faqs" className="sp-hero-secondary-link">
                View Frequently Asked Questions ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section ref={offerRef} className="sp-offer-section">
        <div className="container">
          <div className="sp-section-header">
            <div className="label center-label">
              <div className="label-square"></div>
              <span>OUR EXPERTISE</span>
            </div>
            <h2 className="sp-section-title">Comprehensive People Solutions</h2>
            <p className="sp-section-subtitle">
              We provide end-to-end talent acquisition and workforce consulting designed to scale your business with speed and integrity.
            </p>
          </div>
          
          <div className="sp-offer-grid">
            {servicesData.map((item) => (
              <div key={item.id} className="sp-offer-card">
                <div className="sp-offer-img-wrapper">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="sp-offer-img-overlay"></div>
                  <span className="sp-offer-num-badge">{item.number}</span>
                  <span className="sp-offer-cat-pill">{item.category}</span>
                </div>

                <div className="sp-offer-card-content">
                  <div className="sp-offer-card-text">
                    <h3 className="sp-offer-card-title">{item.title}</h3>
                    <p className="sp-offer-card-desc">{item.desc}</p>
                  </div>
                  
                  <a href={item.link} className="sp-offer-btn" aria-label={`Learn more about ${item.title}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section ref={faqRef} className="sp-faq-section" id="faqs">
        <div className="container sp-faq-container">
          <div className="sp-faq-left">
            <div className="label">
              <div className="label-square"></div>
              <span>FAQS</span>
            </div>
            <h2 className="sp-section-title sp-faq-title">Everything You Need to Know</h2>
            <p className="sp-faq-desc">
              Have specific requirements? Our consultancy team is available to structure customized talent and staffing solutions.
            </p>
            <a href="/contact" className="btn btn-primary sp-faq-btn">
              Consult With Our Team
              <div className="icon-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
          
          <div className="sp-faq-right">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`sp-faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button 
                    className="sp-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <h4>{faq.question}</h4>
                    <div className="sp-faq-icon">
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </button>
                  
                  <div className="sp-faq-answer-wrapper">
                    <div className="sp-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section ref={ctaRef} className="sp-cta-section">
        <div className="sp-cta-bg">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80" 
            alt="Business Consultation" 
          />
          <div className="sp-cta-overlay"></div>
        </div>

        <div className="container sp-cta-container">
          <div className="sp-cta-content">
            <div className="label">
              <div className="label-square"></div>
              <span>GET STARTED</span>
            </div>
            <h2 className="sp-cta-title">
              Let's Build Your Next Great Team Together
            </h2>
            <p className="sp-cta-desc">
              Partner with a consultancy that connects your organization with exceptional, vetted talent from day one.
            </p>
            <a href="/contact" className="btn btn-primary sp-cta-btn">
              Get Started Today
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
    </div>
  );
};

export default ServicesPage;
