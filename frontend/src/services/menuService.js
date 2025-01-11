import axios from 'axios';

const API_BASE_URL = 'https://full-stack-task-management-app-q906.onrender.com';  

/**
 * Fetch all user menu items (items added by the logged-in user).
 * @returns {Promise<Array>} List of menu items.
 */
export const getMyMenuItems = async () => {
  const token = localStorage.getItem('token');  
  
  if (!token) {
    throw new Error('No token found, please log in first');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/item/addByMe`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in Authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch all menu items.
 * @returns {Promise<Array>} List of menu items.
 */
export const getMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/menu`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new menu item.
 * @param {Object} itemData - The data for the new menu item (name, category, price, availability).
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Object>} The added menu item.
 */
export const addMenuItem = async (itemData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/item/add`, itemData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding menu item:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing menu item.
 * @param {string} id - The ID of the menu item to update.
 * @param {Object} itemData - The updated data for the menu item.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Object>} The updated menu item.
 */
export const updateMenuItem = async (id, itemData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/item/update/${id}`, itemData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating menu item:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a menu item.
 * @param {string} id - The ID of the menu item to delete.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Object>} Response from the server.
 */
export const deleteMenuItem = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/item/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting menu item:', error.response?.data || error.message);
    throw error;
  }
};
