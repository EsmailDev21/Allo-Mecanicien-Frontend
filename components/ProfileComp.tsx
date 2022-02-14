import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Pressable,
	FlatList,
	StyleSheet,
} from "react-native";
import React, { useState } from "react";
import ProfilePicture from "./core-components/ProfilePicture";
import { styles } from "../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { useLocation } from "../hooks";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { selectUserData } from "../redux/slices/userSlice";
import axios from "axios";
import { API_URL } from "../url";

const ProfileComp = () => {
	const navigation = useNavigation();
	const [pressed, setPressed] = useState(false);
	const { location, address } = useLocation({
		coords: {
			longitude: 0,
			latitude: 0,
		},
	});
	const userData = useSelector(selectUserData)
	const profileImage = userData.profileImage
	const name = userData.fullName
	const username = userData.username
	const email = userData.email
	const currentAddress = userData.currentAddress
	const permanentAddress = userData.permanentAddress
	const birthDate = userData.birthDate
	const age = userData.age
	const phone = userData.phone
	const accountNumber = userData.accountNumber
	const logoutHandler = async () => {
		setPressed(!pressed)
		await axios.get(`${API_URL}/auth/client/logout/${userData.id}`).then(
			(res) => {
			console.log(res.data)
			navigation.navigate('Landing')}
		).catch(err => console.log(err))
	}
	return (
		<View
			style={{
				marginTop: 20,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ProfilePicture src={profileImage} />
			<Text
				style={{ fontSize: 24, color: "darkslateblue", fontWeight: "bold" }}
			>
				{name}
			</Text>
			<Text
				style={{ fontSize: 12, fontWeight: "normal", color: colors.gray[300] }}
			>
				{username}
			</Text>
			<View style={[{ paddingVertical: 10, flex: 1, maxHeight: 300 }]}>
				<FlatList
					style={{
						borderTopEndRadius: 10,
					}}
					data={[
						{
							label: name + Math.ceil((Math.random() * 10)).toString(),
							icon: "person-outline",
							id: 0,
						},
						{ label: email, icon: "mail", id: 1 },
						{ label: currentAddress, icon: "location", id: 2 },
						{ label: phone, icon: "phone-portrait-outline", id: 3 },
						{ label: permanentAddress, icon: "globe-outline", id: 4 },
						{ label: birthDate, icon: "today-sharp", id: 5 },
						{ label: age, icon: "today-outline", id: 6 },
						{ label: accountNumber, icon: "creditcard", id: 7 },
					]}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => (
						<UserDetails icon={item.icon} label={item.label} />
					)}
				/>
			</View>

			<Pressable
				onPress={() => logoutHandler()}
				style={
					pressed
						? [styles.buttonPrimary, styles.row, styling.btnRed]
						: [styles.buttonPrimary, styles.row, styling.btnRedClick]
				}
			>
				<Ionicons
					name="log-out-outline"
					size={24}
					color={pressed ? "white" : "tomato"}
				/>
				<Text
					style={
						pressed
							? [{ marginHorizontal: 10, fontSize: 18, color: "white" }]
							: [{ marginHorizontal: 10, fontSize: 18, color: "tomato" }]
					}
				>
					Déconnexion
				</Text>
			</Pressable>
		</View>
	);
};

export default ProfileComp;
const styling = StyleSheet.create({
	btnRed: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "tomato",
	},
	btnRedClick: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "tomato",
		borderWidth: 1,
		backgroundColor: "transparent",
	},
	detailsWrapper: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		maxWidth: Dimensions.get("screen").width,
		marginVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.gray[300],
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
});
interface UserDetailsProps {
	id?: number;
	label?: string;
	icon?: string;
	setVal?: (val: string) => void;
}
const UserDetails: React.FC<UserDetailsProps> = ({
	label,
	icon,
	id,
	setVal,
}) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.navigate("Account")}>
			<View style={[styles.row, styling.detailsWrapper]}>
				{icon === "creditcard" ? (
					<AntDesign
						style={{
							marginRight: 70,
							marginLeft: 20,
						}}
						name={icon}
						size={24}
						color={colors.dark[400]}
					/>
				) : (
					<Ionicons
						style={{
							marginRight: 70,
							marginLeft: 20,
						}}
						name={icon}
						size={24}
						color={colors.dark[400]}
					/>
				)}
				<Text
					style={{ textAlign: "center", width: "70%", color: colors.gray[500] }}
					numberOfLines={3}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
