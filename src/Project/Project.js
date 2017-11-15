import React from 'react';
import {StyleSheet, Text, View, Button, Picker } from 'react-native';

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getProjects();
    }


    getProjects() {
        return fetch("http://10.14.58.12:8080/api/projects", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.map);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{}</Text>
                <Text>Github Account</Text>
                <Text>Description</Text>
                <Text>Some description !</Text>

                <Text>Some text follow-up 2</Text>

                <Text>Delivery</Text>
                <Text>Some text Delivery</Text>

                <Button onPress={() => this.onPressButton} title="Voir participants" color="#841584"/>

            </View>
        );
    }

    onPressButton() {

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
