import React from "react";
import { SafeAreaView } from "react-native";
import LoginForm from "../components/LoginForm";

const Login = (): JSX.Element => {
	return (
		<SafeAreaView
			style={{ height: "100%", paddingTop: 100, backgroundColor: "#fff" }}
		>
			<LoginForm />
		</SafeAreaView>
	);
};

export default Login;
