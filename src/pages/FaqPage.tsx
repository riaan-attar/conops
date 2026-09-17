import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/FaqPage.css';

gsap.registerPlugin(ScrollTrigger);

export interface FaqItem {
  id: string;
  category: 'general' | 'pricing' | 'process' | 'management' | 'workforce';
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  // General (5)
  {
    id: 'g1',
    category: 'general',
    question: 'What is ConOps Global?',
    answer: 'ConOps Global is a managed workforce partner that places full-time, exclusively assigned remote professionals (engineers, estimators, project coordinators, superintendents, and support staff) from India and the Philippines for US companies. ConOps Global employs them directly and handles all HR, payroll, compliance, equipment, onboarding, and performance monitoring.'
  },
  {
    id: 'g2',
    category: 'general',
    question: 'How is ConOps Global different from a staffing agency?',
    answer: 'ConOps Global is not a staffing agency. We employ all remote professionals directly as their legal employer. We manage ongoing HR, payroll, benefits, IT equipment, and performance oversight—traditional staffing agencies merely place candidates and walk away.'
  },
  {
    id: 'g3',
    category: 'general',
    question: 'What countries does ConOps Global hire from?',
    answer: 'We hire specialized technical talent from India (Pune, Rajkot) for civil engineering, construction, asphalt/concrete operations, software, and heavy infrastructure roles. We source from the Philippines (Manila) for customer support, virtual assistants, and business administrative operations.'
  },
  {
    id: 'g4',
    category: 'general',
    question: 'How long has ConOps Global been operating?',
    answer: 'Founded in 2017, ConOps Global has over 9 years of operational excellence, serving over 250+ US companies across civil engineering, heavy contracting, technology, and professional services.'
  },
  {
    id: 'g5',
    category: 'general',
    question: 'What is our specialized civil engineering & technical division?',
    answer: 'Our specialized civil engineering division—led by US firm veterans—places estimators, CAD drafters, project engineers, Procore admins, and material quality control leads specifically tailored for heavy civil, concrete, and asphalt contractors.'
  },

  // Pricing (4)
  {
    id: 'pr1',
    category: 'pricing',
    question: 'How much does it cost?',
    answer: 'Our transparent pricing ranges from $375 to $1,200 per week all-inclusive. This single flat rate covers the professional’s salary, benefits, company-issued equipment, software licenses, HR management, and ongoing compliance.'
  },
  {
    id: 'pr2',
    category: 'pricing',
    question: 'Are there setup or recruiting fees?',
    answer: 'No. There are zero setup fees, zero recruiting fees, and zero termination or replacement fees.'
  },
  {
    id: 'pr3',
    category: 'pricing',
    question: 'How is billing handled?',
    answer: 'Billing is handled on a simple weekly basis. We do not require long-term annual contracts or large upfront capital commitments.'
  },
  {
    id: 'pr4',
    category: 'pricing',
    question: 'What is included in the weekly rate?',
    answer: 'Everything: the professional’s salary, health benefits, dedicated laptop equipment, standard software (Slack, Teams, Zoom), HR administration, tax compliance, and active performance oversight.'
  },

  // Process (4)
  {
    id: 'pc1',
    category: 'process',
    question: 'How fast can ConOps Global deliver candidates?',
    answer: 'We deliver a curated shortlist of 2 to 3 pre-vetted candidates within 7 to 14 business days.'
  },
  {
    id: 'pc2',
    category: 'process',
    question: 'Can I interview candidates before hiring?',
    answer: 'Yes. ConOps Global presents shortlisted candidates complete with resumes, work samples, and technical portfolios. You conduct your own internal interviews to make the final hiring decision.'
  },
  {
    id: 'pc3',
    category: 'process',
    question: 'What happens if a candidate doesn’t work out?',
    answer: 'We provide a free replacement candidate within 7 to 14 business days. There are no termination penalties or additional replacement charges.'
  },
  {
    id: 'pc4',
    category: 'process',
    question: 'Do remote professionals work in US time zones?',
    answer: 'Yes. All ConOps Global professionals operate during your standard US business hours (Eastern, Central, Mountain, or Pacific) to ensure seamless daily communication.'
  },

