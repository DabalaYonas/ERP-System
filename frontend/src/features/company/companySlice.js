import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: null,
    reducers: {
        setCompany(state, action) {
            return { ...state, company: action.payload };
    }},
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;