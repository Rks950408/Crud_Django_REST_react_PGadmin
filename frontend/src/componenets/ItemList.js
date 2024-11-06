import React, { useEffect, useState } from 'react';
import API from '../api';

function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await API.get('/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/delete/${id}/`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Item List</h2>
      {items.map(item => (
        <div key={item.id} className="p-2 border border-gray-800 rounded-md">
          <span>{item.name} - ${item.price}</span>
          <div className='flex justify-end'>
    <button 
        onClick={() => onEdit(item)} 
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
    >
        Edit
    </button>
    <button 
        onClick={() => deleteItem(item.id)} 
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
    >
        Delete
    </button>
</div>
          
        </div>
      ))}
    </div>
  );
}

export default ItemList;
