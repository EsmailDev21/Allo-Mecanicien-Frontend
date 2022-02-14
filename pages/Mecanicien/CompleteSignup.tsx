import {
	Picker,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { styles } from "../../styles/global";
import { colors } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
	signUpStart,
	signUpSuccess,
} from "../../redux/slices/signupSlice";
import { PaperSelect } from "react-native-paper-select";
import { Colors } from "react-native-paper";
import axios from "axios";
import { API_URL } from "../../url";
import { selectUserData, setUserData } from "../../redux/slices/userSlice";

export interface activityProps {
	_id: string;
	value: string;
}
const CompleteSignup = () => {
	const [activities, setActivities] = useState([]);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [phone, setPhone] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [focus, setFocus] = useState(false);
	const [focus2, setFocus2] = useState(false);
	const [focus4, setFocus4] = useState(false);
	const toast = useToast();
	const name = useSelector(selectUserData).fullName;
	const email = useSelector(selectUserData).email;
	const password = useSelector(selectUserData).password;
	const role = useSelector(selectUserData).role;
	const registerMecanicien = async (
		phone: string,
		activityId: string,
		accountNumber: string
	) => {
	try{	const res = await axios
			.post(
				`${API_URL}/auth/mecanicien/register`,
				{
					fullName: name,
					email: email,
					password: password,
					role: role,
					phone: parseInt(phone),
					activityId: activityId,
					accountNumber: accountNumber,
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
			dispatch(signUpStart());
				toast.show("Loading...", {
					normalColor: "#545dff",
					icon: (
						<AntDesign size={24} name="loading1" color={colors.gray[200]} />
					),
				});
				console.log(res.data);
				dispatch(signUpSuccess());
				navigation.navigate('MecanicienPanel')
				console.log(res.data);

				dispatch(setUserData(res.data[0].user));
			} catch (err) {
				console.log(err);
				toast.show("Erreur d'inscription", {
					type: "danger",
					icon: <FontAwesome5 name="sad-tear" size={24} color="white" />,
					dangerColor: "#ff6054",
				});
				navigation.navigate("Signup");
			}
			
			
	};
	const fetchActivities = async () => {
		const res = await axios
			.get(`${API_URL}/type-service/all`)
			setActivities(res.data)
	};

	let activitiesList: activityProps[] = activities;
	const [activity, setActivity] = useState({
		value: "Choisir vos activités",
		list: [...activitiesList],
		selectedList: [],
		error: "",
	});
	useEffect(() => {
		fetchActivities();
		activitiesList = activities.map((item) => {
			return {
				_id: item.id,
				value: item.label,
			};
		});
	}, [activities]);

	return (
		<SafeAreaView style={{ height: "100%" }}>
			<React.Fragment>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#fffa",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "700",
							fontSize: 24,
							color: "#111433",
							margin: 40,
						}}
					>
						Créer un compte
					</Text>
					<View>
						<View
							style={
								!focus
									? styles.inputField
									: [
											styles.inputField,
											{
												elevation: 4,
												transform: [{ scale: 1.08 }],
												marginVertical: 10,
											},
									  ]
							}
						>
							<TextInput
								value={phone}
								onChangeText={(val) => setPhone(val)}
								onEndEditing={() => setFocus(false)}
								onFocus={() => setFocus(true)}
								autoCompleteType="tel"
								textContentType="telephoneNumber"
								placeholder="Phone"
							/>
						</View>
						<View
							style={
								!focus2
									? styles.inputField
									: [
											styles.inputField,
											{
												elevation: 4,
												transform: [{ scale: 1.08 }],
												marginVertical: 10,
											},
									  ]
							}
						>
							<TextInput
								value={accountNumber}
								onChangeText={(value) => setAccountNumber(value)}
								onEndEditing={() => {
									setFocus2(false);
									console.log(activitiesList);
								}}
								onFocus={() => setFocus2(true)}
								autoCompleteType="tel"
								textContentType="telephoneNumber"
								placeholder="Account number"
							/>
						</View>

						<View
							style={
								!focus4
									? [
											styles.inputField,
											styles.row,
											{ justifyContent: "space-between", alignItems: "center" },
									  ]
									: [
											styles.inputField,
											{
												elevation: 4,
												transform: [{ scale: 1.08 }],
												marginVertical: 10,
											},
											styles.row,
											{ justifyContent: "space-between", alignItems: "center" },
									  ]
							}
						>
							<PaperSelect
								label="Choisir vos activités"
								value={activity.value}
								onSelection={(value: any) => {
									setActivity({
										list: activitiesList,
										value: value.text,
										selectedList: value.selectedList,
										error: "",
									});
								}}
								arrayList={[...activity.list]}
								selectedArrayList={activity.selectedList}
								errorText={activity.error}
								multiEnable={false}
								textInputMode="flat"
								searchStyle={{ iconColor: Colors.blue600 }}
							/>
						</View>
					</View>

					<View style={[styles.flex, { marginTop: 20 }]}>
						<TouchableOpacity
							onPress={() => {
								registerMecanicien(
									phone,
									activity.selectedList[0]._id,
									accountNumber
								);
							}}
							style={[
								styles.buttonPrimary,
								styles.row,
								{ backgroundColor: colors.dark[100] },
							]}
						>
							<Text
								style={[
									styles.textLightMd,
									{ marginRight: 15, color: colors.gray[100] },
								]}
							>
								Submit
							</Text>

							<AntDesign name="arrowright" size={24} color={colors.gray[100]} />
						</TouchableOpacity>
					</View>
				</View>
			</React.Fragment>
		</SafeAreaView>
	);
};

export default CompleteSignup;
