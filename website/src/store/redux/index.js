import { configureStore } from "@reduxjs/toolkit";
import { botChatApi } from "../../actions/botChat";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[botChatApi.reducerPath]: botChatApi.reducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(botChatApi.middleware),
	});
};
