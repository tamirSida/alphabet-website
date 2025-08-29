'use client';

import SEOHead from '@/components/seo/SEOHead';
import BottomNavigation from '@/components/public/bottom-navigation';
import Footer from '@/components/public/footer';
import DiscreteAdminAccess, { DiscreteAdminDot, useUrlAdminAccess } from '@/components/admin/discrete-access';
import SimpleAdminToggle from '@/components/admin/simple-admin-toggle';

export default function ServiceRequirementsPage() {
  useUrlAdminAccess();

  return (
    <>
      <SEOHead
        title="Service Requirements - Alpha-Bet Program"
        description="Military service requirements for Alpha-Bet: Combat veteran eligibility criteria for US and Israeli military personnel. Detailed requirements for program participation."
        noindex={true}
      />
      <div className="relative">
        <DiscreteAdminAccess />
        <DiscreteAdminDot />
        <SimpleAdminToggle />
        
        {/* Header */}
        <section className="py-16 sm:py-24 px-4 bg-gradient-to-r from-white via-white to-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-black" style={{ fontFamily: "'Black Ops One', cursive" }}>
              Service Requirements
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Military service criteria for Alpha-Bet program eligibility
            </p>
            <div className="mt-8 text-sm text-gray-600">
              Last Updated: August 29, 2025
            </div>
          </div>
        </section>

        {/* Service Requirements Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-xl font-bold text-blue-900 mb-2">Program Eligibility</h2>
              <p className="text-blue-800 mb-0">
                To ensure alignment between participants and the program's mission, applicants must meet the following service requirements.
              </p>
            </div>

            <h2>1. Honorable Service</h2>
            <p>
              Received an honorable discharge or its equivalent from the <strong>United States Armed Forces</strong> or the <strong>Israel Defense Forces (IDF)</strong>.
            </p>

            <h2>2. Combat Unit Service</h2>
            <p>Must have served in an officially recognized combat-designated unit:</p>
            
            <h3>Israel (IDF)</h3>
            <ul>
              <li><strong>Infantry brigades:</strong> Golani, Givati, Paratroopers</li>
              <li><strong>Special Forces:</strong> Shayetet 13, Sayeret Matkal, Duvdevan, Shaldag, Unit 669</li>
              <li><strong>Equivalent combat roles</strong> in officially designated combat units</li>
            </ul>

            <h3>United States</h3>
            <ul>
              <li><strong>U.S. Special Operations:</strong> SEALs, Green Berets, Delta, Rangers, Marine Raiders, PJs, CCTs, SR, TACP</li>
              <li><strong>Combat Arms:</strong> Infantry, Marine Infantry, and equivalent frontline roles</li>
            </ul>

            <h2>3. Primary Combat Role</h2>
            <p>
              Served in a unit whose core mission involved direct engagement with opposing forces. Examples include:
            </p>
            <ul>
              <li>Infantry</li>
              <li>Special operations</li>
              <li>Armor</li>
              <li>Combat engineering</li>
              <li>Field artillery</li>
            </ul>

            <h2>4. Assigned to a Combat Unit</h2>
            <p>
              Veterans from combat support specialties are eligible if they were <strong>formally assigned or attached</strong> to a front-line combat unit and routinely operated in a forward, hostile environment as part of their primary duties.
            </p>

            <h2>5. Verifiable Record</h2>
            <p>Service and unit assignment must be verifiable through official documentation:</p>
            <ul>
              <li><strong>U.S. Veterans:</strong> DD-214 or equivalent service records</li>
              <li><strong>Israeli Veterans:</strong> 'Teudat Shichrur' or other relevant service records</li>
              <li><strong>Other Documentation:</strong> Official military records that verify combat unit service</li>
            </ul>

            <h2>6. Active Reserve Status (Israel Specific Requirement)</h2>
            <p>
              Israeli applicants must be currently serving as a combat-designated reservist or equivalent active reserve status.
            </p>

            <h2>7. Entrepreneurial Alignment</h2>
            <p>
              Commitment to applying combat-honed leadership, resilience, and problem-solving skills to entrepreneurial ventures. Participants should demonstrate genuine interest in:
            </p>
            <ul>
              <li>Translating military leadership experience into business contexts</li>
              <li>Building innovative solutions and startups</li>
              <li>Contributing to the veteran entrepreneurship community</li>
              <li>Continuous learning and professional development</li>
            </ul>

            <hr className="my-8" />

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-2">Documentation Requirements</h3>
              <p className="text-amber-800 mb-2">
                All applicants must be prepared to provide official documentation verifying their military service and combat unit assignment during the application process.
              </p>
              <p className="text-amber-800 mb-0">
                <strong>Note:</strong> Service records will be kept confidential and used solely for program eligibility verification.
              </p>
            </div>

            <h2>Contact for Questions</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">For questions about service requirements or eligibility:</p>
              <ul className="space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@alphabetprogram.com" className="text-blue-600 hover:underline">info@alphabetprogram.com</a></li>
              </ul>
            </div>

            <hr className="my-8" />
            
            <div className="text-center text-gray-600">
              <p>
                These requirements ensure that Alpha-Bet serves those who have demonstrated the courage, 
                discipline, and leadership that comes from frontline military service, creating a cohort 
                united by shared experiences and values.
              </p>
            </div>

          </div>
        </section>

        <BottomNavigation currentPage="home" />
      </div>
    </>
  );
}