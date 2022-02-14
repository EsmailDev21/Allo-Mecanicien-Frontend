import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
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
const HomeComp = () => {
	const navigation = useNavigation();
	const params = {
		access_key: "pk.e761e8a5ca2fb090c0b5265f423d11b2",
	};
	
	const dispatch = useDispatch();
	const loading = useSelector(selectLoading);
	const nearbyMecaniciens = useSelector(selectData);
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
	
	const getNearbyMecaniciens = async(id:string) => {
		const res =  await axios.get(`${API_URL}/user/mecaniciens/nearby/${id}`)
		dispatch(setNearbyMecaniciens([...res.data]))
	}
	const updateUserLocation = async(id:string)=> {
		const res = await axios.put(`${API_URL}/user/update/${id}`,{
			currentAddress:address
		})
		dispatch(setUserData({
			...userData,
			currentAddress:res.data.currentAddress
		}))
		console.log(userData)
	}
	/*const getAllLocations = async (users:UserData[]) => {
		
		let response = await users.map((user)=> {return user.currentAddress})
		if(response.length!==0){
			response.map(async(res)=> {
					await axios.get(
					`https://eu1.locationiq.com/v1/forward.php?key=${params.access_key}&&q=${res}&format=json`
				).then(
					res => {
						if(res.data)
							//setlocations([...res.data]);
							console.log(res.data)
					}
				).catch(err=>console.log(err))

			})
		}
	}*/
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
	useEffect(
		()=> {
			updateUserLocation(userData.id);
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
			getLocations()
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
					
						{locations?locations.map(
							(item)=> (
								<Marker coordinate={{
									longitude:item.location.lon,
									latitude: item.location.lat
								}}
								pinColor={colors.dark[300]}
								 />
							)
						):<Text>Loading nearby mecaniciens</Text>
							}
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
