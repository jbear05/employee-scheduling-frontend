import React from 'react';
// Import utility to help with class assignment
// import { getShiftColorClass } from '../../utils/styleHelpers'; 

/**
 * Renders a single shift assignment block.
 * @param {object} assignment - The specific assignment object for the current day.
 * @param {Array} allEmployees - List of all employees (for name lookup).
 * @param {Array} allShifts - List of all shift templates (for time/role lookup).
 */

function ShiftCard({ assignment, allEmployees, allShifts }) {
    
    // 1. Look Up Employee Name (based on ID)
    // Find the employee object whose ID matches the assignment's assignedEmployeeId
    const employee = allEmployees.find(emp => emp.id === assignment.assignedEmployeeId);

    // 2. Look Up Shift Template Details (based on ID)
    // Find the shift object whose ID matches the assignment's shiftTemplateId
    const shiftTemplate = allShifts.find(shift => shift.id === assignment.shiftTemplateId);

    // Handle case where linked data is not found (e.g., deleted employee)
    if (!employee || !shiftTemplate) {
        return (
            <div className="shift-card shift-card--error">
                <p>Assignment data incomplete or broken.</p>
            </div>
        );
    }
    
    // 3. Prepare Display Data
    const employeeName = employee.name;
    const shiftRole = shiftTemplate.requiredRole;
    const timeRange = `${shiftTemplate.startTime} - ${shiftTemplate.endTime}`;
    
    // Determine the color class based on the shift role (e.g., 'Server' -> 'shift-card--server')
    // This is where custom logic or a utility function (getShiftColorClass) would be used.
    // For now, we'll use a basic template:
    const cardClass = `shift-card shift-card--${shiftRole.toLowerCase().replace(/\s/g, '')}`; 

    return (
        // The entire card container, using the calculated class for coloring
        <div 
            className={cardClass}
            // Use an onClick handler here if you want to open a modal to edit the assignment
            // onClick={() => openEditModal(assignment.id)}
        >
            <div className="shift-card__header">
                {/* Optional: The three dots menu for fast actions/drag-handle */}
                <span className="shift-card__menu-icon">⋮</span>
            </div>

            <div className="shift-card__body">
                {/* Employee Name */}
                <div className="employee-name">**{employeeName}**</div>
                
                {/* Time Range */}
                <div className="shift-time">{timeRange}</div>
            </div>

            {/* Role */}
            <div className="shift-role-label">
                {shiftRole}
            </div>
        </div>
    );
}

export default ShiftCard;