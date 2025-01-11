import React, { useState } from 'react';

const MenuForm = ({ initialData = null, onSubmit, onCancel }) => {
  // Initialize the formData with proper default values
  const [formData, setFormData] = useState({
    name: initialData?.name || '', // Default to an empty string if no initialData
    category: initialData?.category || '',
    price: initialData?.price || '',
    availability: initialData?.availability ?? true, // Default to true if undefined
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'availability' ? value === 'true' : value, // Convert availability to boolean
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h5>{initialData ? 'Edit Item' : 'Add Item'}</h5>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="availability" className="form-label">
          Availability:
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="form-control"
        >
          <option value={true}>Available</option>
          <option value={false}>Unavailable</option>
        </select>
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
