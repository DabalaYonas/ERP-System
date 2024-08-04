import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import personalInfoReducer from "./features/employee/personalInfoSlice";

const store = configureStore({reducer: personalInfoReducer});

export default store;