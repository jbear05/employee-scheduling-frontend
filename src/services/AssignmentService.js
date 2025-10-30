import api from '../api/axiosConfig';

// Fetch assignments with optional query parameters (e.g., { week: '2024-10-28', employeeId: 1 })
export const getAssignments = async (params = {}) => {
  try {
    // Axios automatically converts the params object into a query string (?week=...)
    const response = await api.get('/assignments', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

export const createAssignment = async (assignmentData) => {
  const response = await api.post('/assignments', assignmentData);
  return response.data;
};

// Updates the assignment with the given ID
export const updateAssignment = async (id, assignmentData) => {
  const response = await api.put(`/assignments/${id}`, assignmentData);
  return response.data;
};

// Deletes the assignment with the given ID
export const deleteAssignment = async (id) => {
  const response = await api.delete(`/assignments/${id}`);
  // DELETE requests often don't return data, just a status code (like 204 No Content)
  return response.status; 
};