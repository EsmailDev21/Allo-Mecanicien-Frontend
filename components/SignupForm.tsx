import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/global";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	signUpSuccess,
	signUpFail,
	selectAuth,
	signUpStart,
} from "../redux/slices/signupSlice";
import { setUserData } from "../redux/slices/userSlice";
import { useToast } from "react-native-toast-notifications";

import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "../url";
import { PaperSelect } from "react-native-paper-select";

const SignupForm = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [focus, setFocus] = useState(false);
	const [focus2, setFocus2] = useState(false);
	const [focus3, setFocus3] = useState(false);
	const [focus4, setFocus4] = useState(false);
	const [secure, setSecure] = useState(true);
	const [role, setRole] = useState({
		value: "Client",
		list:[
		{
			_id:1,
			label:"Client",
			value:"Client"
		},
		{
			_id:2,
			label:"Mecanicien",
			value:"Mecanicien"
		}],
	
	selectedList: [],
	error: "",
		})

	const toast = useToast();
	const mecanicienSignUpHandler =  () => {
		dispatch(setUserData({
			fullName:name,
			email: email,
			password: password,
			role: role.value ==="Client"?"PASSAGER":"ARTISAN",
		}))
		navigation.navigate('CompleteRegister')
	};
	const clientSignupHandler = async () => {
		await axios
			.post(
				`${API_URL}/auth/client/register`,
				{
					fullName: name,
					email: email,
					password: password,
					role: role.value ==="Client"?"PASSAGER":"ARTISAN",
				},
				{
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			)
			.then((res) => {
				dispatch(signUpStart());
				toast.show("Loading...", {
					normalColor: "#545dff",
					icon: (
						<AntDesign size={24} name="loading1" color={colors.gray[200]} />
					),
				});
				console.log(res.data);
				dispatch(signUpSuccess());
				console.log(isAuth);
				dispatch(setUserData(res.data[0].user));
				toast.show("Inscription validée", {
					type: "success",
					icon: <FontAwesome5 name="smile-wink" size={24} color="white" />,
					successColor: "#25ff8d",
				});
				navigation.navigate("Home");
			})
			.catch((err) => {
				console.log(err);
				toast.show("Erreur d'inscription", {
					type: "danger",
					icon: <FontAwesome5 name="sad-tear" size={24} color="white" />,
					dangerColor: "#ff6054",
				});
				navigation.navigate("Signup");
			});
	};
	React.useEffect(() => {
		async () => {};
	}, []);

	return (
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
							value={name}
							onChangeText={(val) => setName(val)}
							onEndEditing={() => setFocus(false)}
							onFocus={() => setFocus(true)}
							autoCompleteType="name"
							textContentType="givenName"
							placeholder="name complet"
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
							value={email}
							onChangeText={(value) => setEmail(value)}
							onEndEditing={() => setFocus2(false)}
							onFocus={() => setFocus2(true)}
							autoCompleteType="email"
							textContentType="emailAddress"
							placeholder="E-mail"
						/>
					</View>
					<View
						style={
							!focus3
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
						<TextInput
							value={password}
							onChangeText={(value) => setPassword(value)}
							secureTextEntry={secure}
							onEndEditing={() => setFocus3(false)}
							onFocus={() => setFocus3(true)}
							textContentType="password"
							placeholder="Mot de passe"
						/>
						<Ionicons
							size={18}
							color={secure ? colors.gray[300] : colors.dark[300]}
							onPress={() => setSecure(!secure)}
							name={secure ? "eye-off-outline" : "eye-sharp"}
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
								
								label="Choisir votre role"
								value={role.value}
								onSelection={(value: any) => {
									setRole({
										...role,
										value: value.text,
										selectedList: value.selectedList,
										error: "",
									});
								}}
								arrayList={[...role.list]}
								selectedArrayList={role.selectedList}
								errorText={role.error}
								multiEnable={false}
								outlineColor={colors.dark[300]}
								activeOutlineColor={colors.dark[300]}
								textInputBackgroundColor={colors.gray[100]}
								searchStyle={{ iconColor: colors.dark[400] }}
							/>
					</View>
				</View>

				<View style={[styles.flex, { marginTop: 20 }]}>
					<TouchableOpacity
						onPress={() => {
							if(role.value === "Client")
								 clientSignupHandler()
								 else
							 mecanicienSignUpHandler();
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
							Continuer
						</Text>

						<AntDesign name="arrowright" size={24} color={colors.gray[100]} />
					</TouchableOpacity>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}
							style={{ margin: 5, paddingHorizontal: 20, paddingVertical: 5 }}
						>
							<Text
								style={{
									fontWeight: "normal",
									fontSize: 18,
									color: colors.dark[100],
									textDecorationLine: "underline",
								}}
							>
								J'ai un compte
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => console.log()}
							style={{ margin: 5, paddingHorizontal: 20, paddingVertical: 5 }}
						>
							<Text
								style={{
									fontWeight: "100",
									fontSize: 18,
									color: "tomato",
									textDecorationLine: "underline",
								}}
							>
								Mot de passe oublié!
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</React.Fragment>
	);
};

export default SignupForm;
