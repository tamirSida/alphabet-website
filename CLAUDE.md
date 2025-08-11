# Alpha-Bet Project - Claude Context

## Project Overview
Alpha-Bet is a free entrepreneurship program for US and Israeli combat veterans, designed to equip them with the skills, network, and battle-tested mindset to build successful startups. This is a Next.js website with a complete CMS system.

## Project Structure
- **Framework**: Next.js 15.4.6 with TypeScript and Tailwind CSS
- **Database**: Firebase/Firestore for content management
- **Authentication**: Firebase Auth for admin access
- **Styling**: Tailwind CSS with custom military-themed components
- **Icons**: Font Awesome integration

## Key Components

### Frontend Components (`/components/public/`)
- `hero-section.tsx` - Landing hero with military gradient background
- `content-section.tsx` - Enhanced content cards with alternating dark/light themes
- `curriculum-timeline.tsx` - Sophisticated Mission Control Center style curriculum
- `team-section.tsx` - Military-themed team member cards with veteran badges
- `testimonials-section.tsx` - Dark themed testimonial cards with quote patterns
- `cta-section.tsx` - Final mission briefing style call-to-action
- `homepage.tsx` - Main page orchestrating all sections

### CMS System (`/components/admin/`)
- `discrete-access.tsx` - URL-based admin access (?admin=true)
- `editable-section.tsx` - Wrapper for CMS editing capability
- `edit-modal.tsx` - Universal edit modal for all content types
- `simple-admin-toggle.tsx` - Admin mode toggle

### Backend Services (`/lib/cms/`)
- `base-service.ts` - Abstract Firestore service with CRUD operations
- `content-services.ts` - Service factory for all content types
- `admin-context.tsx` - Admin state management

## Content Types & CMS Integration

### Fully CMS-Enabled Sections:
1. **Hero Section** - Headline, sub-headline, CTA text/link, background image
2. **Content Sections** - Title, content, type (mission, why-alpha-bet, etc.)
3. **Curriculum Timeline** - 10-week program with week number, title, description, icons
4. **Team Members** - Name, role, bio, image, LinkedIn profile
5. **Testimonials** - Quote, author, title, company, profile image
6. **Call to Action** - Title, description, button text/link

### CMS Features:
- **Admin Access**: Discrete URL parameter (?admin=true) or toggle
- **Inline Editing**: Click-to-edit functionality on all sections
- **Form Validation**: Required fields, proper input types
- **Data Persistence**: Automatic save to Firestore
- **Fallback Content**: Default content when no CMS data exists
- **Ordering**: Drag-and-drop ordering capabilities

## Design System

### Color Scheme:
- **Primary**: Gray-900 to Black gradients (military theme)
- **Accent**: White for contrast and highlights
- **Text**: White on dark backgrounds, Gray-900 on light
- **Borders**: Gray-600 for subtle separation

### Key Design Elements:
- **Military Aesthetic**: Shield icons, badges, monospace fonts
- **Mission Control Theme**: Particularly in curriculum timeline
- **Card-Based Layout**: Elevated cards with shadows and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints
- **Font Awesome Icons**: Consistent iconography throughout

## Development Commands
- `npm run dev` - Development server (usually runs on port 3001)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - ESLint checking
- `npm run typecheck` - TypeScript checking

## Firebase Configuration
- **Collections**: hero-sections, content-sections, team-members, testimonials, curriculum-items, call-to-actions
- **Authentication**: Admin users for CMS access
- **Security Rules**: Configured for admin-only writes, public reads

## Key Features Implemented:
- ✅ Complete CMS system with all content types
- ✅ Responsive military-themed design
- ✅ Curriculum timeline with Mission Control styling
- ✅ Touch/scroll differentiation for mobile navigation
- ✅ Admin access control system
- ✅ Form validation and error handling
- ✅ Fallback content for empty CMS data
- ✅ TypeScript throughout for type safety

## Recent Major Updates:
- Enhanced all section designs with sophisticated military theming
- Added comprehensive CMS integration for team and testimonials
- Implemented touch gesture handling for curriculum navigation
- Updated color scheme from blue to gray/black throughout
- Added scrollable horizontal navigation with proper touch detection

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