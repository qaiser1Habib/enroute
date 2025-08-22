import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosRtkBaseQuery } from "../middlewares/apis";

export const botChatApi = createApi({
	reducerPath: "botChatApi",
	baseQuery: axiosRtkBaseQuery,
	tagTypes: ["chats"],
	endpoints: (builder) => ({
		getChatThreads: builder.query({
			query: (formData) => ({
				url: "/v1/bot-chats",
				method: "get",
				params: { chatIds: JSON.stringify(formData) },
			}),
			transformResponse: (response) => response?.payload,
			providesTags: ["chats"],
		}),
		createChatThread: builder.mutation({
			query: (formData) => ({
				url: "/v1/bot-chats",
				method: "post",
				body: formData,
			}),
			invalidatesTags: ["chats"],
		}),
		deleteChatThread: builder.mutation({
			query: (formData) => ({
				url: "/v1/bot-chats",
				method: "delete",
				params: formData,
			}),
			invalidatesTags: ["chats"],
		}),
	}),
});

export const { useGetChatThreadsQuery, useCreateChatThreadMutation, useDeleteChatThreadMutation } = botChatApi;
