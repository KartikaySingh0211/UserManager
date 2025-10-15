import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "./types";

export const usersApi = createApi({
	//set of endpoints. One API Slice per base URL. Each has own middleware.
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		//each endpoint is a request
		baseUrl: "https://jsonplaceholder.typicode.com/",
	}),
	tagTypes: ["Users"],
	endpoints: (build) => ({
		getUsers: build.query<User[], void>({
			query: () => "users",
			providesTags: ["Users"],
		}),
		addUser: build.mutation<User, Partial<User>>({
			query: (user) => ({
				url: "users",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["Users"],
		}),
		updateUser: build.mutation<User, Partial<User> & Pick<User, "id">>({
			query: ({ id, ...patch }) => ({
				url: `users/${id}`,
				method: "PUT",
				body: patch,
			}),
			invalidatesTags: ["Users"],
		}),
		deleteUser: build.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApi;
