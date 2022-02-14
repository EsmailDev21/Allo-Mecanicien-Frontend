import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import SettingsComp from "../components/SettingsComp";
import { selectUserData } from "../redux/slices/userSlice";
import { colors } from "../styles/theme";

const Settings = () => {
	const userData = useSelector(selectUserData);
	const name = userData.fullName
	const email = userData.email
	const profileImage = userData.profileImage
	return (
		<SafeAreaView
			style={{
				height: "100%",
				backgroundColor: colors.dark[100],
				paddingVertical: 40,
			}}
		>
			<SettingsComp
				name={name}
				email={email}
				picture={profileImage}
			/>
		</SafeAreaView>
	);
};

export default Settings;
