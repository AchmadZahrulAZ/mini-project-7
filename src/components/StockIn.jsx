import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStock } from '../redux/async/stocksSlice';

const StockIn = () => {
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedQuantity = parseInt(quantity, 10); // Pastikan quantity berupa number
    dispatch(updateStock({ id, quantity: parsedQuantity, type: 'stock_in' }));

    setId('');
    setQuantity('');
  };

  return (
    <div>
      <h2>Stock In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default StockIn;