  // Management (9)
  {
    id: 'm1',
    category: 'management',
    question: 'How does ConOps Global monitor performance?',
    answer: 'We utilize We360 for daily activity monitoring, time tracking, and task reporting, backed by weekly performance summaries provided by your dedicated account manager.'
  },
  {
    id: 'm2',
    category: 'management',
    question: 'Who manages the professionals day-to-day?',
    answer: 'ConOps Global manages all legal employment, HR, benefits, and workplace performance. The professional reports directly to your team for daily work assignments and project tasks.'
  },
  {
    id: 'm3',
    category: 'management',
    question: 'What equipment do remote professionals receive?',
    answer: 'ConOps Global supplies company-issued laptops, dual monitors on request, noise-canceling headsets, and ergonomic workstation setups, all monitored and maintained by our IT team.'
  },
  {
    id: 'm4',
    category: 'management',
    question: 'How does ConOps Global protect client intellectual property?',
    answer: 'IP is protected through three strict layers: every professional signs a comprehensive confidentiality and IP assignment agreement prior to placement (100% of work product transfers to client), company laptops feature disk encryption and USB restrictions, and our physical hubs operate with badge-controlled access.'
  },
  {
    id: 'm5',
    category: 'management',
    question: 'Are NDAs signed by every professional?',
    answer: 'Yes. Master NDAs covering confidentiality and non-disclosure of client trade secrets are signed as a standard condition of employment before onboarding. Clients can also layer their own custom NDA on top.'
  },
  {
    id: 'm6',
    category: 'management',
    question: 'How are equipment, software licenses, and workspace handled?',
    answer: 'We supply each team member with high-performance hardware, dual monitors, and standard tools (Slack, Teams, Zoom). Client-specific software (Procore, Revit, Bluebeam, AutoCAD, Salesforce) is licensed by the client and installed by our IT team during onboarding.'
  },
  {
    id: 'm7',
    category: 'management',
    question: 'What happens if a worker leaves the company?',
    answer: 'If a worker resigns, replacement sourcing begins immediately at zero cost with a 7–14 day target delivery. We maintain a 95%+ client retention rate because we directly manage compensation, growth paths, and HR support that prevent attrition.'
  },
  {
    id: 'm8',
    category: 'management',
    question: 'Which communication tools do remote workers use to coordinate with US teams?',
    answer: 'Professionals integrate directly into your existing communication stack (Slack, MS Teams, Zoom, Google Meet, Asana, Jira, Procore, GitHub) with daily standups scheduled in your time zone.'
  },
  {
    id: 'm9',
    category: 'management',
    question: 'How are performance and quality monitored throughout the engagement?',
    answer: 'Performance is tracked on three cycles: daily activity metrics, weekly performance summaries from your account manager, and monthly alignment calls between your lead, the account manager, and the worker.'
  },

  // Workforce (2)
  {
    id: 'w1',
    category: 'workforce',
    question: 'How do remote teams overlap with US business hours?',
    answer: 'Remote teams work shifted schedules from India or the Philippines to provide 4 to 8 hours of direct daily overlap with US Eastern, Central, Mountain, or Pacific time, depending on your team’s requirements.'
  },
  {
    id: 'w2',
    category: 'workforce',
    question: 'What English proficiency should we expect from India and Philippines hires?',
    answer: 'English proficiency is exceptionally strong as English is the primary language of business and higher education in both regions. Every candidate is rigorously screened for written and spoken fluency before placement.'
  }
];

type CategoryFilter = 'all' | 'general' | 'pricing' | 'process' | 'management' | 'workforce';

