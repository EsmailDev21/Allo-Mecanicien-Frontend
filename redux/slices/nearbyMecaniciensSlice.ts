import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { UserData } from "./userSlice";

export interface NearbyMecaniciensState {
	data:UserData[],
    loading:boolean,
    error:string
}

const initialState: NearbyMecaniciensState = {
	data:[],
    error:'',
    loading:true
	
};

export const NearbyMecaniciensSlice = createSlice({
	name: "nearbymecaniciens",
	initialState,
	reducers: {
       setNearbyMecaniciens:(state,{payload})=> {
           state.loading = false
           state.data = payload
           state.error = ''
       }                
	},
});

// Action creators are generated for each case reducer function
export const { setNearbyMecaniciens } = NearbyMecaniciensSlice.actions;
//selectors
export const selectNearbyMecaniciens = (state: RootState) => state.nearbymecaniciens.data
export const selectLoading = (state: RootState) => state.nearbymecaniciens.loading;
export const selectError =(state:RootState) =>state.nearbymecaniciens.error

export default NearbyMecaniciensSlice.reducer;
