import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./async/stocksSlice";
import productReducer from "./async/productsSlice";
import logReducer from "./async/logsSlice";

export const store = configureStore({
    reducer: {
        stocks: stockReducer,
        products: productReducer,
        logs: logReducer
    }
});