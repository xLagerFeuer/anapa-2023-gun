import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const streamApi = createApi({
    reducerPath: "streamApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (build) => ({
        sendRtspLinks: build.mutation({
            query: (body) => ({
                url: "/stream",
                method: "POST",
                body: JSON.stringify(body)
            })
        })
    })
})

export const {useSendRtspLinksMutation} = streamApi