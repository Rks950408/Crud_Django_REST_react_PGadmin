import React, { useState, useEffect } from 'react';
import API from '../api';

function ItemForm({ itemToEdit, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, description, price };

    try {
      if (itemToEdit) {
        await API.put(`/items/update/${itemToEdit.id}/`, itemData);
      } else {
        await API.post('/items/create/', itemData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {itemToEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default ItemForm;
