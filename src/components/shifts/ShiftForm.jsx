import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Essential for routing
import { getShiftById, createShift, updateShift } from '../../services/ShiftService';


function ShiftForm() {
    // 1. Determine Mode and Setup Navigation
    const { id } = useParams(); // Gets the 'id' from the URL
    const navigate = useNavigate(); // Hook to redirect user after submission
    const isEditMode = !!id; // Boolean: true if 'id' exists

    // 2. Local State Management
    const [formData, setFormData] = useState({ 
        name: '',
        requiredRole: '', 
        startTime: '', 
        endTime: '',
    });

    const [validationErrors, setValidationErrors] = useState({}); // To hold field-specific validation errors
    const [isLoading, setIsLoading] = useState(false); // To show a spinner during API calls
    const [error, setError] = useState(null); // To display submission errors
    
    // 3. useEffect Hook for Data Fetching (Edit Mode ONLY)
    useEffect(() => {
        if (isEditMode) {
            const fetchCurrentShift = async () => {
                setIsLoading(true);
                try {
                    // Call the service function to get data from Spring Boot
                    const data = await getShiftById(id);
                    setFormData(data); // Populate the form state with fetched data
                    setError(null);
                } catch (err) {
                    console.error("Failed to load shift data for editing:", err);
                    // Handle 404 error: Employee not found. Redirect user.
                    navigate('/shifts', { replace: true }); 
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCurrentShift();
        }
    }, [id, isEditMode, navigate]); // Dependencies ensure logic runs correctly

    // 4. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 5. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setValidationErrors({}); // Clear field errors if validation passes
        setIsLoading(true);
        setError(null); // Clear previous submission error before new attempt

        try {
            let response;
            if (isEditMode) {
                // CALL 1: UPDATE (PUT/PATCH) - Used when 'id' exists
                response = await updateShift(id, formData);
            } else {
                // CALL 2: CREATE (POST) - Used when creating new employee
                response = await createShift(formData);
            }

            // Success Handling
            console.log('API Response:', response);
            // Redirect back to the employee list page after success
            navigate('/shifts'); 

        } catch (err) {
            // Error Handling
            console.error("Submission Error:", err.response || err);
            // Display a user-friendly error message, potentially from the backend
            setError(err.response?.data?.message || 'An unexpected error occurred during saving.');
        } finally {
            setIsLoading(false);
        }
    };

    // 6. Render the Form
    return (
        <div className="shift-form-container">
            <h2>{isEditMode ? 'Edit Shift' : 'Create New Shift'}</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Shift Name Input */}
                <label>Shift Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    required 
                />
                
                {/* Required Role Input (e.g., Server, Kitchen) */}
                <label>Required Role:</label>
                <input 
                    type="text" 
                    name="requiredRole" 
                    value={formData.requiredRole}
                    onChange={handleChange} 
                    required 
                />
                
                {/* Start Time Input */}
                <label>Start Time:</label>
                <input 
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />
                
                {/* End Time Input */}
                <label>End Time:</label>
                <input 
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                />

                {validationErrors.name && <p className="field-error">{validationErrors.name}</p>}
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (isEditMode ? 'Update Shift' : 'Create Shift')}
                </button>
            </form>
        </div>
    );
}

export default ShiftForm;