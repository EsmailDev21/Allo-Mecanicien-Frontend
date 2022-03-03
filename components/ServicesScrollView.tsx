import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from "react-native";
import {TouchableRipple} from 'react-native-paper'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useCallback, useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { colors } from "../styles/theme";
import FormPopup from "./core-components/FormPopup";
import axios from "axios";
import { API_URL } from "../url";
import { useDispatch, useSelector } from "react-redux";
import { selectData, serviceInit, setServiceSuccess } from "../redux/slices/serviceSlice";
import { selectUserData, UserData } from "../redux/slices/userSlice";
import { requestInit } from "../redux/slices/requestSlice";
import { selectServices, setServices } from "../redux/slices/allServicesSlice";
import {selectNearbyMecaniciens} from "../redux/slices/nearbyMecaniciensSlice";
import { useToast } from "react-native-toast-notifications";
import * as Paper from 'react-native-paper'
interface ItemProps {
	label: string;
	icon: string;
	description: string;
}
interface CustomCarouselProps {}
interface RenderItemProps {
	item: ServicesProps;
	index: number;
}
export interface ServicesProps {
	label:string,
	id:string,
	description?:string,
	icon?:string,
	serviceType:string

}
export async function sendPushNotification(
{ receiverToken, title, body, data }: { receiverToken: string; title: string; body: string; data?: {}; }) {
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
const ServicesScrollView: React.FC<CustomCarouselProps> = () => {
	const toast = useToast();
	const serviceRequestData = useSelector(selectData)
	const senderId = useSelector(selectUserData).id;
	const receiverId = useSelector(selectUserData).id;
	const nearbyMecaniciens = useSelector(selectNearbyMecaniciens)
	const [serviceRequestLoading,setServiceRequestLoading] = useState(true)
	const [loading,setLoading] = useState(true)
	const dispatch = useDispatch()
	const services = useSelector(selectServices);
	const [shown, setShown] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const ref = useRef(null);
	const [details,setDetails] = useState<string>('')
	const [count,setCount] = useState(0)
	const userData = useSelector(selectUserData)
	const sendRequest = async (from:UserData,to:UserData) => {
		try {
			const res = await axios
				.post(
					`${API_URL}/service-request/create/from/${from.id}/to/${to.id}`,
					{
						service: {
							connect: {
								id: services[count].id,
							},
						},
						sender: {
							connect: {
								id: senderId,
							},
						},
						receiver: {
							connect: {
								id: to.id,
							},
						},
						additionalDetails:(details+' at : '+from.currentAddress).toString()
					}
				)
				dispatch(
						requestInit({
							service: res.data.service,
							sender: res.data.sender,
							receiver: res.data.receiver,
						})
					)
			
				sendPushNotification({
						receiverToken: to.notificationToken, title: services[count].serviceType + ' / ' + services[count].label, body: details+' at : '+userData.currentAddress, data: {
							location: userData.currentAddress
						}
					});
				//setServiceRequestLoading(false)
				//setShown(!shown)
		} catch(error) {
			console.log(error);
		}
	};
	const fetchServices = async () => {
		const res = await axios.get(`${API_URL}/services/all/with-details`)
		setLoading(false)
		dispatch(setServices([...res.data]))
		console.log(services)
   }
	const renderItem = useCallback(({ item, index}: RenderItemProps) => {
		return (
			<TouchableOpacity onPress={()=>{setShown(!shown)
			setCount(index)
			}}>
				<View
					style={{
						backgroundColor: colors.dark[300],
						borderRadius: 5,
						height: 300,
						padding: 50,
						marginLeft: 25,
						marginRight: 25,
						elevation: 8,
					}}
				>
					{item.icon === "tow-truck" ? (
						<MaterialCommunityIcons name={item.icon} size={40} color="white" />
					) : (
						<Ionicons name={item.icon} size={40} color="white" />
					)}
					<Text style={{ fontSize: 24, color: "white" }}>{item.label}</Text>
					<Text style={{ color: "white" }}>{item.description}</Text>
				</View>
			</TouchableOpacity>
		);
	}, []);
	useEffect(()=> {
	fetchServices()
}
	,[])
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 50 }}>
			{services.length!==0? <><View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
				<Carousel
					layout={"default"}
					ref={ref}
					data={services}
					sliderWidth={300}
					itemWidth={300}
					renderItem={renderItem}
					onSnapToItem={(index: number) => {
						setActiveIndex(index);
					} } />
			</View>
			<Paper.Provider>
			<FormPopup pressHandler={()=> {
				sendRequest(userData,userData)
				nearbyMecaniciens.forEach((item)=> {
					sendRequest(userData,item)
				})
			}}  additionalDetails={details}
			 onChangeDetails={(val:string)=>setDetails(val)}
			  title={services[count].label}
			    description={services[count].description}
				 service={services[count].serviceType}
				  shown={shown} setShown={() => setShown(!shown)} />
				 
			</Paper.Provider>
			 </>
	
				: <View>
			<Paper.ActivityIndicator  color={colors.dark[400]}/>
			<Text style={{fontSize:24, fontWeight:'bold', color:colors.dark[400]}}>Loading</Text>
			</View>
	}</SafeAreaView>
	);
};
export default ServicesScrollView