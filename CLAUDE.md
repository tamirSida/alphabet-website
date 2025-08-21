# Alpha-Bet Project - Claude Context

## Project Overview
Alpha-Bet is a free entrepreneurship program for US and Israeli combat veterans, designed to equip them with the skills, network, and battle-tested mindset to build successful startups. This is a Next.js website with a complete CMS system and multi-page architecture.

## Project Structure
- **Framework**: Next.js 15.4.6 with TypeScript and Tailwind CSS
- **Database**: Firebase/Firestore for content management
- **Authentication**: Firebase Auth for admin access
- **Styling**: Tailwind CSS with custom military-themed components
- **Icons**: Font Awesome integration
- **Images**: Next.js Image optimization with custom logo

## Key Components

### Frontend Components (`/components/public/`)
- `navigation.tsx` - Sticky navigation with mobile hamburger menu and responsive logo
- `footer.tsx` - Consistent footer with contact info and navigation links
- `bottom-navigation.tsx` - Contextual user journey flow between pages
- `hero-section.tsx` - Landing hero with seamless background integration
- `content-section.tsx` - Modern grid-based content with granular CMS, glass morphism effects, and color-coded sections
- `curriculum-timeline.tsx` - Side-to-side curriculum layout with mobile popup modals (dark-themed)
- `team-sections.tsx` - Refactored team component with 3 distinct sections: Founders, Alpha-Bet Staff, Version Bravo Staff
- `team-section.tsx` - Legacy team component (replaced by team-sections.tsx)
- `testimonials-section.tsx` - Dark themed testimonial cards with quote patterns
- `cta-section.tsx` - Final mission briefing style call-to-action
- `faq-section.tsx` - Expandable Q&A component with dark theme and CMS integration
- `who-should-apply-section.tsx` - Clean checklist UI for qualification requirements
- `homepage.tsx` - Main page with seamless dark background and granular content CMS

### CMS System (`/components/admin/`)
- `discrete-access.tsx` - URL-based admin access (?admin=true)
- `editable-section.tsx` - Wrapper for CMS editing capability
- `edit-modal.tsx` - Universal edit modal for all content types
- `simple-admin-toggle.tsx` - Admin mode toggle

### Backend Services (`/lib/cms/`)
- `base-service.ts` - Abstract Firestore service with CRUD operations
- `content-services.ts` - Service factory for all content types (includes FounderService, AlphaBetStaffService, TeamMemberService)
- `admin-context.tsx` - Admin state management

## Page Architecture

### Individual Page Routes:
- `/` - Homepage with hero, mission/why/what sections, FAQ, and bottom navigation
- `/team` - Team page with 3 sections: Founders (2-column), Alpha-Bet Staff (3-column), Version Bravo Staff (3-column)
- `/curriculum` - 10-week program curriculum with military loading animation
- `/qualifications` - Eligibility requirements in clean checklist format
- `/privacy` - Privacy policy page with comprehensive data protection information
- `/terms` - Terms of service page with program guidelines and participant responsibilities

### External Links (Configurable via `/lib/config/urls.ts`):
- **Apply Form** - External application form URL (currently placeholder '#')
- **LinkedIn** - VBV school page
- **Contact Email** - Program contact email

## Content Types & CMS Integration

### Fully CMS-Enabled Sections:
1. **Hero Section** - Headline, sub-headline, CTA text/link, background image
2. **Content Sections** - **GRANULAR CMS**: Individual editing of Mission Brief + Key Highlights with add/remove functionality
3. **Curriculum Timeline** - 10-week program with week number, title, description, icons
4. **Team Members** - Name, title, military background, image, LinkedIn profile (across 3 separate collections: founders, alphabet-staff, team-members)
5. **Testimonials** - Quote, author, title, company, profile image
6. **Call to Action** - Title, description, button text/link
7. **FAQ Items** - Question, answer, order, visibility controls with delete functionality
8. **Qualifications** - Title, description, icon, order for eligibility requirements
9. **Header Sections** - Page titles, subtitles, and descriptions for all major sections

