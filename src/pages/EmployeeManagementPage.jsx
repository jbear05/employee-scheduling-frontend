import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';
import EmployeeListTable from '../components/employees/EmployeeListTable'; 
import { Link, Outlet, useLocation } from 'react-router-dom';

function EmployeeManagementPage() {
  // 1. Define States for Data, Loading, and Error
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Define the Action: Fetching Data
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Call the service function to get data from Spring Boot
      const data = await getEmployees(); 
      setEmployees(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load employee list. Check API connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Trigger the Action using useEffect
  useEffect(() => {
    fetchEmployees();
  }, []); // Empty dependency array [] means run ONLY once on mount

  // Function to handle deletion and update the list without a full page refresh
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      // After successful deletion, update the state by filtering the removed employee
      setEmployees(employees.filter(emp => emp.id !== id));
      // Optionally show a success toast message here
    } catch (err) {
      console.error("Delete Error:", err);
      // Optionally show an error toast message here
    }
  };

  // Check the current location to decide what to show
  const location = useLocation();
  const isListPath = location.pathname.replace(/\/$/, "") === '/employees';

  // 4. Handle Statuses with Conditional Rendering
  if (isLoading) {
    return <div>Loading Employee Data...</div>; // ⏳
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>⚠️ Error: {error}</div>;
  }

  // Success state: Render the main component, passing data and handlers
  return (
      <div className="page-container employee-management">
          
          {/* 1. RENDER THE CONTENT BASED ON THE PATH */}
          {isListPath && (
              <>
                  {/* The Add Button and List Table ONLY appear on /employees */}
                  <Link to="/employees/new" className="btn-action btn-primary">
                      + Add New Employee
                  </Link>
                  <EmployeeListTable 
                      employees={employees} 
                      onDelete={handleDelete} 
                  />
              </>
          )}

          {/* 2. RENDER THE NESTED FORM (from App.jsx routes) */}
          {/* The <Outlet> is where the content of /employees/new or /employees/edit/:id goes */}
          <Outlet /> 

          {/* * NOTE: If you are seeing content *below* the form on the /new page, 
            * you need to use the method where the nested routes are defined in App.jsx 
            * and only the <Outlet> remains here.
          */}
      </div>
  );
}

export default EmployeeManagementPage;