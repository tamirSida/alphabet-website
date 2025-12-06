// Timezone utility functions for ET->UTC->ET conversion
// Based on the logic from /Users/tamirsida/dev/vetted-accelerator

const ET_TIMEZONE = 'America/New_York';

/**
 * Convert a date input string (assumed to be in ET) to UTC for storage
 * @param dateString Date string in YYYY-MM-DD format (ET timezone)
 * @returns ISO string in UTC
 */
export function dateInputToUTC(dateString: string): string {
  if (!dateString) return '';
  
  // Parse the date string as if it's in ET timezone
  const etDate = new Date(dateString + 'T00:00:00');
  
  // Convert to ET timezone explicitly
  const utcTime = new Date(etDate.toLocaleString('en-US', { timeZone: 'UTC' }));
  const etTime = new Date(etDate.toLocaleString('en-US', { timeZone: ET_TIMEZONE }));
  
  // Calculate the offset and adjust
  const offset = utcTime.getTime() - etTime.getTime();
  const adjustedDate = new Date(etDate.getTime() + offset);
  
  return adjustedDate.toISOString();
}

/**
 * Convert a UTC ISO string to a date input string (in ET timezone)
 * @param isoString UTC ISO string from database
 * @returns Date string in YYYY-MM-DD format (ET timezone)
 */
export function utcToDateInput(isoString: string): string {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  
  // Convert to ET timezone for editing
  const etDateString = date.toLocaleDateString('en-CA', { // en-CA gives YYYY-MM-DD format
    timeZone: ET_TIMEZONE
  });
  
  return etDateString;
}

/**
 * Format a UTC date for display in ET timezone
 * @param isoString UTC ISO string from database
 * @param options Formatting options
 * @returns Formatted date string in ET timezone
 */
export function formatDateForDisplay(
  isoString: string, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: ET_TIMEZONE
  }
): string {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Convert legacy date strings to UTC (for migration)
 * @param dateString Legacy date string or ISO string
 * @returns UTC ISO string
 */
export function legacyDateToUTC(dateString: string): string {
  if (!dateString) return '';
  
  // If it's already an ISO string, return as is
  if (dateString.includes('T') || dateString.includes('Z')) {
    return dateString;
  }
  
  // Convert legacy YYYY-MM-DD to UTC assuming it was meant to be in ET
  return dateInputToUTC(dateString);
}

/**
 * Normalize date string to ensure it's in proper UTC format
 * @param dateString Date string to normalize
 * @returns Normalized UTC ISO string
 */
export function normalizeDate(dateString: string): string {
  return legacyDateToUTC(dateString);
}