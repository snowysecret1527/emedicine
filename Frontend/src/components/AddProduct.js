import React, { useState } from 'react';

const AddProduct = () => {
    const [medicine, setMedicine] = useState({
        name: '',
        description: '',
        isAvailable: true,
        price: '',
        category: '',
    });
    const [images, setImages] = useState([]);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMedicine(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append('medicine', JSON.stringify(medicine));

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const res = await fetch('http://127.0.0.1:8081/medicines/add', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
            }

            const data = await res.json();
            setResponse('Medicine added successfully!');
            setError('');
            setMedicine({
                name: '',
                description: '',
                isAvailable: true,
                price: '',
                category: '',
            });
            setImages([]);
        } catch (err) {
            setError(`Error adding medicine: ${err.message}`);
            setResponse('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={medicine.name} onChange={handleChange} required /><br /><br />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={medicine.description} onChange={handleChange} required /><br /><br />

            <label htmlFor="isAvailable">Is Available:</label>
            <input type="checkbox" id="isAvailable" name="isAvailable" checked={medicine.isAvailable} onChange={handleChange} /><br /><br />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={medicine.price} onChange={handleChange} required /><br /><br />

            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={medicine.category} onChange={handleChange} required /><br /><br />

            <label htmlFor="images">Images:</label>
            <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleImageChange} /><br /><br />

            <button type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Medicine'}
            </button>

            {response && <div style={{ color: 'green' }}>{response}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AddProduct;
