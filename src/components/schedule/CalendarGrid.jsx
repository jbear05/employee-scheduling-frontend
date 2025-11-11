import React from 'react';
import * as DateHelpers from '../../utils/dateHelpers';
import DayColumn from './DayColumn';

/**
 * Renders the main 7-day schedule grid.
 * @param {Date} currentWeekStart - The Monday date received from the parent.
 * @param {Array} assignments - All assignments fetched for the entire week.
 * @param {Array} employees - List of all employees (for name lookup).
 * @param {Array} shifts - List of all shift templates (for time/role lookup).
 */
function CalendarGrid({ currentWeekStart, assignments, employees, shifts }) {
    
    // 1. Generate the 7 Date Objects for the week
    const weekDays = DateHelpers.generateWeekDays(currentWeekStart);

    return (
        <div className="calendar-grid-container">
            {/* 2. Loop over the 7 days and render a column for each */}
            {weekDays.map((dateObj, index) => (
                <DayColumn 
                    key={index} // Using index is okay here since the array size (7) never changes
                    date={dateObj} // Pass the Date object for that specific day
                    // Pass the complete dataset to the column
                    allAssignments={assignments} 
                    allEmployees={employees}
                    allShifts={shifts}
                />
            ))}
        </div>
    );
}

export default CalendarGrid;