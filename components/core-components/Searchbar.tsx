import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchStyle } from "../../styles/search";
const Searchbar = () => {
	const [focus, setFocus] = React.useState(false);
	return (
		<View
			style={!focus ? searchStyle.searchField : searchStyle.searchFieldFocus}
		>
			<TextInput
				style={searchStyle.basicInput}
				onEndEditing={() => setFocus(false)}
				onFocus={() => setFocus(true)}
				textContentType="password"
				placeholder="Chercher quelques chose"
			/>
			<TouchableOpacity style={searchStyle.searchButton}>
				<Ionicons size={18} name="search-sharp" color={colors.dark[400]} />
			</TouchableOpacity>
		</View>
	);
};

export default Searchbar;
