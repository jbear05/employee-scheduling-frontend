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
function CalendarGrid({ currentWeekStart, assignments, employees, shifts, onAddAssignment, onDeleteAssignment }) {
    
    // 1. Generate the 7 Date Objects for the week
    const weekDays = DateHelpers.generateWeekDays(currentWeekStart);

    return (
        <div className="calendar-grid-container">
            {/* 2. Loop over the 7 days and render a column for each */}
            {weekDays.map((dateObj, index) => (
                <DayColumn 
                    key={index} 
                    date={dateObj}
                    allAssignments={assignments} 
                    allEmployees={employees}
                    allShifts={shifts}
                    onAddAssignment={onAddAssignment}
                    onDeleteAssignment={onDeleteAssignment}
                />
            ))}
        </div>
    );
}

export default CalendarGrid;