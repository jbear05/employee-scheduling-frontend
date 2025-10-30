import api from '../api/axiosConfig';

export const getShifts = async () => {
  try {
    const response = await api.get('/shifts');
    return response.data;
  } catch (error) {
    console.error("Error fetching shifts:", error);
    throw error;
  }
};

//get shifts by id
export const getShiftById = async (id) => {
    try {
        const response = await api.get(`/shifts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching shift ${id}:`, error);
        throw error;
    }
};

export const createShift = async (shiftData) => {
  const response = await api.post('/shifts', shiftData);
  return response.data;
};

export const updateShift = async (id, shiftData) => {
  try {
    // Send the data to the specific shift resource endpoint
    const response = await api.put(`/shifts/${id}`, shiftData);
    return response.data;
  } catch (error) {
    console.error(`Error updating shift ${id}:`, error);
    throw error;
  }
};

export const deleteShift = async (id) => {
  try {
    // Send the DELETE request to the specific shift resource endpoint
    const response = await api.delete(`/shifts/${id}`);
    // Return the HTTP status (e.g., 204 No Content) to indicate success
    return response.status; 
  } catch (error) {
    console.error(`Error deleting shift ${id}:`, error);
    throw error;
  }
};