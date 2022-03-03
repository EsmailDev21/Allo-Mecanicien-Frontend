import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/theme';
import axios from 'axios';
import { API_URL } from '../../url';
import {useDispatch, useSelector} from 'react-redux'
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import { selectUserData, setUserData, UserData } from "../../redux/slices/userSlice";
import { useLocation } from '../../hooks';

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
const MecanicienDashboard = () => {
  const params = {
		access_key: "pk.e761e8a5ca2fb090c0b5265f423d11b2",
	};
	
	const dispatch = useDispatch();
	const userData = useSelector(selectUserData)
	const [singlelocation,setSignleLocation] = useState<MecanicienLocation>({
		location:{
			lon:0,
			lat:0
		},
		userId:''
	})
	const [locations, setlocations] = useState<MecanicienLocation[]>([])
	const { location, address } = useLocation(initialLocation);
	const region = {
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,
		latitudeDelta: 0,
		longitudeDelta: 0,
	};
	
	const [notification, setNotification] = useState<Notifications.Notification>();
	
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

 const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();
	useEffect(
		()=> {
			if(address !== null && address !=='Loading address ...'){
				updateUserLocation(userData.id)
			}
			
			registerForPushNotificationsAsync().then(async(token) => {
				await axios.put(`${API_URL}/user/update/${userData.id}`,{
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
    <View style={styles.container}>
      {userData.isVerified === true ? <><Text style={styles.title}>Dashboard</Text>
      <View style={styles.itemsContainer}>
         <View style={styles.item}><Text style={styles.itemText}>Earnings : {userData.earnings}DT</Text></View> 
         <View style={styles.item}><Text style={styles.itemText}>Services done : {userData.servicesDone}</Text></View> 
         <View style={styles.item}><Text style={styles.itemText}>Rating : {userData.rating}/10</Text></View> 
      </View></> : <><View style={{flex:1,justifyContent:'center', alignItems:'center',paddingHorizontal:40,paddingVertical:10 , backgroundColor:colors.dark[100]}}>
	  <Text style={{fontSize:24, fontWeight:'bold', marginLeft:10
        , color:colors.dark[300]
        }}>Vous étes non verifiés , veilleiz patienter jusqu'a nos admin vous fait verifier</Text>
		  </View></>}
    </View>
  );
};

export default MecanicienDashboard;

const styles = StyleSheet.create({
    container:{
      marginTop:80,
        height:'80%',
        flex:1,
        paddingLeft:'10%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.gray[500],
        marginBottom:40
    },
    itemsContainer:{
        flex:1,
        height:50,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    item:{
        marginVertical:30,
        paddingVertical:20,
        borderBottomWidth:1,
        borderBottomColor:colors.dark[400]
    },
    itemText:{
      textAlign:'left',
        fontSize:18,
        fontWeight:'400',
        color:colors.gray[300],

    }
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