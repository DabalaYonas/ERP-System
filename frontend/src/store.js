import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import companyReducer from "./features/company/companySlice";
import personalInfoReducer from "./features/employee/personalInfoSlice";

const store = configureStore({reducer: {user: userReducer, company: companyReducer}});

export default store;