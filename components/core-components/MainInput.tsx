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
	value?:string
};
const MainInput = ({
	textColor,
	marginVertical,
	type,
	placeHolder,
	secure = false,
	numberOfLines,
	value
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
			/>
		</View>
	);
};

export default MainInput;
