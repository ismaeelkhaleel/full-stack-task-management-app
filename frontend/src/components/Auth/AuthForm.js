// src/components/Auth/AuthForm.js
import React, { useState } from 'react';

const AuthForm = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="border rounded p-4 shadow bg-light"
        style={{
          width: '100%',
          maxWidth: '400px', // Restrict the form's width on large screens
        }}
      >
        <h3 className="text-center mb-4">{buttonText}</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
