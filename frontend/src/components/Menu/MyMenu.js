import React, { useState, useEffect } from 'react';
import { getMyMenuItems, deleteMenuItem, updateMenuItem, addMenuItem } from '../../services/menuService'; // Import your service functions
import Modal from 'react-modal';

const MyMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    availability: 'true', // Default to true as a string for the dropdown
  });

  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch menu items for the logged-in user
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMyMenuItems(); // Get menu items added by the logged-in user
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []); // Empty dependency array ensures it only runs once on component mount

  // Handle changes in the form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Add item button click
  const handleAddItem = async () => {
    const newItem = { ...formData, availability: formData.availability === 'true' }; // Ensure availability is boolean
    try {
      const addedItem = await addMenuItem(newItem, token); // API call
      setMenuItems([...menuItems, addedItem]); // Add new item to state
      setFormData({ name: '', price: '', category: '', availability: 'true' }); // Reset form
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error adding item:', error.response?.data || error.message);
    }
  };
  



  // Handle Edit button click
  const handleEditItem = (item) => {
    setCurrentItem(item);
    setFormData({ name: item.name, price: item.price, category: item.category });
    setIsModalOpen(true);
  };

  // Handle Delete button click
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteMenuItem(itemId, token); // Use the token here for authentication
      setMenuItems(menuItems.filter(item => item._id !== itemId)); // Update UI by removing the deleted item
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle Update button click
  const handleUpdateItem = async () => {
    const updatedData = { ...formData, availability: formData.availability === 'true' }; // Ensure availability is boolean
    try {
      const updatedItem = await updateMenuItem(currentItem._id, updatedData, token); // API call
      setMenuItems(
        menuItems.map(item => (item._id === currentItem._id ? updatedItem : item)) // Update the specific item in state
      );
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };
  


  return (
    <div className="menu-container">
      <h2 className="text-center my-4">My Menu</h2>

      <button className="btn btn-primary mb-4" onClick={() => setIsModalOpen(true)}>Add New Item</button>

      <div className="row">
        {menuItems.map((item) => (
          <div key={item._id || item.name} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.category}</p>
                <p className="card-price">${item.price}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditItem(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}


      </div>

      {/* Modal for Add/Edit Item */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Item Form" className="modal-content">
        <h3>{currentItem ? 'Edit Item' : 'Add New Item'}</h3>
        <div>
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-success"
            onClick={currentItem ? handleUpdateItem : handleAddItem}
          >
            {currentItem ? 'Update' : 'Add'}
          </button>
          <button className="btn btn-secondary ml-2" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>

      <style>{`
        .menu-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
        }

        .card {
          border: none;
          transition: transform 0.3s ease;
          border: 2px solid black;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .card-body {
          padding: 15px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
        }

        .card-text {
          font-size: 1rem;
          color: #555;
        }

        .card-price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #28a745;
        }

        .modal-content {
          padding: 20px;
          max-width: 500px;
          margin: auto;
        }

        .modal-content input {
          width: 100%;
          margin-top: 10px;
        }
          .btn-danger {
          margin-left:20px;
          }
      `}</style>
    </div>
  );
};

export default MyMenu;
