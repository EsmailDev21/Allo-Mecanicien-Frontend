import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface SignupState {
	isAuth: boolean;
	isLoading:boolean;
    error:string
}

const initialState: SignupState = {
	isAuth: false,
	isLoading:false,
    error:''
	
};

export const SignupSlice = createSlice({
	name: "signup",
	initialState,
	reducers: {
		signUpStart:(state)=>{
            state.isLoading = true;
            
        },
        signUpSuccess:(state)=>{
            state.isLoading = false;
            state.isAuth = true;
        },
        signUpFail:(state,action)=>{
            state.isAuth = false;
            state.isLoading = false;
            state.error = action.payload
        }
	},
});

// Action creators are generated for each case reducer function
export const { signUpStart, signUpSuccess, signUpFail } = SignupSlice.actions;
//selectors
export const selectAuth = (state: RootState) => state.signup.isAuth;
export const selectLoading = (state: RootState) => state.signup.isLoading;
export const selectError =(state:RootState) =>state.signup.error

export default SignupSlice.reducer;
