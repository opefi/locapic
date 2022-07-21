/** @format */

import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ChatScreen from "./screens/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import pseudo from "./reducers/pseudo";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ pseudo }));
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => {
					let iconName;

					if (route.name == "Map") {
						iconName = "ios-navigate";
					} else if (route.name == "Chat") {
						iconName = "ios-chatbubbles";
					}

					return <Ionicons name={iconName} size={25} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: "#eb4d4b",
				inactiveTintColor: "#FFFFFF",
				style: {
					backgroundColor: "#130f40",
				},
			}}>
			<Tab.Screen name="Map" component={MapScreen} />
			<Tab.Screen name="Chat" component={ChatScreen} />
		</Tab.Navigator>
	);
}

function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="HomeScreen" component={HomeScreen} />

					<Stack.Screen name="BottomNavigator" component={BottomNavigator} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
export default App;
