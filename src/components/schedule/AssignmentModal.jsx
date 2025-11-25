import React, { useState, useEffect } from 'react';
import { createAssignment } from '../../services/AssignmentService';
import { format } from 'date-fns';

function AssignmentModal({ isOpen, onClose, selectedDate, employees, shifts, onSuccess }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        shiftId: '',
        date: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //updates date when selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            setFormData(prev => ({
                ...prev,
                date: format(selectedDate, 'yyyy-MM-dd')
            }));
        }
    }, [selectedDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        console.log("Sending assignment data:", formData);

        try {
            await createAssignment(formData);
            onSuccess();  // Refresh the calendar
            onClose();    // Close modal
        } catch (err) {
            console.error("Error creating assignment:", err);
            setError(err.response?.data?.message || 'Failed to create assignment');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add Assignment for {format(selectedDate, 'MMMM d, yyyy')}</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Employee Dropdown */}
                    <label>Employee:</label>
                    <select 
                        name="employeeId" 
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} - {emp.role}
                            </option>
                        ))}
                    </select>

                    {/* Shift Dropdown */}
                    <label>Shift:</label>
                    <select 
                        name="shiftId" 
                        value={formData.shiftId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Shift</option>
                        {shifts.map(shift => (
                            <option key={shift.id} value={shift.id}>
                                {shift.name} ({shift.startTime} - {shift.endTime})
                            </option>
                        ))}
                    </select>

                    {error && <p className="error">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssignmentModal;