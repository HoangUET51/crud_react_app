import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/useSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
