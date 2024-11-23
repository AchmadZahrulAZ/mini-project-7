import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

// Async Thunks
export const fetchLogs = createAsyncThunk("logs/fetchLogs", async (filters = {}) => {
  // Filters: Optional, untuk query seperti product_id atau type
  const queryParams = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}/logs?${queryParams}`);
  return response.data;
});

export const createLog = createAsyncThunk("logs/createLog", async (logData) => {
  const response = await axios.post(`${API_URL}/logs`, logData);
  return response.data;
});

// Slice
const logsSlice = createSlice({
  name: "logs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Logs
      .addCase(fetchLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Create Log
      .addCase(createLog.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default logsSlice.reducer;
