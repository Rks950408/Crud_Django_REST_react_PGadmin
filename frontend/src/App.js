import React, { useState } from 'react';
import ItemList from '../src/componenets/ItemForm';
import ItemForm from '../src/componenets/ItemList';


function App() {
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleSave = () => {
    setItemToEdit(null);
  };

  return (
    <div className="container mx-auto p-4">
      <ItemForm itemToEdit={itemToEdit} onSave={handleSave} />
      <ItemList onEdit={handleEdit} />
    </div>
  );
}

export default App;
