/** @format */
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
// import { Button } from '@rneui/base';
import { Button, ListItem, Input } from "@rneui/themed";
// import { ListItem, Input,Button} from '@rneui/base'
import Icon from "react-native-vector-icons/FontAwesome";
import socketIOClient from "socket.io-client";

var socket = socketIOClient("https://stormy-ravine-68412.herokuapp.com/");

function ChatScreen(props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		socket.on("sendMessageFromBack", (newMessage) => {
			console.log(newMessage);
			setMessage(newMessage);
		});
	}, [message]);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, marginTop: 50 }}>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>Parfait et toi ?</ListItem.Title>
						<ListItem.Subtitle>Alex</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>Coucou ça roule ?</ListItem.Title>
						<ListItem.Subtitle>John</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<Input
					containerStyle={{ marginBottom: 5 }}
					placeholder="Your message"
				/>
				<Button
					icon={<Icon name="envelope-o" size={20} color="#ffffff" />}
					title="Send Message"
					onPress={() => socket.emit("sendMessage", "Hello John !")}
					buttonStyle={{ backgroundColor: "#eb4d4b" }}
					type="solid"
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ChatScreen;
