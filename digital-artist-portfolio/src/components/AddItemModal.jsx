import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddItemModal.css';

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && link && image) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('link', link);
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:5000/api/portfolio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Adaugă elementul în galerie
        onAddItem(response.data);

        // Resetează câmpurile de introducere
        setTitle('');
        setDescription('');
        setLink('');
        setImage(null);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      contentLabel="Add Item Modal"
    >
      <button className="close-button" onClick={onClose}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18L18 6M6 6l12 12"/>
  </svg>
</button>
      <h2 className="title">Add New Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Client Website Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
      />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </Modal>
  );
}

export default AddItemModal;
