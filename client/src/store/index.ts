import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {videoApi} from "@/store/services/videoApi.ts";
import {streamApi} from "@/store/services/streamApi.ts";
import {eventsApi} from "@/store/services/eventsApi.ts";

const store = configureStore({
    reducer: {

        [eventsApi.reducerPath]: eventsApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [streamApi.reducerPath]: streamApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(videoApi.middleware, streamApi.middleware, eventsApi.middleware),

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store