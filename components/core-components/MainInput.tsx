import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { searchStyle } from "../../styles/search";
import { styles } from "../../styles/global";

type mainInputProps = {
	textColor: string;
	marginVertical: number | string;
	type: any;
	placeHolder: string;
	secure: boolean;
	numberOfLines?: number;
	value?:string,
	onChange?:(e:string)=>void
};
const MainInput = ({
	textColor,
	marginVertical,
	type,
	placeHolder,
	secure = false,
	numberOfLines,
	value,
	onChange
}: mainInputProps) => {
	const [focus, setFocus] = useState(false);
	return (
		<View
			style={
				!focus
					? styles.inputField
					: [styles.inputFieldFocus, { marginTop: marginVertical }]
			}
		>
			<TextInput
				value={value}
				style={[searchStyle.basicInput, { color: textColor }]}
				onEndEditing={() => setFocus(false)}
				onFocus={() => setFocus(true)}
				textContentType={type}
				placeholder={placeHolder}
				secureTextEntry={secure}
				numberOfLines={numberOfLines}
				onChangeText={onChange}
			/>
		</View>
	);
};

export default MainInput;
