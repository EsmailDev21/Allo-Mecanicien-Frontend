import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { colors } from "../../styles/theme";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/userSlice";

export interface SettingsTopViewProps {
	picture: string;
	name: string;
	email: string;
}
const SettingsTopView: React.FC<SettingsTopViewProps> = ({
	picture,
	name,
	email,
}) => {

	return (
		<View style={styles.container}>
			<ProfilePicture src={picture} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.email}>{email}</Text>
			</View>
		</View>
	);
};

export default SettingsTopView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	name: {
		fontSize: 24,
		fontWeight: "700",
		color: colors.gray[100],
		marginVertical: 5,
	},
	email: {
		fontSize: 12,
		fontWeight: "normal",
		color: colors.gray[300],
	},
	textContainer: {
		flex: 1,
		alignItems: "center",
	},
});
