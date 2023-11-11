import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (build) => ({
        getAllEvents: build.query({
            query: () => ({
                url: "/event/all",
                method: "GET"
            }),
        }),
        getEventById: build.query({
            query: (id: string) => ({
                url: `/event/${id}`,
            }),

        })
    })
})
export const {useGetAllEventsQuery, useLazyGetEventByIdQuery} = eventsApi
