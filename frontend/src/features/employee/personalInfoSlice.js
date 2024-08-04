import { createSlice } from "@reduxjs/toolkit";

const personalInfo = createSlice({
    name: 'personalInfo',
    initialState: null,
    reducers: {
        setPersonalInfo(state, action) {
            return { ...state, personalInfo: action.payload };
    }},
});

export const { setPersonalInfo } = personalInfo.actions;
export default personalInfo.reducer;