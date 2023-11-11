import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    firstUrl: string
    secondUrl: string
    thirdUrl: string
    isSuccess: boolean
    port: null | number
}

const initialState: IInitialState = {
    firstUrl: "",
    secondUrl: "",
    thirdUrl: "",
    isSuccess: false,
    port: null
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
        },
        setPort: (state, action) => {
            state.port = action.payload.port
        }
    }
})
export const { setStreams, setSuccess, setPort } = streamSlice.actions
export default streamSlice.reducer