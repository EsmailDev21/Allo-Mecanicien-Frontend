import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/global";
import { colors } from "../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, selectAuth, selectLoading } from "../redux/slices/loginSlice";
import axios from "axios";
import { selectUserData, setUserData } from "../redux/slices/userSlice";
import { useToast } from "react-native-toast-notifications";

import { FontAwesome5 } from '@expo/vector-icons';
import { API_URL } from "../url";
const LoginForm = (): JSX.Element => {
	const [focus, setFocus] = React.useState(false);
	const [secure, setSecure] = React.useState(true);
	const [focus2, setFocus2] = React.useState(false);
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [isLoading,setIsLoading] = useState(true)
	let userData = {}
	const user = useSelector(selectUserData)
	const toast = useToast()
	const handleLogin= async ()=> {
		
		try{
			//dispatch(loginStart())
			if(isLoading){
				toast.show('Loading...',{normalColor:"#545dff",icon:(<AntDesign size={24} name="loading1" color={colors.gray[200]}/>)})
			}
		const res =	await axios.post(`${API_URL}/auth/client/login`,{			
			email:email,
			password:password,
		},
		{headers:{
			"Content-type": "application/json; charset=UTF-8",
		}})
		dispatch(loginSuccess());
		setIsLoading(false)
		console.log(res.data)
		res.data[0].user && dispatch(setUserData(res.data[0].user))
		toast.show('Login avec succées',{
			icon:(<FontAwesome5 name="smile-wink" size={24} color="white" />),
			type: "success",
			successColor:"#25ff8d"
		})
		if (user.role==="PASSAGER")
		navigation.navigate('Home')
		else
		navigation.navigate('MecanicienPanel')
		
		
		
		
	}catch(err){
		console.log(err);
		toast.show('Erreur de Login, ressayer plus tard',{
			type: "danger",
			icon:(<FontAwesome5 name="sad-tear" size={24} color="white" />),
			dangerColor:"#ff6054"
		})
		navigation.navigate('Login')
		}
		
	}
	
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
					S'authentifier
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
											shadowColor: colors.teal[400],
											transform: [{ scale: 1.08 }],
											marginVertical: 10,
										},
								  ]
						}
					>
						<TextInput
							value={email}
							onChangeText={(val) => setEmail(val)}
							onEndEditing={() => setFocus(false)}
							onFocus={() => setFocus(true)}
							autoCompleteType="email"
							textContentType="emailAddress"
							placeholder="E-mail"
						/>
					</View>
					<View
						style={
							!focus2
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
							onChangeText={(val) => setPassword(val)}
							secureTextEntry={secure}
							onEndEditing={() => setFocus2(false)}
							onFocus={() => setFocus2(true)}
							textContentType="password"
							placeholder="Mot de passe"
						/>
						<Ionicons
							size={18}
							color={secure ? colors.gray[300] : colors.dark[400]}
							onPress={() => setSecure(!secure)}
							name={secure ? "eye-off-outline" : "eye-sharp"}
						/>
					</View>
				</View>
				<View style={[styles.flex, { marginTop: 20 }]}>
					<TouchableOpacity
						onPress={() => handleLogin()}
						style={[styles.buttonPrimary, styles.row,{backgroundColor:colors.dark[100]}]}
					>
						<Text style={[styles.textLightMd, { marginRight: 5,color:colors.gray[100] }]}>Login</Text>

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
							onPress={() => navigation.navigate("Signup")}
							style={{ margin: 5, paddingHorizontal: 20, paddingVertical: 5 }}
						>
							<Text
								style={{ fontWeight: "normal", fontSize: 18, color: "#111433" }}
							>
								Créer un compte
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => console.log()}
							style={{ margin: 5, paddingHorizontal: 20, paddingVertical: 5 }}
						>
							<Text
								style={{ fontWeight: "100", fontSize: 18, color: "tomato" }}
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
export default LoginForm;

