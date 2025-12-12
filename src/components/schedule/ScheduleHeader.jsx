import React from 'react';
import * as DateHelpers from '../../utils/dateHelpers';

/**
 * Renders the calendar navigation bar, title, and action buttons.
 * @param {Date} currentWeekStart - The start date of the currently viewed week.
 * @param {function} handleWeekChange - Function to move the calendar view (passed from parent).
 */
function ScheduleHeader({ currentWeekStart, handleWeekChange }) {
    
    // Calculate the week end date and format the display strings
    const weekEnd = DateHelpers.endOfWeek(currentWeekStart);
    const weekNumber = DateHelpers.formatWeekNumber(currentWeekStart);
    
    // Format the date range for the main title display
    const formattedDateRange = `${DateHelpers.formatMonthDay(currentWeekStart)} - ${DateHelpers.formatMonthDay(weekEnd)}, ${currentWeekStart.getFullYear()}`;
    
    return (
        <div className="schedule-header-controls">
            {/*Week Navigation Block */}
            <div className="week-navigation-block">
                {/* Previous Week Button */}
                <button 
                    className="arrow-button" 
                    onClick={() => handleWeekChange('prev')} // Calls parent's handler
                    title="Previous Week"
                >
                    &lt; 
                </button>
                
                {/* Date Range Display */}
                <div className="date-range-display">
                    <span className="date-range-text">
                        {formattedDateRange}
                    </span>
                    <span className="week-number-text">
                        Week {weekNumber}
                    </span>
                </div>

                {/* Next Week Button */}
                <button 
                    className="arrow-button" 
                    onClick={() => handleWeekChange('next')} // Calls parent's handler
                    title="Next Week"
                >
                    &gt;
                </button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-block">
                <button 
                    className="btn-action btn-today"
                    onClick={() => handleWeekChange('today')} // Calls parent's handler
                >
                    Today
                </button>
                
                {/* <button className="btn-action btn-print">
                    Print Schedule
                </button> */}
                
                {/* You may also add the Export Schedule button here if it's dynamic */}
            </div>
        </div>
    );
}

export default ScheduleHeader;