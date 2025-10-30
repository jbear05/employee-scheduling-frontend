import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders a list of shifts in a table format.
 * Receives data and handlers via props from ShiftManagementPage.
 * * @param {Array} shifts - The list of shift objects fetched from the API.
 * @param {function} onDelete - Handler to call when the delete button is clicked.
 */
function ShiftListTable({ shifts, onDelete }) {
    
    // 1. Handle Empty State
    if (!shifts || shifts.length === 0) {
        // 
        return (
            <div className="empty-state">
                <p>No shifts found in the system. Use the "Add New Shift" button to begin scheduling.</p>
            </div>
        );
    }

    return (
        <table className="shift-data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Required Role</th>
                    <th>Start Time</th>
                    <th>End Time</th> 
                    <th>Actions</th>{/* Column for Edit and Delete buttons */}
                </tr>
            </thead>
            <tbody>
                {/* 2. Map Over Data */}
                {shifts.map((shift) => (
                    <tr key={shift.id}>
                        {/* Data Display */}
                        <td>{shift.name}</td>
                        <td>{shift.requiredRole}</td>
                        <td>{shift.startTime}</td>
                        <td>{shift.endTime}</td>
                        
                        <td className="actions-cell">
                            {/* 3. The Edit Action (Routing) */}
                            {/* Uses the Link component to navigate to the nested edit route */}
                            <Link 
                                to={`/shifts/edit/${shift.id}`} 
                                className="btn-action btn-edit"
                                title="Edit Shift"
                            >
                                ✏️ Edit 
                            </Link>
                            
                            {/* 4. The Delete Action (Event Handling) */}
                            {/* Calls the onDelete handler passed from the parent */}
                            <button 
                                onClick={() => onDelete(shift.id)} 
                                className="btn-action btn-delete"
                                title="Delete Shift"
                            >
                                🗑️ Delete 
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ShiftListTable;