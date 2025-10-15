import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/users/usersApi";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		ui: uiReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
