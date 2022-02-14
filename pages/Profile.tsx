import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileComp from "../components/ProfileComp";
import { useSelector } from "react-redux";
import {
	selectName,
	selectEmail,
	selectBirthDate,
} from "../redux/slices/userSlice";
import { colors } from "../styles/theme";

const Profile = () => {
	const name = useSelector(selectName);
	const email = useSelector(selectEmail);
	const birthDate = useSelector(selectBirthDate);
	return (
		<SafeAreaView
			style={{
				height: "100%",
				backgroundColor: colors.dark[100],
				paddingVertical: 40,
			}}
		>
			<ProfileComp name={name} email={email} birthDate={birthDate} />
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({});
