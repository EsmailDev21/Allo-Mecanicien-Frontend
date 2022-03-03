import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_URL } from "../../url";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/userSlice";
import Notification, {
	NotificationProps,
} from "../../components/mecanicienComponents/Notification";
import { colors } from "../../styles/theme";
import { ActivityIndicator } from "react-native-paper";
import { sendPushNotification } from "../../components/ServicesScrollView";
import { selectNotificationAccept } from "../../redux/slices/notificationSlice";

const getNotifications = async (id: string) => {
	const response = await axios.get(
		`${API_URL}/notification/get_user_notifications/${id}`
	);
	return response;
};

const Notifications = () => {
	const [requests, setRequests] = React.useState<NotificationProps[]>([]);
	const [error, setError] = React.useState<any>();
	const [loading, setLoading] = React.useState(true);
	const currentUser = useSelector(selectUserData);
	const eta = useSelector(selectNotificationAccept).eta;
	const price = useSelector(selectNotificationAccept).prix;
	const onAcceptService = async (request: NotificationProps) => {
		await sendPushNotification({
			receiverToken: currentUser.notificationToken,
			title: "Votre requète à été acceptée",
			body:
				"L'artisan " +
				currentUser.fullName +
				" a accepter votre requète de service, est il sera a votre place dans : " +
				eta +
				". Prix : " +
				price,
			data: {
				location: currentUser.currentAddress,
			},
		});
		await sendPushNotification({
			receiverToken: request.senderNotificationToken,
			title: "Votre requète à été acceptée",
			body:
				"L'artisan " +
				currentUser.fullName +
				" a accepter votre requète de service, est il sera a votre place dans : " +
				eta +
				". Prix : " +
				price,
			data: {
				location: currentUser.currentAddress,
			},
		});
		console.log(request.senderNotificationToken);
	};
	const onDeclineService = async (request: NotificationProps) => {
		await sendPushNotification({
			receiverToken: currentUser.notificationToken,
			title: "Votre requète à été refusée",
			body:
				"L'artisan " +
				currentUser.fullName +
				" a refuse votre requète de service",
			data: {
				location: currentUser.currentAddress,
			},
		});
		await sendPushNotification({
			receiverToken: request.senderNotificationToken,
			title: "Votre requète à été refusée",
			body:
				"L'artisan " +
				currentUser.fullName +
				" a refuse votre requète de service",
			data: {
				location: currentUser.currentAddress,
			},
		});
	};
	const fetchRequests = async (mecanicienId: string) => {
		try {
			const response = await axios.get(
				`${API_URL}/service-request/user-requests/with-details/${mecanicienId}`
			);
			setRequests(response.data);
			setLoading(false);
		} catch (err) {
			setError(err);
		}
	};
	React.useEffect(() => {
		fetchRequests(currentUser.id);
	}, [currentUser.id]);
	return (
		<SafeAreaView style={{ height: "100%" }}>
			{currentUser.isVerified === true ? (
				<ScrollView
					alwaysBounceVertical={true}
					style={{ backgroundColor: colors.dark[200] }}
					endFillColor={colors.gray[100]}
				>
					{requests ? (
						requests.map((notif) => (
							<Notification
								senderNotificationToken={notif.senderNotificationToken}
								onDecline={() => onDeclineService(notif)}
								onAccept={() => onAcceptService(notif)}
								requestDate={notif.requestDate.toString()}
								serviceLabel={notif.serviceLabel}
								serviceType={notif.serviceType}
								senderName={notif.senderName}
								senderLocation={notif.senderLocation}
								additionalDetails={notif.additionalDetails}
							/>
						))
					) : (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								padding: 20,
								height: "100%",
							}}
						>
							<ActivityIndicator color={colors.dark[300]} />
							<Text
								style={{
									fontSize: 24,
									fontWeight: "bold",
									marginLeft: 10,
									color: colors.dark[300],
								}}
							>
								Chargement des notifications, veillez patientez!
							</Text>
						</View>
					)}
				</ScrollView>
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						paddingHorizontal: 40,
						paddingVertical: 10,
						backgroundColor: colors.dark[100],
					}}
				>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							marginLeft: 10,
							color: colors.dark[300],
						}}
					>
						Vous étes non verifiés , veilleiz patienter jusqu'a nos admin vous
						fait verifier
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Notifications;

const styles = StyleSheet.create({});
