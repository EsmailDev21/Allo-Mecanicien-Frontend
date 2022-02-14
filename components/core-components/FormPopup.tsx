import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MainInput from "./MainInput";
import { colors } from "../../styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../url";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/slices/requestSlice";
import { serviceInit } from "../../redux/slices/serviceSlice";
import { selectUserData, setUserData } from "../../redux/slices/userSlice";
import { requestInit } from "../../redux/slices/requestSlice";
import Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Text, Platform } from "react-native";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export interface FormPopupProps {
	shown: boolean;
	setShown: (shown: boolean) => void;
	title: string;
	description: string;
	service: string;
	pressHandler?: () => void;
	loading:boolean
}

const FormPopup = ({
	shown,
	setShown,
	title,
	description,
	service,
	pressHandler,
	loading
}: FormPopupProps) => {
	//const [expoPushToken, setExpoPushToken] = useState('');

	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();
	const userData = useSelector(selectUserData);
	const serviceRequestData = useSelector(selectData);
	const dispatch = useDispatch();
	const [receiver, setReceiver] = useState({});
	const getReceiver = async (id: string) => {
		await axios
			.get(`${API_URL}/user/${id}`)
			.then((res) => setReceiver(res.data[0].user))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getReceiver(serviceRequestData.receiver);
		registerForPushNotificationsAsync().then((token) => {
			axios.put(`${API_URL}/user/update/${userData.id}`,{
				notificationToken: token,
			})
				
		});

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => setNotification(notification)
		);

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response: any) => {
				console.log(response);
			}
		);

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, [serviceRequestData.receiver]);
	return (
		<React.Fragment>
		{loading?toast.show("Chargement des services, veillez patienter...", {
			normalColor: "#545dff",
			icon: (
				<AntDesign size={24} name="loading1" color={colors.gray[200]} />
			),
		}):	<View style={shown ? styles.formShown : styles.formHidden}>
				<MainInput
					marginVertical={10}
					secure={false}
					value={service}
					placeHolder="Service"
					textColor={colors.dark[400]}
					type={"givenName"}
				/>
				<MainInput
					marginVertical={10}
					secure={false}
					value={title}
					placeHolder="Titre"
					textColor={colors.dark[400]}
					type={"givenName"}
				/>

				<MainInput
					marginVertical={10}
					secure={false}
					value={description}
					placeHolder="Description"
					textColor={colors.dark[400]}
					type={"givenName"}
					numberOfLines={3}
				/>

				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => setShown(!shown)}
						style={{
							backgroundColor: "tomato",
							borderRadius: 1000,
							padding: 10,
							marginVertical: 10,
							elevation: 8,
							marginHorizontal: 10,
						}}
					>
						<Feather name="x" color={"white"} size={30} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							pressHandler;
							sendPushNotification(receiver.notificationToken, service, title, {
								description,
							});
						}}
						style={{
							backgroundColor: colors.teal[600],
							borderRadius: 10000,
							padding: 10,
							marginVertical: 10,
							elevation: 8,
							marginHorizontal: 10,
						}}
					>
						<Ionicons name="send" color={"white"} size={30} />
					</TouchableOpacity>
				</View>
			</View>}
		</React.Fragment>
	);
};

export default FormPopup;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
	formShown: {
		flex: 1,
		justifyContent: "center",
		elevation: 15,
		borderRadius: 10,
		alignItems: "center",
		backgroundColor: "#fffa",
		transform: [{ translateY: -Dimensions.get("screen").height / 12 }],
	},
	formHidden: {
		transform: [{ translateY: 3000 }],
	},
});
async function sendPushNotification(
	receiverToken: string,
	title: string,
	body: string,
	data?: {}
) {
	const message = {
		to: receiverToken,
		sound: "default",
		title: title,
		body: body,
		data: data,
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const {
			status: existingStatus,
		} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
}
