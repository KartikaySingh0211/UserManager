import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UsersUIState {
	searchTerm: string;
}

const initialState: UsersUIState = {
	searchTerm: "",
};

const usersSlice = createSlice({
	name: "usersUI",
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { setSearchTerm } = usersSlice.actions;
export default usersSlice.reducer;
