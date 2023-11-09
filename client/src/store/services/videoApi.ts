// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const videoApi = createApi({
    reducerPath: "videoApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Обновите baseUrl
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file) => ({
                url: '/video/upload', // Обновите URL
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = videoApi;