const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const revealItems = heroRef.current.querySelectorAll('.reveal-faq-hero');
        gsap.fromTo(
          revealItems,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 92%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    }, page);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const categoryCounts = useMemo(() => {
    const counts = {
      all: faqData.length,
      general: 0,
      pricing: 0,
      process: 0,
      management: 0,
      workforce: 0
    };
    faqData.forEach(item => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoriesList: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'process', label: 'Process' },
    { id: 'management', label: 'Management' },
    { id: 'workforce', label: 'Workforce' }
  ];

  const categoriesOrder: { id: FaqItem['category']; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'process', label: 'Process' },
    { id: 'management', label: 'Management' },
    { id: 'workforce', label: 'Workforce' }
  ];

  const groupedFaqs = useMemo(() => {
    const groups: { category: FaqItem['category']; label: string; items: FaqItem[] }[] = [];

    categoriesOrder.forEach(cat => {
      if (selectedCategory === 'all' || selectedCategory === cat.id) {
        const items = filteredFaqs.filter(faq => faq.category === cat.id);
        if (items.length > 0) {
          groups.push({
            category: cat.id,
            label: cat.label,
            items
          });
        }
      }
    });

    return groups;
  }, [filteredFaqs, selectedCategory]);

  return (
    <div ref={pageRef} className="faq-page">
      {/* Hero Section */}
      <section ref={heroRef} className="faq-hero">
        <div className="container faq-hero-container">
          <div className="label reveal-faq-hero">
            <div className="label-square"></div>
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h1 className="faq-hero-title reveal-faq-hero">
            Frequently Asked Questions
          </h1>

          <p className="faq-hero-subtitle reveal-faq-hero">
            Everything you need to know about ConOps Global services, pricing, talent vetting, management model, and US time-zone delivery. Can't find what you're looking for? <a href="/contact" className="faq-contact-inline">Talk to our team</a>.
          </p>

          {/* Search Input Box */}
          <div className="faq-search-wrapper reveal-faq-hero">
            <div className="faq-search-box">
              <svg className="faq-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search questions (e.g., pricing, NDA, Procore, time zone)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
              {searchQuery && (
                <button 
                  className="faq-search-clear" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="faq-categories-row reveal-faq-hero">
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`faq-cat-pill ${selectedCategory === cat.id ? 'active-cat-pill' : ''}`}
              >
                <span>{cat.label}</span>
                <span className="faq-cat-count">{categoryCounts[cat.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Questions List Grouped by Category */}
      <section className="faq-list-section">
        <div className="container">
          <div ref={faqListRef} className="faq-list-wrapper">
            {groupedFaqs.length > 0 ? (
              groupedFaqs.map((group) => (
                <div key={group.category} className="faq-category-group">
                  <div className="faq-category-header">
                    <div className="label">
                      <div className="label-square"></div>
                      <span>CATEGORY</span>
                    </div>
                    <div className="faq-category-title-row">
                      <h2 className="faq-category-title">{group.label}</h2>
                      <span className="faq-category-count-pill">{group.items.length} Questions</span>
                    </div>
                  </div>

                  <div className="faq-group-items">
                    {group.items.map((faq) => {
                      const isExpanded = expandedId === faq.id;
                      return (
                        <div 
                          key={faq.id} 
                          className={`faq-accordion-card ${isExpanded ? 'is-open' : ''}`}
                        >
                          <button
                            className="faq-accordion-header"
                            onClick={() => toggleAccordion(faq.id)}
                            aria-expanded={isExpanded}
                          >
                            <div className="faq-question-col">
                              <span className="faq-category-tag">{faq.category}</span>
                              <h3 className="faq-question-text">{faq.question}</h3>
                            </div>
                            <div className="faq-toggle-icon">
                              <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                className={`icon-chevron ${isExpanded ? 'rotate-180' : ''}`}
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="faq-accordion-body">
                              <p className="faq-answer-text">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Horizontal Rule After Category */}
                  <hr className="faq-category-hr" />
                </div>
              ))
            ) : (
              <div className="faq-empty-state">
                <div className="faq-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3>No matching questions found</h3>
                <p>Try refining your search terms or selecting a different category filter.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA Banner */}
      <section className="faq-cta-section">
        <div className="container">
          <div className="faq-cta-box">
            <div className="faq-cta-content">
              <div className="label">
                <div className="label-square"></div>
                <span>DIRECT CONSULTATION</span>
              </div>
              <h2 className="faq-cta-title">Still have questions?</h2>
              <p className="faq-cta-desc">
                Our team is ready to walk you through our managed workforce model, candidate vetting, and customized pricing starting at $375/week.
              </p>

              <div className="faq-cta-actions">
                <a href="/contact" className="btn btn-primary faq-cta-btn">
                  Book a Free Consultation
                  <div className="icon-box">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>

                <a href="mailto:info@conopsglobal.com" className="btn btn-white faq-email-btn">
                  Email Us Directly
                </a>
              </div>

              <p className="faq-cta-trust">
                Trusted by 250+ U.S. companies across heavy civil, construction, and engineering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
