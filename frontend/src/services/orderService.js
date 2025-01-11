import axios from 'axios';

const API_BASE_URL = 'https://full-stack-task-management-app-q906.onrender.com'; 

/**
 * Place a new order.
 * @param {Object} orderData - The data for the order (items, totalAmount).
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Object>} The placed order details.
 */
export const placeOrder = async (orderData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/placeOrder`, { items: orderData }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch all orders for the logged-in user.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Array>} List of user orders.
 */
export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/myOrders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error.response?.data || error.message);
    throw error;
  }
};
