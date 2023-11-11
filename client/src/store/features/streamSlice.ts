import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    firstUrl: string
    secondUrl: string
    thirdUrl: string
    isSuccess: boolean
}

const initialState: IInitialState = {
    firstUrl: "",
    secondUrl: "",
    thirdUrl: "",
    isSuccess: false
}
const streamSlice = createSlice({
    name: "stream",
    initialState,
    reducers: {
        setStreams: (state, action) => {
            state.firstUrl = action.payload.firstUrl
            state.secondUrl = action.payload.secondUrl
            state.thirdUrl = action.payload.thirdUrl
        },
        setSuccess: (state) => {
          state.isSuccess = true
        }
    }
})
export const { setStreams, setSuccess } = streamSlice.actions
export default streamSlice.reducer