### CMS Features:
- **Admin Access**: Discrete URL parameter (?admin=true) or toggle
- **Granular Content Editing**: Individual editing of Mission Brief and Key Highlights with full database persistence
- **Add/Remove Highlights**: Dynamic bullet point management with real-time updates
- **Form Validation**: Required fields, proper input types, radio button support
- **Database Persistence**: Full Firebase/Firestore integration with automatic save
- **Fallback Content**: Default content when no CMS data exists
- **Delete Functionality**: Remove FAQ items and highlights with confirmation
- **Responsive Editing**: Edit buttons properly positioned and mobile-friendly
- **Grid Layout**: Modern 2-column responsive grid for highlight display
- **Multi-Section Team Management**: Separate CMS for Founders, Alpha-Bet Staff, and Version Bravo Staff

## Design System

### Color Scheme:
- **Primary**: Gray-900 to Black gradients (military theme)
- **Accent**: White for contrast and highlights
- **Text**: White on dark backgrounds, Gray-900 on light
- **Borders**: Gray-600 for subtle separation

### Key Design Elements:
- **Military Aesthetic**: Shield icons, badges, monospace fonts for loading screens
- **Seamless Dark Theme**: Continuous gradient backgrounds without page breaks
- **Grid-Based Layouts**: 2-column responsive grids for content highlights
- **Color-Coded Sections**: Blue (Mission), Purple (Why Alpha-Bet), Yellow (What You'll Gain)
- **Glass Morphism**: Backdrop blur effects, transparent overlays, and modern card designs
- **Professional Layout**: Side-to-side alternating curriculum, clean checklist qualifications
- **Responsive Design**: Mobile-first approach with breakpoints and popup modals
- **Font Awesome Icons**: Consistent iconography throughout
- **Custom Logo**: PNG logo integrated with Next.js Image optimization
- **Animation Effects**: Pulse animations, hover effects, and scaling transforms

## Development Commands
- `npm run dev` - Development server (usually runs on port 3001)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - ESLint checking
- `npm run typecheck` - TypeScript checking

## Firebase Configuration
- **Collections**: hero-sections, content-sections, founders, alphabet-staff, team-members, testimonials, curriculum-items, call-to-actions, faqs, qualification-items
- **Authentication**: Admin users for CMS access
- **Security Rules**: Wildcard pattern allowing authenticated users full access to all collections, public read access
- **External Images**: LinkedIn media domains configured in next.config.ts

## Key Features Implemented:
- ✅ Complete multi-page website architecture with navigation
- ✅ Full CMS system with all content types including FAQs and qualifications
- ✅ Responsive military-themed design with professional layouts
- ✅ Mobile-optimized curriculum with popup modals
- ✅ Admin access control system with proper positioning
- ✅ Form validation and error handling
- ✅ Fallback content for empty CMS data
- ✅ TypeScript throughout for type safety
- ✅ Next.js Image optimization for logos
- ✅ Hydration-safe responsive design
- ✅ Touch-friendly mobile interfaces

## Recent Major Updates:
- **Team Section Refactor**: Implemented 3-section team layout with separate CMS collections for Founders, Alpha-Bet Staff, and Version Bravo Staff
- **Enhanced Form System**: Added radio button support, removed deprecated fields (role, bio), streamlined team member forms
- **Curriculum UX Improvements**: Fixed mobile popup dark theme, removed deprecated dropdown content, mobile-only modal system
- **External Image Support**: Added LinkedIn media domain support in Next.js configuration
- **CMS Performance**: Fixed infinite loops in form initialization and component re-rendering
- **Granular CMS System**: Implemented individual editing of Mission Brief and Key Highlights with full database persistence
- **Enhanced Visual Design**: Seamless dark background, grid layouts, color-coded sections with modern UI/UX
- **Database Integration**: Full Firebase persistence for all content edits with real-time updates
- **Privacy Policy Updates**: Removed application data collection references, updated to reflect only website analytics
- **Legal Page Fixes**: Fixed double footer issue on privacy and terms pages
- **Grid-Based Content**: Converted bullet points to responsive 2-column grid layout without redundant headers
- **SEO Optimization**: Comprehensive meta tags, structured data, and keyword targeting
- **Global URL System**: Centralized external link management for easy future updates
- **Mobile Optimization**: Touch-friendly admin controls and responsive grid layouts

## Environment Variables Needed:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Admin Access:
- Add `?admin=true` to any URL to enable admin mode
- Or use the discrete admin toggle in the bottom corner
- Admin mode enables editing capabilities across all sections