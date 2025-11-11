import {
    startOfWeek as fnsStartOfWeek,
    endOfWeek as fnsEndOfWeek,
    addWeeks,
    subWeeks,
    eachDayOfInterval,
    format,
} from 'date-fns';


// Configure options for date-fns to start the week on Monday (1)
const OPTIONS = { weekStartsOn: 1 }; 



/**
 * Calculates the start date (Monday) of the week containing the given date.
 * @param {Date | string} date - The reference date.
 * @returns {Date} The Date object for Monday of that week.
 */
export const startOfWeek = (date) => {
    // Ensure the input is a Date object, especially if it was a string
    const refDate = new Date(date); 
    return fnsStartOfWeek(refDate, OPTIONS);
};

/**
 * Calculates the end date (Sunday) of the week containing the given date.
 * @param {Date | string} date - The reference date.
 * @returns {Date} The Date object for Sunday of that week.
 */
export const endOfWeek = (date) => {
    const refDate = new Date(date);
    return fnsEndOfWeek(refDate, OPTIONS);
};

/**
 * Calculates the start date of the week immediately preceding the current week.
 * @param {Date} date - The start date of the current week.
 * @returns {Date} The Date object for the start of the previous week.
 */
export const getPreviousWeek = (date) => {
    return subWeeks(date, 1);
};

/**
 * Calculates the start date of the week immediately following the current week.
 * @param {Date} date - The start date of the current week.
 * @returns {Date} The Date object for the start of the next week.
 */
export const getNextWeek = (date) => {
    return addWeeks(date, 1);
};

// ------------------------------------------
// Week Generation Functions
// ------------------------------------------

/**
 * Generates an array of 7 Date objects for the days in the week, starting from the given startDate.
 * @param {Date} startDate - The start date of the week (e.g., Monday).
 * @returns {Date[]} An array containing 7 Date objects.
 */
export const generateWeekDays = (startDate) => {
    // Calculate the end date by getting the start of the next week and subtracting one day.
    // However, the simplest way is to use endOfWeek:
    const endDate = endOfWeek(startDate);
    
    // Returns an array of dates between the start and end dates (inclusive)
    return eachDayOfInterval({ start: startDate, end: endDate });
};

// ------------------------------------------
// Formatting Functions (for Display)
// ------------------------------------------

/**
 * Formats a Date object into a readable string (e.g., "Oct 29").
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string.
 */
export const formatMonthDay = (date) => {
    return format(date, 'MMM d');
};

/**
 * Formats a Date object to get the full day name (e.g., "Tuesday").
 * @param {Date} date - The Date object to format.
 * @returns {string} The full day name string.
 */
export const formatDayName = (date) => {
    return format(date, 'EEEE');
};

/**
 * Formats a Date object to get the week number (e.g., 44).
 * @param {Date} date - The Date object to format.
 * @returns {string} The week number.
 */
export const formatWeekNumber = (date) => {
    return format(date, 'w');
};

/**
 * Formats a Time value (e.g., "09:00") into a user-friendly string (optional).
 * @param {string} time - The time string from the backend (e.g., "09:00").
 * @returns {string} The formatted time (e.g., "9:00 AM").
 */
export const formatTimeDisplay = (time) => {
    // This requires parsing, but for simplicity, you can initially return the raw time or add more complex date-fns parsing later.
    // Example Simple Parsing:
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12; // Converts 0 and 12 to 12
    return `${displayHour}:${minutes} ${ampm}`;
};