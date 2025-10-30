import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders a list of employees in a table format.
 * Receives data and handlers via props from EmployeeManagementPage.
 * * @param {Array} employees - The list of employee objects fetched from the API.
 * @param {function} onDelete - Handler to call when the delete button is clicked.
 */
function EmployeeListTable({ employees, onDelete }) {
    
    // 1. Handle Empty State
    if (!employees || employees.length === 0) {
        // 
        return (
            <div className="empty-state">
                <p>No employees found in the system. Use the "Add New Employee" button to begin scheduling.</p>
            </div>
        );
    }

    return (
        <table className="employee-data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Max Weekly Hrs</th>
                    <th>Actions</th> {/* Column for Edit and Delete buttons */}
                </tr>
            </thead>
            <tbody>
                {/* 2. Map Over Data */}
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        {/* Data Display */}
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>
                        <td>{employee.maxWeeklyHours}</td>
                        
                        <td className="actions-cell">
                            {/* 3. The Edit Action (Routing) */}
                            {/* Uses the Link component to navigate to the nested edit route */}
                            <Link 
                                to={`/employees/edit/${employee.id}`} 
                                className="btn-action btn-edit"
                                title="Edit Employee"
                            >
                                ✏️ Edit 
                            </Link>
                            
                            {/* 4. The Delete Action (Event Handling) */}
                            {/* Calls the onDelete handler passed from the parent */}
                            <button 
                                onClick={() => onDelete(employee.id)} 
                                className="btn-action btn-delete"
                                title="Delete Employee"
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

export default EmployeeListTable;