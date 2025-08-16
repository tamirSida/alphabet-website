// Global URL configuration for Alpha-Bet website
// Update these URLs as needed for external links

export const EXTERNAL_URLS = {
  // Application form - will be replaced with actual form URL when available
  APPLY_FORM: '#', // TODO: Replace with actual application form URL
  
  // Social media links
  LINKEDIN: 'https://www.linkedin.com/school/versionbravo/posts/?feedView=all',
  
  // Contact email
  CONTACT_EMAIL: 'info@versionbravo.com',
} as const;

// Type for external URLs
export type ExternalURLs = typeof EXTERNAL_URLS;