import React from 'react';
import ShiftCard from './ShiftCard';
import * as DateHelpers from '../../utils/dateHelpers';
import { isSameDay, parseISO } from 'date-fns'; // Helper from date-fns for comparison

/**
 * Renders a single day column and the shift cards assigned to it.
 */
function DayColumn({ date, allAssignments, allEmployees, allShifts }) {
    
    // Format the date for the column header (e.g., "Monday")
    const dayName = DateHelpers.formatDayName(date);
    const formattedDate = DateHelpers.formatMonthDay(date);

    // 1. Filter Assignments to the Current Day (CRITICAL STEP)
    const dailyAssignments = allAssignments.filter(assignment => {
        // Skip assignments that don't have a date property
        if (!assignment || !assignment.date) {
            return false;
        }
        
        // Assume your assignment object from Spring Boot has a 'date' property 
        // as an ISO string (e.g., "2025-10-30T00:00:00").
        const assignmentDate = parseISO(assignment.date); 
        
        // Use date-fns to safely compare if the two Date objects represent the same day
        return isSameDay(date, assignmentDate);
    });

    return (
        <div className="day-column">
            {/* Column Header */}
            <div className="column-header">
                <span className="day-name">{dayName}</span>
                <span className="day-date">{formattedDate}</span>
                <button className="add-shift-button">+</button> {/* The add assignment button */}
            </div>
            
            {/* Shift Cards */}
            <div className="shift-cards-container">
                {dailyAssignments.length > 0 ? (
                    // 2. Map Filtered Assignments to Shift Cards
                    dailyAssignments.map(assignment => (
                        <ShiftCard 
                            key={assignment.id} 
                            assignment={assignment} 
                            allEmployees={allEmployees}
                            allShifts={allShifts}
                        />
                    ))
                ) : (
                    // Empty state for the day
                    <p className="no-shifts">No shifts scheduled.</p>
                )}
            </div>
        </div>
    );
}

export default DayColumn;