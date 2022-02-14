import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData } from "../redux/slices/userSlice";
import { colors } from "../styles/theme";

import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import { API_URL } from "../url";
import * as ImagePicker from 'expo-image-picker';
import ProfilePicture from "../components/core-components/ProfilePicture";

const AccountSettings = () => {
	
	
	const toast = useToast();
	const [pressed, setPressed] = useState(false);
	const dispatch = useDispatch();
	const userData = useSelector(selectUserData);
	const userId = userData.id;
	const [name, setName] = useState(userData.fullName);
	const [email, setEmail] = useState(userData.email);
	const [username, setUsername] = useState(userData.username);
	const [birthdate, setBirthdate] = useState(userData.birthDate);
	const [phone, setPhone] = useState(userData.phone);
	const [currentAddress, setCurrentAddress] = useState(userData.currentAddress);
	const [permanentAddress, setPermanentAddress] = useState(
		userData.permanentAddress
	);
	const [profileImage, setProfileImage] = useState(userData.profileImage);
	const [age, setAge] = useState(userData.age);
	const [accountNumber, setAccountNumber] = useState(userData.accountNumber);
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setProfileImage(result.uri);
		}
	  };
	//handler func
	const handleSubmit = () => {
		axios
			.put(
				`${API_URL}/user/update/${userId}`,
				{
					fullName: name,
					email: email,
					birthDate: birthdate,
					phone: parseInt(phone),
					currentAddress: currentAddress,
					permanentAddress: permanentAddress,
					profilePicture: profileImage
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				dispatch(setUserData(res.data));
				toast.show("Données mis à jour avec succes", {
					type: "success",
					successColor:"#25ff8d"
				});
			})
			.catch((err) => {
				console.log(err);
				toast.show(err.toString(), {
					type: "danger",
					dangerColor:"#ff6054"
				});
			});
	};

	useEffect(() => {
		console.log("Effective call", userData);
	}, [userData]);

	return (
		<SafeAreaView style={{ height: "100%", marginVertical: 10 }}>
			<View style={[{ paddingVertical: 10, flex: 1, marginTop: 20 }]}>
				<TouchableOpacity onPress={pickImage}>
				<ProfilePicture src={profileImage} />
				</TouchableOpacity>
			
				<FlatList
					style={{
						borderTopEndRadius: 10,
					}}
					data={[
						{
							label: name,
							icon: "person-outline",
							id: 0,
							onChangeVal: (val: string) => setName(val),
							onPress: () => setPressed(true),
							pressed: pressed,
						},
						{
							label: email,
							icon: "mail",
							id: 1,
							onChangeVal: (val: string) => setEmail(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: currentAddress,
							icon: "location",
							id: 2,
							onChangeVal: (val: string) => setCurrentAddress(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: phone,
							icon: "phone-portrait-outline",
							id: 3,
							onChangeVal: (val: string) => setPhone(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: permanentAddress,
							icon: "globe-outline",
							id: 4,
							onChangeVal: (val: string) => setPermanentAddress(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: birthdate,
							icon: "today-sharp",
							id: 5,
							onChangeVal: (val: string) => setBirthdate(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: age,
							icon: "today-outline",
							id: 6,
							onChangeVal: (val: number) => setAge(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
						{
							label: accountNumber,
							icon: "creditcard",
							id: 7,
							onChangeVal: (val: string) => setAccountNumber(val),
							onPress: () => setPressed(true),
							pressed: false,
						},
					]}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => (
						<UserDetails
							onChangeVal={(value: string) => {
								item.onChangeVal(value);
							}}
							icon={item.icon}
							label={item.label}
						/>
					)}
				/>
				<View style={{ height: 50 }}>
					<TouchableOpacity onPress={() => handleSubmit()} style={styles.save}>
						<Text style={styles.saveText}>Enregistrer</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default AccountSettings;

const styles = StyleSheet.create({
	save: {
		backgroundColor: colors.dark[200],
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 5,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	saveText: {
		fontWeight: "bold",
		color: colors.gray[200],
		fontSize: 24,
	},
});
interface UserDetailsProps {
	id?: number;
	label?: string | number;
	icon?: string;
	pressed?: boolean;
	onPress?: () => any;
	onChangeVal?: (val: string) => void;
}
const UserDetails: React.FC<UserDetailsProps> = ({
	label,
	icon,
	id,
	onPress,
	onChangeVal,
	pressed = false,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					{
						flex: 1,
						alignItems: "center",
						justifyContent: "flex-start",
						maxWidth: Dimensions.get("screen").width,
						marginVertical: 10,
						borderBottomWidth: 1,
						borderBottomColor: colors.gray[300],
						paddingHorizontal: 5,
						paddingVertical: 10,
						flexDirection: "row",
						minHeight: 100,
					},
				]}
			>
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

				<TextInput
					style={{
						width: "70%",
						fontSize: 12,
						backgroundColor: colors.gray[100],
						borderBottomColor: colors.dark[100],
						paddingVertical: 0,
						height: 50,
						color: colors.gray[200],
					}}
					autoComplete={true}
					value={label}
					onChangeText={onChangeVal}
				/>
			</View>
		</TouchableOpacity>
	);
};
