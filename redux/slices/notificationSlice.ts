import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface NotificationState {
	data:{
        id:string,
        title:string,
        description:string,
        image:string,
        token:string
    },
    error:string,
    isLoading:boolean
}

const initialState: NotificationState = {
	data:{
        id:'',
        title:'',
        description:'',
        image:'',
        token:''
        
    },
    error:'',
    isLoading:false
	
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		notificationInit:(state)=>{
            state.isLoading = true
        },
        notificationSent:(state,{payload})=>{
            state.isLoading = false
            state.data = payload;
        },
        notificationFailed:(state)=>{
            state.isLoading = false,
            state.data = {
                id:'',
                description:'',
                image:'',
                title:'',
                token:''
            }
        },
        notificationError:(state,action)=>{
            state.error = action.payload
        }
       
	},
});

// Action creators are generated for each case reducer function
export const { notificationInit,notificationSent,notificationFailed,notificationError } = notificationSlice.actions;
//selectors
export const selectData = (state: RootState) => state.notification.data;
export const selectLoading = (state: RootState) => state.notification.isLoading;
export const selectError =(state:RootState) =>state.notification.error

export default notificationSlice.reducer;
