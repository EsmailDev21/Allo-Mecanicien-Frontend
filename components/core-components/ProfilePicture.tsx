import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../styles/theme";

export interface ProfilePictureProps {
	src: string;
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ src }) => {
	return (
		<View>
			<Image style={styles.image} source={{ uri: src }} />
		</View>
	);
};

export default ProfilePicture;
const styles = StyleSheet.create({
	image: {
		height: 150,
		width: 150,
		borderRadius: 100000,
		borderColor: colors.dark[200],
		marginVertical: 20,
	},
});
