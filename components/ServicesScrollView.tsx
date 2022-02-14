import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
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
import { selectUserData } from "../redux/slices/userSlice";
import { requestInit } from "../redux/slices/requestSlice";
import { selectServices, setServices } from "../redux/slices/allServicesSlice";
import {selectNearbyMecaniciens} from "../redux/slices/nearbyMecaniciensSlice";
import { useToast } from "react-native-toast-notifications";
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

//const exampleItems = 
/*	{
		pressHandler: () => console.log("Besoin dun mecanicien"),
		icon: "warning-outline",
		label: "Rapport du Panne",
		description: "Je besoin un mécanicien pour fixer mon véhicule",
	},
	{
		pressHandler: () => console.log("Besoin dun piece"),
		icon: "settings-outline",
		label: "Besoin des pièce",
		description: "Je besoin d'acheter une pièce pour dépanner mon véhicule",
	},
	{
		pressHandler: () => console.log("Besoin dun rémorquage"),
		icon: "tow-truck",
		label: "Besoin d'un rémorquage",
		description:
			"Je besoin d'un campion du rémorquage pour transporter mon véhicule",
	},*/

export interface ServicesProps {
	label:string,
	id:string,
	description?:string,
	icon?:string,
	serviceType:string
	
}
const ServicesScrollView: React.FC<CustomCarouselProps> = () => {
	const toast = useToast();
	const serviceRequestData = useSelector(selectData)
	const senderId = useSelector(selectUserData).id;
	const receiverId = useSelector(selectUserData).id;
	const nearbyMecaniciens = useSelector(selectNearbyMecaniciens)
	const [serviceRequestLoading,setServiceRequestLoading] = useState(true)
	const sendRequest = async (to:string) => {

		try {
			const res = await axios
				.post(
					`${API_URL}/service-request/create/from/${senderId}/to/${to}`,
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
								id: to,
							},
						},
						additionalDetails:''
					}
				)
				dispatch(
						requestInit({
							service: res.data.service,
							sender: res.data.sender,
							receiver: res.data.receiver,
							
						})
					)
			if (res) setServiceRequestLoading(false)
		} catch(error) {
			console.log(error);
		}
	};
	const [loading,setLoading] = useState(true)
	const dispatch = useDispatch()
	const services = useSelector(selectServices);
	const [shown, setShown] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const ref = useRef(null);
	const [count,setCount] = useState(0)
	/*const pressHandler = () => {
		dispatch(setServiceSuccess({
			title:item.label,
			description:item.description,
			serviceType: item.serviceType,
			id:item.id
		}))	
	}*/
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
						height: 250,
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

					<Text style={{ fontSize: 30, color: "white" }}>{item.label}</Text>
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
			</View><FormPopup pressHandler={()=> {
				nearbyMecaniciens.forEach((item)=> {
					sendRequest(item.id)
				})
			}} title={services[count].label} loading={serviceRequestLoading} description={services[count].description} service={services[count].serviceType} shown={shown} setShown={() => setShown(false)} /></>
		: toast.show("Chargement des services, veillez patienter...", {
			normalColor: "#545dff",
			icon: (
				<AntDesign size={24} name="loading1" color={colors.gray[200]} />
			),
		})
	}</SafeAreaView>
	);
};

export default ServicesScrollView