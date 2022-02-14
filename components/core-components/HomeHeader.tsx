import { View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, {  } from "react";
import { colors } from "../../styles/theme";
import { styles } from "../../styles/global";
import Searchbar from "./Searchbar";

const initialLocation = {
	coords: {
		latitude: 0,
		longitude: 0,
	},
};
const HomeHeader = () => {
	const navigation = useNavigation();
	//const {location,errorMsg} = useLocation(initialLocation);

	return (
		<View style={styles.homeHeader}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Ionicons
					color={colors.dark[100]}
					size={40}
					name="arrow-back-circle-sharp"
				/>
			</TouchableOpacity>
			<Searchbar />
		</View>
	);
};

export default HomeHeader;
