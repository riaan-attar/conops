import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ContactPage.css';

gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    heardFrom: '',
    message: '',
    mathInput: '',
  });

  // Simple math verification check
  const [num1] = useState(Math.floor(Math.random() * 8) + 2);
  const [num2] = useState(Math.floor(Math.random() * 8) + 1);
  const [mathError, setMathError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Hero Entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.cp-reveal-hero'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }

      // Content Entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.cp-reveal-card'),
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // CTA Entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('.cp-reveal-cta'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 88%',
            },
          }
        );
      }
    }, page);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'mathInput') setMathError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.mathInput.trim(), 10) !== num1 + num2) {
      setMathError(`Incorrect answer. Please solve ${num1} + ${num2}.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="contact-page" ref={pageRef}>
      {/* 1. HERO SECTION */}
      <section className="cp-hero" ref={heroRef}>
        <div className="container text-center">
          <div className="label cp-reveal-hero">
            <span className="label-square"></span>
            GET IN TOUCH
          </div>
          <h1 className="cp-hero-title cp-reveal-hero">
            Start Optimizing Your Operations
          </h1>
          <p className="cp-hero-desc cp-reveal-hero">
            Tell us about your company and workforce needs. Our specialized advisory team for U.S. Concrete & Asphalt contractors will get back to you promptly.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION (FORM + INFO CARDS) */}
      <section className="cp-main-section" ref={contentRef}>
        <div className="container">
          <div className="cp-grid">
            {/* LEFT COLUMN: FORM */}
            <div className="cp-form-wrapper cp-reveal-card">
              {submitted ? (
                <div className="cp-success-card">
                  <div className="cp-success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2>Message Received!</h2>
                  <p>
                    Thank you for reaching out, <strong>{formData.name}</strong>. One of our senior heavy construction consultants will review your request and contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        service: '',
                        heardFrom: '',
                        message: '',
                        mathInput: '',
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="cp-form" onSubmit={handleSubmit}>
                  <h2 className="cp-form-title">Send us a message</h2>

                  <div className="cp-field-group">
                    <label htmlFor="name" className="cp-label">
                      Full Name <span className="cp-required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="cp-input"
                    />
                  </div>

                  <div className="cp-field-group">
                    <label htmlFor="email" className="cp-label">
                      Work Email <span className="cp-required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="cp-input"
                    />
                  </div>

                  <div className="cp-field-group">
                    <label htmlFor="company" className="cp-label">
                      Company / Contractor Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="e.g. Apex Concrete & Paving"
                      value={formData.company}
                      onChange={handleChange}
                      className="cp-input"
                    />
                  </div>

                  <div className="cp-field-group">
                    <label htmlFor="service" className="cp-label">
                      Primary Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="cp-select"
                    >
                      <option value="">Select a service...</option>
                      <option value="Operations & Crew Optimization">Operations & Crew Optimization</option>
                      <option value="Bidding & Estimating Consultation">Bidding & Estimating Consultation</option>
                      <option value="Safety & Compliance Programs">Safety & Compliance Programs</option>
                      <option value="Leadership & Executive Advisory">Leadership & Executive Advisory</option>
                      <option value="Specialized Project Resourcing">Specialized Project Resourcing</option>
                      <option value="Other Advisory Services">Other Advisory Services</option>
                    </select>
                  </div>

                  <div className="cp-field-group">
                    <label htmlFor="heardFrom" className="cp-label">
                      How did you hear about us?
                    </label>
                    <select
                      id="heardFrom"
                      name="heardFrom"
                      value={formData.heardFrom}
                      onChange={handleChange}
                      className="cp-select"
                    >
                      <option value="">Select option...</option>
                      <option value="Google Search">Google Search</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral / Industry Peer">Referral / Industry Peer</option>
                      <option value="Trade Show / Association">Trade Show / Association</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="cp-field-group">
                    <label htmlFor="message" className="cp-label">
                      Message <span className="cp-required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your project, crew requirements, or operational goals..."
                      value={formData.message}
                      onChange={handleChange}
                      className="cp-textarea"
                    ></textarea>
                  </div>

                  {/* SPAM CHECK */}
                  <div className="cp-field-group cp-spam-group">
                    <label htmlFor="mathInput" className="cp-label">
                      Spam check: What is <strong>{num1} + {num2}</strong>? <span className="cp-required">*</span>
                    </label>
                    <input
                      id="mathInput"
                      type="number"
                      name="mathInput"
                      required
                      placeholder="Enter answer"
                      value={formData.mathInput}
                      onChange={handleChange}
                      className={`cp-input ${mathError ? 'cp-input-error' : ''}`}
                    />
                    {mathError && <span className="cp-error-msg">{mathError}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary cp-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: CONTACT CARDS */}
            <div className="cp-info-cards cp-reveal-card">
              {/* Email Card */}
              <a href="mailto:info@conopsglobal.com" className="cp-info-card">
                <div className="cp-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="cp-info-body">
                  <h3>Email Advisory Team</h3>
                  <p className="cp-info-val">info@conopsglobal.com</p>
                  <p className="cp-info-sub">Fast response within 2–4 business hours</p>
                </div>
              </a>

              {/* Phone Card */}
              <a href="tel:+18005552666" className="cp-info-card">
                <div className="cp-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="cp-info-body">
                  <h3>Direct Toll-Free Line</h3>
                  <p className="cp-info-val">+1 (800) 555-2666</p>
                  <p className="cp-info-sub">Mon – Fri: 8:00 AM – 6:00 PM EST</p>
                </div>
              </a>

              {/* Schedule Call Card */}
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cp-info-card cp-info-card-featured"
              >
                <div className="cp-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="cp-info-body">
                  <h3>Schedule a Direct Call</h3>
                  <p className="cp-info-sub">Book a 15-minute consultation directly on our executive calendar.</p>
                  <span className="cp-card-link">
                    Book Now
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </a>

              {/* Office Locations */}
              <div className="cp-info-card">
                <div className="cp-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="cp-info-body">
                  <h3>Corporate Headquarters</h3>
                  <p className="cp-info-val">Houston, Texas</p>
                  <p className="cp-info-sub">Serving Concrete & Asphalt Contractors Nationwide across the U.S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIRECT SCHEDULING BANNER */}
      <section className="cp-cta-section" ref={ctaRef}>
        <div className="container text-center">
          <h2 className="cp-cta-title cp-reveal-cta">
            Prefer to schedule directly?
          </h2>
          <p className="cp-cta-desc cp-reveal-cta">
            Pick a time that works best for your team, and our senior heavy construction consultants will walk you through customized solutions.
          </p>
          <div className="cp-reveal-cta">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cp-cta-btn"
            >
              Book a Call on Calendly
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
