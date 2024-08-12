import React, { useState, useEffect } from 'react';
import AddItemModal from './components/AddItemModal';
import Gallery from './components/Gallery';
import IntroSection from './components/IntroSection'; // Import the new component
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <IntroSection />
      <button onClick={() => setModalIsOpen(true)}>Add+</button>
      <AddItemModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onAddItem={handleAddItem}
        className="addModal"
      />
      <Gallery items={items} />
    </div>
  );
}

export default App;
