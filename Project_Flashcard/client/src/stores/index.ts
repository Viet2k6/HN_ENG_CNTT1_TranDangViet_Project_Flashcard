import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";
import vocabReducer from "../slices/vocabSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    vocabs: vocabReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
