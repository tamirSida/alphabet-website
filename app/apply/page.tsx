'use client';

import { useState } from 'react';
import BottomNavigation from '@/components/public/bottom-navigation';
import SEOHead from '@/components/seo/SEOHead';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    militaryBranch: '',
    yearsOfService: '',
    country: '',
    businessIdea: '',
    whyApplying: '',
    commitment: false,
    newsletter: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Enable URL-based admin access
  useUrlAdminAccess();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <>
        <SEOHead
          title="Application Submitted - Alpha-Bet Program"
          description="Thank you for applying to Alpha-Bet! Your application has been received and our team will contact you within 2-3 business days with next steps."
          noindex={true}
        />
        <div className="relative">
          {/* Discrete Admin Access Components */}
          <DiscreteAdminAccess />
          <DiscreteAdminDot />
          <SimpleAdminToggle />
          
          {/* Success Message */}
          <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="fas fa-check text-2xl text-white"></i>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Application Submitted!
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                Thank you for your interest in the Alpha-Bet program. We've received your application and will review it carefully. 
                Our team will contact you within 2-3 business days with next steps.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
                <h3 className="text-xl font-bold mb-4">What happens next?</h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-envelope text-green-400 mt-1"></i>
                    <span>You'll receive a confirmation email within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-phone text-green-400 mt-1"></i>
                    <span>Our team will schedule a preliminary interview</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-users text-green-400 mt-1"></i>
                    <span>If selected, you'll meet with program leadership</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-rocket text-green-400 mt-1"></i>
                    <span>Final candidates will be notified of acceptance</span>
                  </li>
                </ul>
              </div>
              
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                <i className="fas fa-home"></i>
                <span>Return Home</span>
              </a>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      {/* Discrete Admin Access Components */}
      <DiscreteAdminAccess />
      <DiscreteAdminDot />
      <SimpleAdminToggle />
      
      {/* Page Header */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/80 text-sm font-medium tracking-wide">APPLICATION</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Apply to Alpha-Bet
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to begin your entrepreneurial journey? Complete the application below to join our next cohort of veteran entrepreneurs.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Military Background */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Military Background</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Military Branch *
                  </label>
                  <select
                    name="militaryBranch"
                    value={formData.militaryBranch}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select branch</option>
                    <option value="us-army">US Army</option>
                    <option value="us-navy">US Navy</option>
                    <option value="us-air-force">US Air Force</option>
                    <option value="us-marines">US Marines</option>
                    <option value="us-coast-guard">US Coast Guard</option>
                    <option value="us-space-force">US Space Force</option>
                    <option value="idf">Israel Defense Forces (IDF)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Service *
                  </label>
                  <input
                    type="text"
                    name="yearsOfService"
                    value={formData.yearsOfService}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="e.g., 2018-2024"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="israel">Israel</option>
                </select>
              </div>
            </div>

            {/* Application Questions */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe your business idea or area of interest (500 words max) *
                  </label>
                  <textarea
                    name="businessIdea"
                    value={formData.businessIdea}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Tell us about your business idea, the problem you want to solve, or the industry you're interested in exploring..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.businessIdea.length}/500
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why are you applying to Alpha-Bet? (300 words max) *
                  </label>
                  <textarea
                    name="whyApplying"
                    value={formData.whyApplying}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={300}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="What draws you to entrepreneurship? How will this program help you achieve your goals?"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.whyApplying.length}/300
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment & Agreement */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Commitment</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="commitment"
                    checked={formData.commitment}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Program Commitment *</span>
                    <p className="mt-1">
                      I understand that the Alpha-Bet program requires a commitment of 8-10 hours per week for 10 weeks, 
                      including live workshops, assignments, and peer collaboration sessions. I am ready to fully participate 
                      in this rigorous program.
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Newsletter Subscription</span>
                    <p className="mt-1">
                      I would like to receive updates about the Alpha-Bet program, alumni success stories, 
                      and other entrepreneurship resources for veterans.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket"></i>
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="apply" />
    </div>
  );
}