import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface AddressState {
	address: string;
	location: {};
}

const initialState: AddressState = {
	address: "Loading Address",
	location: {
		longitude: 0,
		latitude: 0,
	},
};

export const AddressSlice = createSlice({
	name: "Address",
	initialState,
	reducers: {
		setAddress: (state, action) => {
			state.address = action.payload;
		},
		setLocation: (state, action) => {
			state.location = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAddress, setLocation } = AddressSlice.actions;

//selectors
export const selectAddress = (state: RootState) => state.address.address;
export const selectLocation = (state: RootState) => state.address.location;

export default AddressSlice.reducer;
