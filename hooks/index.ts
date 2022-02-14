import { useEffect, useRef, useState } from "react";

import * as Location from "expo-location";
import { StyleProp, StyleSheet, StyleSheetProperties } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData } from "../redux/slices/userSlice";

//useLocation hook
//
export interface UseLocationProps {
	initialLocation: {
		coords: {
			longitude: number;
			latitude: number;
			altitude?: number;
			accuracy?: number;
			altitudeAccuracy?: number;
			heading?: number;
			speed?: number;
		};
		timestamp?: number;
	};
}

export function useLocation<UseLocationProps>(
	initialLocation: UseLocationProps
) {
	const [location, setLocation] = useState(initialLocation);
	const [address, setAddress] = useState("Loading address ...");
	const dispatch = useDispatch();
	const userData = useSelector(selectUserData)

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return;
			}
			const location: Location.LocationObject = await Location.getCurrentPositionAsync(
				{}
			);
			location ? setLocation(location) : console.log("failed to load location");
			const params = {
				access_key: "pk.e761e8a5ca2fb090c0b5265f423d11b2",
			};
			axios
				.get(
					`https://eu1.locationiq.com/v1/reverse.php?key=${params.access_key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`
				)
				.then((response) => {
					setAddress(response.data.display_name);
					dispatch(setUserData({...userData,currentAddress:address}))
					
				})
				.catch((error) => {
					console.log(error);
				});
		})();
	}, [address]);
	return { location, address };
}

//
//useFocus hook (for styling inputs onFocus)
//

//
//useImage hook
//
