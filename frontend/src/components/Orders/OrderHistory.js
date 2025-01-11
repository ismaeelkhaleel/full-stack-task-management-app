import React, { useContext, useEffect, useState } from 'react';
import { getUserOrders } from '../../services/orderService'; // API service for orders
import { AuthContext } from '../../context/AuthContext'; // Using AuthContext for token and user

const OrderHistory = () => {
  const { user } = useContext(AuthContext); // Get user details
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // If not logged in, skip fetching orders

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const ordersData = await getUserOrders(token);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <div className="alert alert-warning text-center">Please log in to view your orders.</div>;
  if (loading) return <div className="text-center my-4">Loading your orders...</div>;

  const formatCurrency = (value) => {
    return typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : '0.00';
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Order History</h2>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">

                  {order.items.map((item) => (
                    <p key={item.menuItemId._id} className="list-group-item">
                      <p> <strong>{item.menuItemId.name}</strong></p>
                      <p>  Quantity: {item.quantity}</p>
                      <p>  Price: ${formatCurrency(item.menuItemId.price)}</p>
                    </p>
                  ))}
                  <p className="card-text">Total Amount: ${formatCurrency(order.totalAmount)}</p>
                  <p className="card-text">Status: {order.status}</p>
                  <p className="text-muted mt-2">
                    <b>Ordered on:</b> {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">You have no orders yet.</div>
      )}
    </div>
  );
};

export default OrderHistory;
