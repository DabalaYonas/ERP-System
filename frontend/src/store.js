import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";

const store = configureStore({reducer: userReducer});

export default store;