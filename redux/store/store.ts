import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slices/addressSlice";
import userReducer from "../slices/userSlice";
import signupReducer from "../slices/signupSlice";
import serviceReducer from '../slices/serviceSlice'
import loginReducer from "../slices/loginSlice";
import notificationReducer from '../slices/notificationSlice'
import requestServiceReducer from "../slices/requestSlice";
import allServicesReducer from "../slices/allServicesSlice";
import nearbymecaniciensReducer from '../slices/nearbyMecaniciensSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		address: addressReducer,
		signup : signupReducer,
		login : loginReducer,
		service : serviceReducer,
		notification : notificationReducer,
		requestService:requestServiceReducer,
		allservices:allServicesReducer,
		nearbymecaniciens:nearbymecaniciensReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
