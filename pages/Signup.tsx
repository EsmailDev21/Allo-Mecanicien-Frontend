import React from "react";
import { SafeAreaView, Text } from "react-native";
import SignupForm from "../components/SignupForm";

const Signup = () => {
	return (
		<SafeAreaView
			style={{ height: "100%", paddingTop: 100, backgroundColor: "#fff" }}
		>
			<SignupForm />
		</SafeAreaView>
	);
};

export default Signup;
