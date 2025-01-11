import React, { useEffect, useState } from 'react';
import { getMenuItems } from '../../services/menuService';
import { placeOrder } from '../../services/orderService';
import Modal from 'react-modal';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderMessage, setOrderMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
      setFilteredItems(items);
    };
    fetchMenuItems();
  }, []);

  const handleSearch = () => {
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleAddToOrder = (item) => {
    setCurrentItem(item);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handlePlaceOrder = async () => {
    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    const orderData = [
      {
        menuItemId: currentItem._id,
        quantity,
      },
    ];

    try {
      const placedOrder = await placeOrder(orderData, token);
      setOrderMessage('Your order has been placed successfully!');
      closeModal();
      setTimeout(() => {
        setOrderMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      setOrderMessage('Failed to place your order. Please try again.');
      setTimeout(() => {
        setOrderMessage(null);
      }, 3000);
      closeModal();
    }
  };

  return (
    <div className="menu-container">
      {orderMessage && (
        <div className="alert alert-info" role="alert">
          {orderMessage}
        </div>
      )}

      <h2 className="text-center my-4">Menu</h2>

      <div className="row mb-4">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.category}</p>
                <p className="card-price">${item.price}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToOrder(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Quantity Selection" className="modal-content">
        <h3>Select Quantity</h3>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-success" onClick={handlePlaceOrder}>
            Confirm
          </button>
          <button className="btn btn-secondary ml-2" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
      <style>{`
      /* Custom styling for the Menu component */
.menu-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.card {
  border: none;
  transition: transform 0.3s ease;
  border:2px solid black;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
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

input.form-control {
  border-radius: 5px;
}

button {
  border-radius: 5px;
}

button.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

button.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

button.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
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

@media (max-width: 767px) {
  .card {
    margin-bottom: 20px;
  }
}

@media (min-width: 768px) {
  .card-body {
    padding: 20px;
  }
}

@media (min-width: 1200px) {
  .menu-container {
    padding: 40px;
  }
}

      `}</style>
    </div>
   
  );
};

export default Menu;
