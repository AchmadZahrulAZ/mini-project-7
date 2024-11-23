import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../utils/api';
import { createLog } from './logsSlice'; // Import createLog dari logsSlice.js

export const updateStock = createAsyncThunk('stocks/updateStock', async ({ id, quantity, type }, { dispatch, rejectWithValue }) => {
  try {
    // Fetch current product data
    const { data: product } = await axios.get(`${API_URL}/products/${id}`);

    // Pastikan stok di-backend berupa number
    if (typeof product.stock !== 'number') {
      throw new Error('Stock must be a number');
    }

    // Calculate new stock
    const updatedStock = type === 'stock_in' ? product.stock + quantity : product.stock - quantity;

    if (updatedStock < 0) {
      throw new Error('Stock cannot be negative');
    }

    // Update stock in the backend
    const response = await axios.patch(`${API_URL}/products/${id}`, { stock: updatedStock });

    // Create a log after updating stock
    const logData = {
      product_id: id,
      type,
      quantity,
      note: type === 'stock_in' ? 'Restocking' : 'Sold',
      date: new Date().toISOString(),
    };
    dispatch(createLog(logData));

    return { id, stock: response.data.stock };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStock.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default stocksSlice.reducer;
