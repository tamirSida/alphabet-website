# Alpha-Bet CMS Website

A modern, responsive website with a built-in Content Management System for the Alpha-Bet entrepreneurship program for combat veterans.

## 🚀 Features

- **Mobile-First Responsive Design** - Optimized for all devices
- **Discrete CMS Access** - Multiple secure ways to access the admin panel
- **User Management System** - Admin-controlled user permissions
- **Real-time Content Updates** - Firebase Firestore integration
- **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS
- **Professional UI Components** - Custom-built, accessible components
- **OOP Architecture** - Clean, maintainable, reusable code

## 🏗️ Architecture

### Frontend (Public Site)
- **Mobile-First Components** - Hero, Content Sections, Team, Testimonials, Curriculum, CTA
- **Dynamic Content Loading** - Real-time data from Firebase
- **Responsive Design** - Tailwind CSS with custom design system

### CMS (Content Management)
- **Base Service Classes** - OOP pattern for Firebase operations
- **Content Editors** - Generic, reusable CRUD interfaces
- **User Management** - Admin-controlled access system
- **Role-Based Permissions** - Admin vs Editor roles

## 🔐 Admin Access

The CMS has multiple discrete access methods for security:

### 1. Discrete Dot Access
- Small dot in the top-right corner of any page
- Click 5 times rapidly to access admin

### 2. Keyboard Shortcuts
- **Ctrl+Shift+A** - Direct admin access
- **A-L-P-H-A-B-E-T** sequence - Type the word "alphabet"

### 3. URL Parameters
- `?alpha=bet` - Add to any URL
- `#admin2024` - Hash-based access

## 📱 CMS Features

### Content Management
- **Hero Sections** - Main page banners and CTAs
- **Content Sections** - Mission, About, Application info
- **Team Members** - Staff profiles with photos and bios
- **Testimonials** - User feedback and quotes
- **Curriculum** - Course structure and details
- **Call-to-Actions** - Application prompts and buttons

### User Management
- **Simple Authentication** - Any Firebase user gets full access
- **User Tracking** - Track logins and user activity
- **Role Management** - Optional role assignment for future use

## 🛠️ Setup Instructions

### 1. Firebase Setup
Your Firebase project is already configured:
- Project ID: `alphabet-e9433`
- Authentication enabled
- Firestore database ready

### 2. Install Dependencies
```bash
npm install
```

### 3. Development
```bash
npm run dev
```

### 4. Build & Deploy
```bash
npm run build
npm start
```

## 🎯 Getting Started

### For New Users
1. Visit `/admin` or use discrete access methods
2. Sign in with Firebase authentication  
3. You immediately get full CMS access
4. Start managing content right away

### For Content Editing
1. Access the CMS through any discrete method
2. Navigate through the sidebar menu
3. Use the content editors to manage sections
4. All changes are live immediately

## 🔧 Technical Details

### Tech Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Firebase** - Authentication and database
- **Lucide React** - Modern icon library

### Key Design Decisions
- **OOP Services** - BaseFirestoreService with specialized extensions
- **Generic Components** - ContentEditor works with any content type
- **Mobile-First** - All components start with mobile design
- **Type Safety** - Full TypeScript coverage
- **Performance** - Optimized loading and caching

## 📋 Content Structure

The site follows the site.txt structure:
- Hero section with headline and CTA
- Mission and program overview  
- Team member profiles
- Curriculum breakdown
- Testimonials from veterans
- Application call-to-action

## 🎨 Design System

- **Colors** - Professional black/white/gray palette
- **Typography** - Inter font for readability
- **Components** - Consistent button, card, and form styles
- **Responsive** - Mobile-first breakpoints
- **Accessibility** - ARIA labels and keyboard navigation

## 🚀 Deployment

The app is ready for deployment on:
- **Vercel** (recommended)
- **Netlify** 
- **Firebase Hosting**
- Any Node.js hosting platform

No additional environment variables needed - Firebase config is embedded.

## 📞 Support

For technical issues or access requests, contact the development team.

---

**Built with care for Alpha-Bet and the veteran entrepreneurship community.**
