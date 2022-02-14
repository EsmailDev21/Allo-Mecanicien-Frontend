import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface LoginState {
	isAuth: boolean;
	isLoading:boolean;
    error:string
}

const initialState: LoginState = {
	isAuth: false,
	isLoading:false,
    error:''
	
};

export const LoginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		loginStart:(state)=>{
            state.isLoading = true;
            
        },
        loginSuccess:(state)=>{
            state.isLoading = false;
            state.isAuth = true;
        },
        loginFail:(state,action)=>{
            state.isAuth = false;
            state.isLoading = false;
            state.error = action.payload
        }
	},
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail} = LoginSlice.actions;
//selectors
export const selectAuth = (state: RootState) => state.login.isAuth;
export const selectLoading = (state: RootState) => state.login.isLoading;
export const selectError =(state:RootState) =>state.login.error

export default LoginSlice.reducer;
