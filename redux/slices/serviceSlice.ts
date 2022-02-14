import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface ServiceState {
	data:{
        id:string,
        title:string,
        description:string,
        serviceType:string
    },
    error:string,
    isLoading:boolean
}

const initialState: ServiceState = {
	data:{
        id:'',
        title:'',
        description:'',
        serviceType:''
        
    },
    error:'',
    isLoading:false
	
};

export const ServiceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		serviceInit:(state)=>{
            state.isLoading = true;
        },
        setServiceSuccess:(state,action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        setServiceFail:(state,action)=>{
            state.isLoading = false,
            state.data = {
                id:'',
                title:'',
                 description:'',
                serviceType:''
            },
            state.error = action.payload
        }
       
	},
});

// Action creators are generated for each case reducer function
export const { serviceInit,setServiceSuccess,setServiceFail } = ServiceSlice.actions;
//selectors
export const selectData = (state: RootState) => state.service.data;
export const selectLoading = (state: RootState) => state.service.isLoading;
export const selectError =(state:RootState) =>state.service.error

export default ServiceSlice.reducer;
