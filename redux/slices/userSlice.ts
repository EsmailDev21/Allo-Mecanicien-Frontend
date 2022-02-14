import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export interface UserData {
	id: string;
	username: string;
	fullName: string;
	email: string;
	password: string;
	birthDate: string;
	age: number;
	profileImage: string;
	currentAddress: string;
	permanentAddress: string;
	role: string;
	phone: string;
	accountNumber: string;
	notificationToken: string,
	locationId:string,
	cv: string,
	hashedRt: string,
	salaryPerHour: number,
	receivedNotifications: [],
	sentNotification : [],
	activityId:string

}
export interface UserState {
	userData : UserData
}

const initialState: UserState = {
	userData : {
		id:'',
		fullName:'',
		username:'',
		email:'',
		password:'',
		birthDate:new Date().toString(),
		age:0,
		profileImage:'',
		currentAddress:'',
		permanentAddress:'',
		role:'PASSAGER',
		phone:'+216',
		accountNumber:'',
		cv:'',
		activityId:'',
		hashedRt:'',
		locationId:'',
		notificationToken:'',
		receivedNotifications:[],
		salaryPerHour:0,
		sentNotification:[]

	}
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setUserData
} = userSlice.actions;

//selectors
export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
