import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface AllServicesState {
	data:{
        id:string,
        label:string,
        description:string,
        serviceType:string,
        icon?:string
    }[]
}

const initialState: AllServicesState = {
	data:[]
	
};

export const AllServicesSlice = createSlice({
	name: "allservices",
	initialState,
	reducers: {

        setServices:(state,action)=> {
            state.data = action.payload
        }
       
	},
});

// Action creators are generated for each case reducer function
export const { setServices } = AllServicesSlice.actions;
//selectors
export const selectServices = (state: RootState) => state.allservices.data;

export default AllServicesSlice.reducer;
