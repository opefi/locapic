/** @format */

import { StatusBar } from "expo-status-bar";
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import {Button, Input} from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';

function HomeScreen(props) {
	const [pseudo, setPseudo] = useState('');
	return (
		<ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

        <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='John'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />

        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Go to Map"
            type="solid"
            onPress={() => {props.onSubmitPseudo(pseudo); props.navigation.navigate('BottomNavigator', { screen: 'Map' })}}
        />

    </ImageBackground>
  );
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(HomeScreen);
