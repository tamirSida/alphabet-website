# Alpha-Bet - Veteran Entrepreneurship Program

A sophisticated, military-themed website with comprehensive Content Management System for the Alpha-Bet entrepreneurship program - designed specifically for US and Israeli combat veterans.

## 🎖️ Mission

Alpha-Bet is a free, 10-week entrepreneurship program that transforms combat veterans into successful startup founders. Our platform provides practical MBA-level education, veteran-to-veteran mentorship, and direct access to the Version Bravo accelerator ecosystem.

## ✨ Features

### 🎨 Military-Themed Design
- **Mission Control Aesthetic** - Sophisticated dark themes with military styling
- **Responsive Design** - Mobile-first approach optimized for all devices
- **Interactive Elements** - Touch gestures, hover effects, and smooth animations
- **Consistent Iconography** - Font Awesome icons throughout with military motifs

### 🛠️ Complete CMS Integration
- **Real-time Content Management** - Edit all sections through intuitive admin interface
- **Discrete Admin Access** - Multiple secure entry points for content management
- **Type-Safe Development** - Full TypeScript coverage with proper interfaces
- **Firebase Integration** - Firestore database with optimized queries

### 📱 Advanced UX Features
- **Touch Gesture Support** - Swipe navigation with scroll/tap differentiation
- **Loading Animations** - Military-styled "decrypting files" sequences
- **Curriculum Timeline** - Interactive Mission Control Center interface
- **Content Fallbacks** - Graceful handling when CMS data is unavailable

## 🏗️ Technical Architecture

### Frontend (`/components/public/`)
- **hero-section.tsx** - Landing page with military gradient backgrounds
- **content-section.tsx** - Alternating light/dark themed content cards
- **curriculum-timeline.tsx** - Interactive Mission Control Center curriculum
- **team-section.tsx** - Enhanced team member cards with veteran badges
- **testimonials-section.tsx** - Quote-focused testimonial cards
- **cta-section.tsx** - Final mission briefing style call-to-action

### CMS System (`/components/admin/`)
- **discrete-access.tsx** - URL-based admin authentication
- **editable-section.tsx** - Wrapper component for CMS editing
- **edit-modal.tsx** - Universal content editing modal
- **admin-context.tsx** - Global admin state management

### Services (`/lib/cms/`)
- **base-service.ts** - Abstract Firestore service with CRUD operations
- **content-services.ts** - Specialized services for each content type
- **Firebase integration** - Optimized queries and real-time updates

## 🔐 Admin Access

Access the CMS using discrete methods for security:

### URL Parameter Method
- Add `?admin=true` to any URL to enable admin mode
- Example: `https://yoursite.com?admin=true`

### Discrete Access Elements  
- Look for the small admin toggle in the corner of pages
- Multiple entry points throughout the site for authorized users

## 📱 Content Management Features

### Fully CMS-Enabled Sections
- **Hero Section** - Headline, sub-headline, CTA text/link, background images
- **Content Sections** - Mission statement, program details, application requirements
- **Curriculum Timeline** - 10-week program structure with interactive Mission Control interface
- **Team Members** - Mentor profiles with photos, bios, and LinkedIn integration
- **Testimonials** - Veteran success stories with quotes and profile information
- **Call-to-Action** - Application prompts and program enrollment buttons

### CMS Capabilities
- **Inline Editing** - Click-to-edit functionality throughout the site
- **Form Validation** - Required fields, input type validation, error handling
- **Content Ordering** - Drag-and-drop reordering for dynamic content
- **Image Management** - URL-based image integration with fallback support
- **Real-time Updates** - Changes appear immediately on the live site

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js 18+ and npm
Firebase account with project configured
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd alpha-bet

# Install dependencies  
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Firebase configuration
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

## 🔧 Technical Stack

### Core Technologies
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript** - Type-safe development with strict configuration
- **Tailwind CSS** - Utility-first CSS with custom military theme
- **Firebase/Firestore** - Backend database and authentication
- **Font Awesome** - Comprehensive icon library

### Key Architecture Patterns
- **Service Layer Pattern** - BaseFirestoreService with specialized extensions
- **Component Composition** - Reusable, configurable components
- **Context-Based State** - Admin state management with React Context
- **Type-Safe CMS** - Full TypeScript coverage for all content types

## 📋 Content Structure

### Site Sections (in order)
1. **Hero** - "From Battlefield to Business" introduction
2. **Mission** - Program overview and value proposition
3. **Why Alpha-Bet** - Network, mentorship, and accelerator benefits
4. **Who Should Apply** - Target audience and requirements
5. **Curriculum** - Interactive 10-week program timeline
6. **Team** - Mentor and instructor profiles
7. **Testimonials** - Veteran success stories
8. **What You'll Gain** - Program outcomes and benefits
9. **Call-to-Action** - Final enrollment prompt

## 🎨 Design System

### Color Palette
- **Primary**: Gray-900 to Black gradients (military aesthetic)
- **Secondary**: White and Gray-100 for contrast
- **Accent**: Strategic use of green for success states
- **Text**: High contrast ratios for accessibility

### Typography & Spacing
- **Font**: Inter for body text, Monospace for military elements
- **Scale**: Responsive typography with mobile-first approach
- **Spacing**: Consistent 8px grid system throughout

### Component Patterns
- **Cards**: Elevated surfaces with subtle shadows and hover effects
- **Buttons**: Military-inspired styling with icon integration
- **Forms**: Comprehensive validation and error states
- **Navigation**: Touch-friendly with gesture support

## 🚀 Deployment & Configuration

### Environment Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Deployment Platforms
- **Vercel** (recommended) - Automatic deployments from Git
- **Netlify** - JAMstack-optimized hosting
- **Firebase Hosting** - Integrated with Firebase backend
- **Any Node.js Platform** - Standard Next.js deployment

### Firebase Configuration
- **Firestore Collections**: hero-sections, content-sections, team-members, testimonials, curriculum-items, call-to-actions
- **Authentication**: Email/password for admin users
- **Security Rules**: Admin-only write access, public read access

## 📊 Performance & Optimization

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based splitting
- **Caching Strategy** - Aggressive caching for static content
- **Mobile Performance** - Optimized touch interactions and gestures

## 🎯 Getting Started Guide

### For Administrators
1. Access admin mode via `?admin=true` URL parameter
2. All sections become editable with visible edit buttons
3. Click any section to open the edit modal
4. Fill out forms with validation feedback
5. Save changes for immediate live updates

### For Developers
1. Review the component structure in `/components/public/`
2. Understand the CMS integration in `/components/admin/`
3. Examine service patterns in `/lib/cms/`
4. Test responsive design across breakpoints
5. Verify admin functionality with Firebase auth

---

**Built with precision and care for the Alpha-Bet veteran entrepreneurship community.**
