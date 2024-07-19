import React, { useState, useEffect } from 'react';
import '../css/SubmitRecipe.css';  // Import your CSS file

const Submit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [howToMake, setHowToMake] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/food_items/');
        if (response.ok) {
          const result = await response.json();
          setSubmittedData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !description || !ingredients || !howToMake) {
      setError('All fields are required.');
      return;
    }

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);
    formData.append('ingredients', ingredients);
    formData.append('how_to_make', howToMake);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/create_food_item/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Update the submitted data state with the new entry
        setSubmittedData([...submittedData, result]);
        // Clear form fields
        setName('');
        setDescription('');
        setImage(null);
        setIngredients('');
        setHowToMake('');
        setError('');
      } else {
        const errorData = await response.text();  // changed to text to capture HTML error message
        console.error('Failed to submit data', errorData);
        setError('Failed to submit data. ' + errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    }
  };

  return (
    <div className="submit-recipe-container">
      <div className="background-container">
        <div className="form-container">
          <h1 className="form-heading">Submit a Food Item</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="how_to_make">How to Make:</label>
              <textarea
                id="how_to_make"
                value={howToMake}
                onChange={(e) => setHowToMake(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      <div className="submitted-data-container">
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              <p><strong>Ingredients:</strong> {item.ingredients}</p>
              <p><strong>How to Make:</strong> {item.how_to_make}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Submit;
