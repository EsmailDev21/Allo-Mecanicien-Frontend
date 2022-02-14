import { StyleSheet, View } from "react-native";
import React from "react";
import SettingsTopView from "./core-components/SettingsTopView";
import SettingsMidView from "./core-components/SettingsMidView";

export interface SettingsCompProps {
	name: string;
	email: string;
	picture: string;
}
const SettingsComp: React.FC<SettingsCompProps> = ({
	name,
	email,
	picture,
}) => {
	return (
		<View style={{ height: "100%" }}>
			<SettingsTopView name={name} email={email} picture={picture} />
			<SettingsMidView />
		</View>
	);
};

export default SettingsComp;

const styles = StyleSheet.create({});
