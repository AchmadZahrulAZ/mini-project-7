import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

// Async Thunks

// Fetch data
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

// Create
export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
});

// Update
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/products/${id}`, updatedData);
  return response.data;
});

// Delete
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
  return id;
});

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
