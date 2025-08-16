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
- `hero-section.tsx` - Landing hero with military gradient background
- `content-section.tsx` - Enhanced content cards with alternating dark/light themes
- `curriculum-timeline.tsx` - Side-to-side curriculum layout with mobile popup modals
- `team-section.tsx` - Military-themed team member cards with veteran badges
- `testimonials-section.tsx` - Dark themed testimonial cards with quote patterns
- `cta-section.tsx` - Final mission briefing style call-to-action
- `faq-section.tsx` - Expandable Q&A component with CMS integration
- `who-should-apply-section.tsx` - Clean checklist UI for qualification requirements
- `homepage.tsx` - Main page with hero + content + FAQ sections

### CMS System (`/components/admin/`)
- `discrete-access.tsx` - URL-based admin access (?admin=true)
- `editable-section.tsx` - Wrapper for CMS editing capability
- `edit-modal.tsx` - Universal edit modal for all content types
- `simple-admin-toggle.tsx` - Admin mode toggle

### Backend Services (`/lib/cms/`)
- `base-service.ts` - Abstract Firestore service with CRUD operations
- `content-services.ts` - Service factory for all content types
- `admin-context.tsx` - Admin state management

## Page Architecture

### Individual Page Routes:
- `/` - Homepage with hero, mission/why/what sections, FAQ, and bottom navigation
- `/team` - Team members page with member cards and bios
- `/curriculum` - 10-week program curriculum with military loading animation
- `/qualifications` - Eligibility requirements in clean checklist format
- `/apply` - Complete application form with success state and validation
- `/admin` - Admin dashboard for user management and content control

## Content Types & CMS Integration

### Fully CMS-Enabled Sections:
1. **Hero Section** - Headline, sub-headline, CTA text/link, background image
2. **Content Sections** - Title, content, type (mission, why-alpha-bet, what-you-gain)
3. **Curriculum Timeline** - 10-week program with week number, title, description, icons
4. **Team Members** - Name, role, bio, image, LinkedIn profile
5. **Testimonials** - Quote, author, title, company, profile image
6. **Call to Action** - Title, description, button text/link
7. **FAQ Items** - Question, answer, order, visibility controls with delete functionality
8. **Qualifications** - Title, description, icon, order for eligibility requirements
9. **Header Sections** - Page titles, subtitles, and descriptions for all major sections

### CMS Features:
- **Admin Access**: Discrete URL parameter (?admin=true) or toggle
- **Inline Editing**: Click-to-edit functionality on all sections including headers
- **Form Validation**: Required fields, proper input types
- **Data Persistence**: Automatic save to Firestore with error handling
- **Fallback Content**: Default content when no CMS data exists
- **Delete Functionality**: Remove FAQ items and other content with confirmation
- **Responsive Editing**: Edit buttons properly positioned and mobile-friendly

## Design System

### Color Scheme:
- **Primary**: Gray-900 to Black gradients (military theme)
- **Accent**: White for contrast and highlights
- **Text**: White on dark backgrounds, Gray-900 on light
- **Borders**: Gray-600 for subtle separation

### Key Design Elements:
- **Military Aesthetic**: Shield icons, badges, monospace fonts for loading screens
- **Professional Layout**: Side-to-side alternating curriculum, clean checklist qualifications
- **Card-Based Layout**: Elevated cards with shadows and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints and popup modals
- **Font Awesome Icons**: Consistent iconography throughout
- **Custom Logo**: PNG logo integrated with Next.js Image optimization
- **Glass Morphism**: Backdrop blur effects and transparent overlays
- **Animation Effects**: Staggered loading animations, hover effects, and mobile popups

## Development Commands
- `npm run dev` - Development server (usually runs on port 3001)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - ESLint checking
- `npm run typecheck` - TypeScript checking

## Firebase Configuration
- **Collections**: hero-sections, content-sections, team-members, testimonials, curriculum-items, call-to-actions, faqs, qualification-items
- **Authentication**: Admin users for CMS access
- **Security Rules**: Wildcard pattern allowing authenticated users full access to all collections, public read access

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
- Restructured website into proper multi-page architecture
- Added navigation header, footer, and bottom navigation components
- Converted curriculum to side-to-side layout with mobile popups
- Redesigned qualifications as clean checklist interface
- Added FAQ section with full CMS integration and delete functionality
- Fixed mobile logo display issues with Next.js Image components
- Resolved hydration mismatches for better SSR compatibility
- Enhanced mobile UX with proper popup indicators and animations
- Fixed qualifications CMS permissions issue by simplifying Firestore rules
- Completed team section integration with VBV data and military styling
- Removed status icons from team cards and implemented founders-only first row layout

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