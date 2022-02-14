import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface RequestServiceState {
	data:{
        service:string,
        sender:string,
        receiver:string
    },
    error:string,
    isPending:boolean,
    isAccepted:boolean,
    isDeclined:boolean
}

const initialState: RequestServiceState = {
	data:{
        service:'',
        sender:'',
        receiver:''
        
    },
    error:'',
    isPending:false,
    isAccepted:false,
    isDeclined:false
	
};

export const requestServiceSlice = createSlice({
	name: "requestService",
	initialState,
	reducers: {
		requestInit:(state,action)=>{
            state.isPending = true;
            state.data = action.payload
        },
        requestAccepted:(state)=>{
            state.isPending = false
            state.isAccepted = true
        },
        requestDeclined:(state)=>{
            state.isPending = false,
            state.isDeclined = true
        },
        requestError:(state,action)=>{
            state.error = action.payload
        }
       
	},
});

// Action creators are generated for each case reducer function
export const { requestInit,requestAccepted,requestDeclined,requestError } = requestServiceSlice.actions;
//selectors
export const selectData = (state: RootState) => state.requestService.data;
export const selectPending = (state: RootState) => state.requestService.isPending;
export const selectError =(state:RootState) =>state.requestService.error;

export const selectAccepted = (state: RootState) => state.requestService.isAccepted;
export const selectDeclined =(state:RootState) =>state.requestService.isDeclined;


export default requestServiceSlice.reducer;
