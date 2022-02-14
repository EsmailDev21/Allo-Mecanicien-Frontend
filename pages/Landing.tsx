import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from "../styles/landing";
import { colors } from "../styles/theme";
const { dark, gray, teal } = colors;
const Landing = ({ navigation }: any) => {
	return (
		<SafeAreaView style={{ height: "100%" }}>
			<View style={styles.landingContainer}>
				<View style={styles.landingWrapper}>
					<View style={styles.logo}>
						<Text style={styles.logoText}>Allo</Text>
					</View>

					<Text style={styles.logoText2}> Mecanicien</Text>
				</View>
				<Text style={styles.landingTitle}>Ne reste jamis en panne!</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate("Login")}
					style={styles.landingMainBtn}
				>
					<Text style={styles.landingMainBtnText}>Log In</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("Signup")}
					style={styles.landingLightBtn}
				>
					<Text style={styles.landingLightBtnText}>Créer un compte</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Landing;
