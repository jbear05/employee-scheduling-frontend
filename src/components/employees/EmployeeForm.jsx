import React, { useState, useEffect } from 'react'; // React imports for state management and lifecycle
import { useParams, useNavigate } from 'react-router-dom'; // Essential for routing
import { getEmployeeById, createEmployee, updateEmployee } from '../../services/EmployeeService'; // API service functions


/**
 * EmployeeForm component serves both for creating a new employee and editing an existing one.
 * It determines its mode (create or edit) based on the presence of an 'id' in the URL.
 * It manages form state, handles input changes, and submits data to the backend API.
 * It also handles loading states and displays errors if API calls fail.
 */
function EmployeeForm() {
    // 1. Determine Mode and Setup Navigation
    const { id } = useParams(); // Gets the 'id' from the URL, if it exists. If 'id' is present, we are in edit mode; otherwise, we are in create mode.
    const navigate = useNavigate(); // Hook to redirect user after submission
    const isEditMode = !!id; // Boolean: true if 'id' exists

    // 2. Local State Management
    const [formData, setFormData] = useState({ 
        // Initial empty state for creating a new employee
        name: '', 
        role: '', 
        maxWeeklyHours: '',
    });
    const [validationErrors, setValidationErrors] = useState({}); // To hold field-specific validation errors
    const [isLoading, setIsLoading] = useState(false); // To show a spinner during API calls
    const [error, setError] = useState(null); // To display submission errors
    
    // 3. useEffect Hook for Data Fetching (Edit Mode ONLY)
    useEffect(() => {
        if (isEditMode) {
            // If we are in edit mode, we need to fetch the existing employee data to populate the form
            const fetchCurrentEmployee = async () => {
                setIsLoading(true);
                try {
                    // Call the service function to get data from Spring Boot
                    const data = await getEmployeeById(id);
                    setFormData(data); // Populate the form state with fetched data
                    setError(null);
                } catch (err) {
                    console.error("Failed to load employee data for editing:", err);
                    // Handle 404 error: Employee not found. Redirect user.
                    navigate('/employees', { replace: true }); 
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCurrentEmployee();
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
                response = await updateEmployee(id, formData);
            } else {
                // CALL 2: CREATE (POST) - Used when creating new employee
                response = await createEmployee(formData);
            }

            // Success Handling
            console.log('API Response:', response);
            // Redirect back to the employee list page after success
            navigate('/employees'); 

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
        <div className="employee-form-container">
            <h2>{isEditMode ? 'Edit Employee' : 'Create New Employee'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                {/* Role Input */}
                <label>Role:</label>
                <input 
                    type="text" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    required 
                />
                {/* Max Weekly Hours Input */}
                <label>Max Weekly Hours:</label>
                <input 
                    type="number" 
                    name="maxWeeklyHours"
                    value={formData.maxWeeklyHours}
                    onChange={handleChange}
                    required
                />
                
                {/* Display validation errors for the 'name' field if they exist */}
                {validationErrors.name && <p className="field-error">{validationErrors.name}</p>}
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Create Employee')}
                </button>
            </form>
        </div>
    );
}

export default EmployeeForm;