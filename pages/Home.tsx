import React from "react";
import { TouchableOpacity } from "react-native";
import HomeComp from "../components/HomeComp";
import Settings from "./Settings";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../styles/theme";
import HomeHeader from "../components/core-components/HomeHeader";
import ProfileComp from "../components/ProfileComp";
import Services from "./Services";
import { FontAwesome5 } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Icon = ({ name, size, color }: any) => {
	if (name === "hands-helping")
		return <FontAwesome5 name={name} size={size} color={color} />;
	else return <Ionicons name={name} size={size} color={color} />;
};
const Home = ({ navigation }: any) => {
	let iconName: string;

	return (
		<SafeAreaView style={{ height: "100%" }}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						if (route.name === "Main") {
							iconName = "home-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "md-settings-sharp" : "md-settings-outline";
						} else if (route.name === "Profile") {
							iconName = focused ? "md-person" : "md-person-outline";
						} else if (route.name === "Services") {
							iconName = "hands-helping";
						}
						return <Icon name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: colors.dark[200],
					tabBarInactiveTintColor: "gray",
					tabBarActiveBackgroundColor: colors.gray[100],
				})}
				initialRouteName="Home"
			>
				<Tab.Screen
					options={{
						headerShown: true,
						headerTransparent: true,
						headerTitle: () => <HomeHeader />,
					}}
					name="Main"
					component={HomeComp}
				/>
				<Tab.Screen
					options={{
						headerShown: true,
						headerTransparent: true,
						headerTitle: () => (
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Ionicons
									color={colors.dark[300]}
									size={40}
									name="arrow-back-circle-sharp"
								/>
							</TouchableOpacity>
						),
					}}
					name="Profile"
					component={ProfileComp}
				/>
				<Tab.Screen
					options={{
						headerShown: true,
						headerTransparent: true,
						headerTitle: () => (
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Ionicons
									color={colors.gray[100]}
									size={40}
									name="arrow-back-circle-sharp"
								/>
							</TouchableOpacity>
						),
					}}
					name="Settings"
					component={Settings}
				/>
				<Tab.Screen
					options={{
						headerShown: true,
						headerTransparent: true,
						headerTitle: () => (
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Ionicons
									color={colors.dark[300]}
									size={24}
									name="arrow-back-circle-sharp"
								/>
							</TouchableOpacity>
						),
					}}
					name="Services"
					component={Services}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};

export default Home;
