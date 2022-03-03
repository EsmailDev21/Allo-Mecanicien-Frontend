import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { homeStyles } from "../styles/home";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocation } from "../hooks";
import { styles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData, UserData } from "../redux/slices/userSlice";
import axios from "axios";
import { API_URL } from "../url";
import { colors } from "../styles/theme";
import { setServices } from "../redux/slices/allServicesSlice";
import { selectNearbyMecaniciens, selectLoading, setNearbyMecaniciens } from "../redux/slices/nearbyMecaniciensSlice";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
const initialLocation = {
	coords: {
		latitude: 0,
		longitude: 0,
	},
};
export interface MecanicienLocation{
	location:{
		lon:number,
		lat:number
	},
	userId:string
}
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});
const HomeComp = () => {
	const navigation = useNavigation();
	const params = {
		access_key: "pk.e761e8a5ca2fb090c0b5265f423d11b2",
	};
	
	const dispatch = useDispatch();
	const loading = useSelector(selectLoading);
	const nearbyMecaniciens = useSelector(selectNearbyMecaniciens);
	const userData = useSelector(selectUserData)
	const [singlelocation,setSignleLocation] = useState<MecanicienLocation>({
		location:{
			lon:0,
			lat:0
		},
		userId:''
	})
	const [locations, setlocations] = useState([])
	const { location, address } = useLocation(initialLocation);
	const region = {
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,
		latitudeDelta: 0,
		longitudeDelta: 0,
	};
	
	const [notification, setNotification] = useState<Notifications.Notification>();
	const getNearbyMecaniciens = async(id:string) => {
		const res =  await axios.get(`${API_URL}/user/mecaniciens/nearby/${id}`)
		dispatch(setNearbyMecaniciens([...res.data]))
	}
	const updateUserLocation = async(id:string)=> {
		const res = await axios.put(`${API_URL}/user/update/${id}`,{
			currentAddress:address,
		})
		dispatch(setUserData({
			...userData,
			currentAddress:res.data.currentAddress
		}))
		console.log(userData)
	}
	const updateUserNotifToken = async(token:string)=> {
		
		dispatch(setUserData({
			...userData,
			notificationToken:token
		}))
		console.log(userData)
	}
	const getAllLocations = async (users:UserData[]) => {
		let addresses: { userAddress: string; userId: string; }[] = []
		 let mecaniciensLocations: any[] = []
		users.forEach(user => {
			addresses.push({userAddress:user.currentAddress,userId:user.id
			})
		})
		if(addresses.length!==0){
			addresses.forEach(async(address)=> {
				const response = await axios.get(
					`https://eu1.locationiq.com/v1/forward.php?key=${params.access_key}&&q=${address.userAddress}&format=json`
				)
				mecaniciensLocations.push(response.data);
			})
			setlocations([...mecaniciensLocations])
			console.log(locations);
		}else{
			console.log('error')
		}
	}
	/*const getUserLocation = async (id:string) => {
		 await axios.get(`${API_URL}/user/location/${id}`).then(
			 res => {
				 if (res) {
					console.log(res.data)
					return res.data
				 }
				 else{
					 return {longitude:0,latitude:0}
				 }
			 }
		 )
		 .catch(err => console.log(err))
		updateUserLocation(id)
	}*/
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	useEffect(
		()=> {
			if(address !== null && address !=='Loading address ...'){
				updateUserLocation(userData.id)
			}
			getNearbyMecaniciens(userData.id);
			//getAllLocations(nearbyMecaniciens);
			const getLocations = ()=>{
				nearbyMecaniciens.map(async (item) => {
					const res = await axios.get(`${API_URL}/user/location/${item.id}`);
					setSignleLocation({
						location: {
							lon: res.data.longitude,
							lat: res.data.latitude
						},
						userId: item.id,
					});
				})
			console.log(nearbyMecaniciens)}
			getAllLocations(nearbyMecaniciens)
			registerForPushNotificationsAsync().then((token) => {
				axios.put(`${API_URL}/user/update/${userData.id}`,{
					notificationToken: token,
				})
				dispatch(setUserData({
					...userData,
					notificationToken: token,
				  }))
			});
			
			
			// This listener is fired whenever a notification is received while the app is foregrounded
			notificationListener.current = Notifications.addNotificationReceivedListener(
				setNotification
			);
	
			responseListener.current = Notifications.addNotificationResponseReceivedListener(
				(res) => setNotification(res.notification)
			);
	
			return () => {
				notificationListener.current && Notifications.removeNotificationSubscription(
					notificationListener.current
				);
				responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
			};	
		},[userData.id]
	)	
	
	return (
		<View style={homeStyles.container}>
			<View
				style={{
					elevation: 5,
					alignItems: "center",
				}}
			>
				<MapView region={region} style={homeStyles.map}>
					<Marker
						coordinate={{
							latitude: region.latitude,
							longitude: region.longitude,
						}}
					/>
					
						{/*locations?locations.map(
							(item)=> (
								<Marker coordinate={{
									longitude:item.location.lon,
									latitude: item.location.lat
								}}
								pinColor={colors.dark[300]}
								 />
							)
						):<Text>Loading nearby mecaniciens</Text>
							*/}
				</MapView>
			</View>

			<View style={homeStyles.centeredView}>
				<View style={{ margin: "10%" }}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Services")}
						style={homeStyles.alertBtn}
					>
						<Ionicons name="alert-circle" color={"white"} size={24} />
						<Text style={homeStyles.alertBtnTextStyle}>
							J'ai besoin d'aide!
						</Text>
					</TouchableOpacity>
				</View>
				<View style={localStyles.address}>
					<Text style={styles.textDarkMd}>{address}</Text>
				</View>
			</View>
		</View>
	);
					}

export default HomeComp;
const localStyles = StyleSheet.create({
	address: {
		backgroundColor: "white",
		opacity: 0.6,
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
});

async function registerForPushNotificationsAsync() {
	let token;
	
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