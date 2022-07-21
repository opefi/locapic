/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Button, Input } from "@rneui/themed";
import { Overlay } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
// import { Ionicons } from '@expo/vector-icons';
function MapScreen(props) {
	const [currentLatitude, setlatitude] = useState(null);
	const [currentLongitude, setlongitude] = useState(null);
	const [addPOI, setAddPOI] = useState(false);
	const [listPOI, setListPOI] = useState([]);

	const [isVisible, setIsVisible] = useState(false);

	const [titrePOI, setTitrePOI] = useState();
	const [descPOI, setDescPOI] = useState();

	const [tempPOI, setTempPOI] = useState();

	useEffect(() => {
		async function askPermissions() {
			let { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === "granted") {
				Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
					// console.log(location);
					setlatitude(location.coords.latitude);
					setlongitude(location.coords.longitude);
				});
			}
		}
		askPermissions();
	}, []);

	var selectPOI = (e) => {
		if (addPOI) {
			setAddPOI(false);
			setIsVisible(true);
			setTempPOI({
				latitude: e.nativeEvent.coordinate.latitude,
				longitude: e.nativeEvent.coordinate.longitude,
			});
		}
	};

	var handleSubmit = () => {
		setListPOI([
			...listPOI,
			{
				longitude: tempPOI.longitude,
				latitude: tempPOI.latitude,
				titre: titrePOI,
				description: descPOI,
			},
		]);
		setIsVisible(false);
		setTempPOI();
		setDescPOI();
		setTitrePOI();
	};

	var markerPOI = listPOI.map((POI, i) => {
		return (
			<Marker
				key={i}
				pinColor="blue"
				coordinate={{ latitude: POI.latitude, longitude: POI.longitude }}
				title={POI.titre}
				description={POI.description}
			/>
		);
	});
	var isDisabled = false;
	if (addPOI) {
		isDisabled = true;
	}

	return (
		<View style={{ flex: 1 }}>
			<Overlay
				isVisible={isVisible}
				onBackdropPress={() => {
					setIsVisible(false);
				}}>
				<View>
					<Input
						containerStyle={{ marginBottom: 25 }}
						placeholder="titre"
						onChangeText={(val) => setTitrePOI(val)}
					/>

					<Input
						containerStyle={{ marginBottom: 25 }}
						placeholder="description"
						onChangeText={(val) => setDescPOI(val)}
					/>

					<Button
						title="Ajouter POI"
						buttonStyle={{ backgroundColor: "#eb4d4b" }}
						onPress={() => handleSubmit()}
						type="solid"
					/>
				</View>
			</Overlay>
			{currentLatitude&&currentLongitude && (
				<>
					<MapView
						onPress={(e) => {
							selectPOI(e);
						}}
						style={{ flex: 1 }}
						initialRegion={{
							latitude: currentLatitude,
							longitude: currentLongitude,
							latitudeDelta: 0.0922, // le rayon à afficher à partir du centre
							longitudeDelta: 0.0421,
						}}>
						<Marker
							id="Hello"
							title="Hello"
							description="i am here"
							coordinate={{
								latitude: currentLatitude,
								longitude: currentLongitude,
							}}
						/>
						{markerPOI}
					</MapView>
					<Button
						disabled={isDisabled}
						title="Add POI"
						icon={<Ionicons name="location" size={24} color="white" />}
						buttonStyle={{ backgroundColor: "#eb4d4b" }}
						type="solid"
						onPress={() => setAddPOI(true)}
					/>
				</>
			)}
		</View>
	);
}

export default MapScreen;
