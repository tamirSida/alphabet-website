'use client';

import { useState } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';
import { FAQ } from '@/lib/types/cms';

interface FAQSectionProps {
  faqs: FAQ[];
  onEdit?: (faq?: FAQ) => void;
  onDelete?: (faq: FAQ) => void;
}

export default function FAQSection({ faqs, onEdit, onDelete }: FAQSectionProps) {
  const { isAdminMode } = useAdmin();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Default FAQ data
  const defaultFAQs: FAQ[] = [
    {
      id: 'faq-1',
      question: 'Who is eligible for the Alpha-Bet program?',
      answer: 'The program is designed for US and Israeli combat veterans who have completed their military service and are ready to transition their leadership skills into entrepreneurship. You should be in the ideation phase or early stages of developing a business concept.',
      order: 1,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'faq-2',
      question: 'Is there any cost to participate?',
      answer: 'No, the Alpha-Bet program is completely free for qualifying veterans. This includes all workshops, mentorship sessions, resources, and networking opportunities throughout the 10-week program.',
      order: 2,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'faq-3',
      question: 'What time commitment is required?',
      answer: 'The program requires approximately 8-10 hours per week over 10 weeks. This includes live workshops, self-paced learning modules, peer collaboration sessions, and practical assignments to develop your business concept.',
      order: 3,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'faq-4',
      question: 'Is the program conducted online or in-person?',
      answer: 'The Alpha-Bet program is conducted entirely online, making it accessible to veterans regardless of location. All workshops, mentorship sessions, and networking events are held virtually using modern collaboration platforms.',
      order: 4,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'faq-5',
      question: 'Do I need to have a business idea already?',
      answer: 'Not necessarily. While some participants come with existing ideas, others join to find co-founders and develop concepts together. The program includes dedicated ideation workshops and partner-matching opportunities.',
      order: 5,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'faq-6',
      question: 'What kind of support continues after graduation?',
      answer: 'Graduates join our exclusive alumni network with ongoing access to mentors, investors, and fellow veteran entrepreneurs. We also provide continued resources, quarterly check-ins, and opportunities for advanced workshops.',
      order: 6,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Merge CMS FAQs with defaults
  const mergeFAQsWithDefaults = () => {
    const merged = [...defaultFAQs];
    
    faqs.forEach(cmsFaq => {
      const defaultIndex = merged.findIndex(defaultFaq => 
        defaultFaq.order === cmsFaq.order
      );
      if (defaultIndex !== -1) {
        merged[defaultIndex] = cmsFaq;
      } else {
        merged.push(cmsFaq);
      }
    });
    
    return merged.filter(faq => faq.isVisible !== false).sort((a, b) => a.order - b.order);
  };

  const displayFAQs = mergeFAQsWithDefaults();

  const handleFAQClick = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleEditClick = (faq: FAQ, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(faq);
    }
  };

  const handleDeleteClick = (faq: FAQ, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this FAQ?')) {
      onDelete(faq);
    }
  };

  const handleAddClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span className="text-gray-600 text-sm font-medium tracking-wide">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Questions & Answers
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about the Alpha-Bet program and application process.
          </p>
        </div>

        {/* Admin Add Button */}
        {isAdminMode && (
          <div className="mb-8 text-center">
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg"
            >
              <i className="fas fa-plus"></i>
              <span>Add FAQ</span>
            </button>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {displayFAQs.map((faq) => (
            <div
              key={faq.id}
              className="relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Admin Buttons */}
              {isAdminMode && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => handleEditClick(faq, e)}
                    className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center text-sm transition-colors shadow-lg"
                    title="Edit this FAQ"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  {!faq.id.startsWith('faq-') && (
                    <button
                      onClick={(e) => handleDeleteClick(faq, e)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center text-sm transition-colors shadow-lg"
                      title="Delete this FAQ"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              )}

              {/* Question Header */}
              <button
                onClick={() => handleFAQClick(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8 leading-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 text-gray-500">
                  {expandedFAQ === faq.id ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </div>
              </button>

              {/* Answer Content */}
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-5 border-t border-gray-200 bg-white">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
              Our team is here to help you understand if Alpha-Bet is the right fit for your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@alphabetprogram.com"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                <i className="fas fa-envelope"></i>
                <span>Contact Us</span>
              </a>
              <a
                href="/apply"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-all duration-300"
              >
                <i className="fas fa-rocket"></i>
                <span>Apply Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}