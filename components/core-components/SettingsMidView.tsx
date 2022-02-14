import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/theme";

const SettingsMidView = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.settings}>Settings</Text>
			<View style={styles.flatListWrapper}>
				<FlatList
					style={{
						borderTopEndRadius: 10,
					}}
					data={[
						{ label: "Compte", icon: "md-person-outline", id: 0 },
						{ label: "Notifications", icon: "md-notifications-outline", id: 1 },
						{ label: "Apparence", icon: "md-eye-outline", id: 2 },
						{ label: "Securité", icon: "lock-closed-outline", id: 3 },
						{ label: "Aide et Support", icon: "md-help-sharp", id: 4 },
					]}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => (
						<SettingsListItem icon={item.icon} label={item.label} />
					)}
				/>
			</View>
		</View>
	);
};

export default SettingsMidView;

const styles = StyleSheet.create({
	container: {
		marginTop: -20,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	settings: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.gray[300],
		marginVertical: 10,
	},
	flatListWrapper: {
		borderTopEndRadius: 10,
	},
});

interface SettingsListItemProps {
	id?: number;
	icon: string;
	color?: string;
	label: string;
}
const SettingsListItem: React.FC<SettingsListItemProps> = ({
	icon,
	color,
	label,
	id,
}) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: "white",
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-between",
				marginHorizontal: 20,
				minWidth: Dimensions.get("window").width - 50,
				borderBottomColor: colors.gray[200],
				borderBottomWidth: 1,
				paddingHorizontal: 20,
				paddingVertical: 30,
				borderRadius: 10,
				marginBottom: 5,
				alignItems: "center",
			}}
		>
			<View
				style={{
					flex: 1,
					maxWidth: "70%",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Ionicons name={icon} size={24} color={colors.dark[400]} />
				<Text
					style={{
						fontSize: 18,
						fontWeight: "500",
						color: colors.gray[700],
						marginLeft: 15,
					}}
				>
					{label}
				</Text>
			</View>
			<Ionicons
				name="md-arrow-forward-sharp"
				size={24}
				color={colors.dark[600]}
			/>
		</TouchableOpacity>
	);
};
