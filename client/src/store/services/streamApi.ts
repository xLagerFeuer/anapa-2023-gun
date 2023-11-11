import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const streamApi = createApi({
    reducerPath: "streamApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://rs1.k-lab.su"
    }),
    endpoints: (build) => ({
        sendRtspLinks: build.mutation({
            query: (body) => ({
                url: "/stream/new",
                method: "POST",
                body: body
            })
        })
    })
})

export const {useSendRtspLinksMutation} = streamApi
