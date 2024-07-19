import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import '../css/Submit.css';

const Submit = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState(new FormData());
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://3.22.224.142:8000/api/food_items/', {
                method: 'POST',
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccessMessage('Food item submitted successfully!');
            setError(null);
        } catch (error) {
            console.error('Error submitting food item:', error);
            setError('Failed to submit food item.');
            setSuccessMessage(null);
        }
    };

    return (
        <div className="submit-container">
            <div className="background-container">
                <div className="submit-form-container">
                    <h2 className="submit-heading">Submit Food Item</h2>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form className="submit-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="how_to_make">How to Make</label>
                            <textarea
                                id="how_to_make"
                                name="how_to_make"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Submit;
