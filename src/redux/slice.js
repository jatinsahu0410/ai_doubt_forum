import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    prompt: "",
    // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    resultData: "",
    prevPrompt: [],
    newDoubt: false,
}

const promptSlice = createSlice({
    name: "doubts",
    initialState: initailState,
    reducers: {
        setprompt: (state, value) => {
            state.prompt = value.payload;
        },
        setResultData: (state, value) => {
            state.resultData = value.payload;
        },
        setPrevPrompt: (state, value) => {
            state.prevPrompt.push(value.payload);
        },
        setNewDoubt: (state, value) => {
            state.newDoubt = value.payload;
        }
    }
})

export const { setprompt, setPrevPrompt, setResultData, setNewDoubt } = promptSlice.actions;
export default promptSlice.reducer;