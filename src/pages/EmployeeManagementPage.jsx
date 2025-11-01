import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';
import EmployeeListTable from '../components/employees/EmployeeListTable'; 
import { Link, Outlet, useLocation } from 'react-router-dom';

function EmployeeManagementPage() {
  // 1. Define States for Data, Loading, and Error
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // GET LOCATION FIRST - MOVE THIS UP HERE
  const location = useLocation();

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

  // 3. Check the current path
  const isListPath = location.pathname.replace(/\/$/, "") === '/employees';

  // 4. Trigger the Action using useEffect
  useEffect(() => {
    if (isListPath) {
      fetchEmployees();
    }
  }, [isListPath]);

  // Function to handle deletion and update the list without a full page refresh
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // 5. Handle Statuses with Conditional Rendering
  if (isLoading) {
    return <div>Loading Employee Data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>⚠️ Error: {error}</div>;
  }

  // Success state: Render the main component, passing data and handlers
  return (
      <div className="page-container employee-management">
          {isListPath && (
              <>
                  <Link to="/employees/new" className="btn-action btn-primary">
                      + Add New Employee
                  </Link>
                  <EmployeeListTable 
                      employees={employees} 
                      onDelete={handleDelete} 
                  />
              </>
          )}
          <Outlet /> 
      </div>
  );
}

export default EmployeeManagementPage;