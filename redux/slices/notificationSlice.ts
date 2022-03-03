import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface NotificationState {
	notificationAccept:{
        eta:string,
        prix:string
    }
}

const initialState: NotificationState = {
	notificationAccept:{
        eta:'',
        prix:'',
    }
	
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotificationAcceptPrice:(state,action)=> {
            state.notificationAccept.prix = action.payload
        },
        setNotificationAcceptETA:(state,action)=> {
            state.notificationAccept.eta = action.payload
        }
       
	},
});

// Action creators are generated for each case reducer function
export const { setNotificationAcceptETA,setNotificationAcceptPrice } = notificationSlice.actions;
//selectors
export const selectNotificationAccept = (state: RootState) => state.notification.notificationAccept;

export default notificationSlice.reducer;
