import api from '../api/axiosConfig';

export const getEmployees = async () => {
  try {
    const response = await api.get('/employees');
    return response.data; // The data from your Spring Boot Controller
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  // Send the data (employeeData) in the request body
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  try {
    // Sends the updated data to the specific employee resource endpoint
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    // Sends the DELETE request to the specific employee resource endpoint
    const response = await api.delete(`/employees/${id}`);
    // DELETE requests often don't return data, so we can return the status
    return response.status; 
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    throw error;
  }
};