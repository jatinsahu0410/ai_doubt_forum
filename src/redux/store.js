import { configureStore } from "@reduxjs/toolkit";
import promptSlice from "./slice";

export const store = configureStore({
    reducer: {
        doubts: promptSlice,
    }
})