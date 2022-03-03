import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MainInput from "./MainInput";
import { colors } from "../../styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign"
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../../url";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/slices/requestSlice";
import { serviceInit } from "../../redux/slices/serviceSlice";
import { selectUserData, setUserData, UserData } from "../../redux/slices/userSlice";
import { requestInit } from "../../redux/slices/requestSlice";
import Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Text, Platform } from "react-native"

import { useToast } from "react-native-toast-notifications";
import { Modal, Portal } from "react-native-paper";


export interface FormPopupProps {
	shown: boolean;
	setShown: (shown: boolean) => void;
	title: string;
	description: string;
	service: string;
	pressHandler?: () => void;
	additionalDetails:string,
	onChangeDetails?:(e:string)=>void;
}

const FormPopup = ({
	shown,
	setShown,
	title,
	description,
	service,
	pressHandler,
	additionalDetails,
	onChangeDetails
}: FormPopupProps) => {
	//const [expoPushToken, setExpoPushToken] = useState('');
	const toast = useToast();
	const [visible, setVisible] = React.useState(shown);

	
	const containerStyle = {backgroundColor: 'white',marginHorizontal:10,maxHeight:'50%',borderRadius:20,flex:1,alignItems:'center',justifyContent:'center',padding:10};
  
	const userData = useSelector(selectUserData);
	const serviceRequestData = useSelector(selectData);
	const dispatch = useDispatch();
	const [receiver, setReceiver] = useState<UserData>({...userData});
	const getReceiver = async (id: string) => {
		await axios
			.get(`${API_URL}/user/${id}`)
			.then((res) => setReceiver(res.data))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getReceiver(serviceRequestData.receiver);
		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)

	}, [serviceRequestData.receiver]);
	return (
		<Portal>
        <Modal  visible={shown} onDismiss={()=>setShown(!shown)} contentContainerStyle={containerStyle}>
		<View style={{flex:1}}>
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
				<MainInput
					marginVertical={10}
					secure={false}
					value={additionalDetails}
					onChange={onChangeDetails}
					placeHolder="Description"
					textColor={colors.dark[400]}
					type={"givenName"}
					numberOfLines={3}
				/>

				<View style={[styles.row,{alignItems:'center',justifyContent:'center'}]}>
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
						<Feather name="x" color={"white"} size={24} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={
							pressHandler
							
						}
						style={{
							backgroundColor: colors.teal[600],
							borderRadius: 10000,
							padding: 10,
							marginVertical: 10,
							elevation: 8,
							marginHorizontal: 10,
						}}
					>
						<Ionicons name="send" color={"white"} size={24} />
					</TouchableOpacity>
				</View>
		</View>
		       
				 </Modal>
      </Portal>

		
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


