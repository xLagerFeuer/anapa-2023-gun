import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {videoApi} from "@/store/services/videoApi.ts";
import {streamApi} from "@/store/services/streamApi.ts";

const store = configureStore({
    reducer: {
        [videoApi.reducerPath]: videoApi.reducer,
        [streamApi.reducerPath]: streamApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(videoApi.middleware, streamApi.middleware),

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store