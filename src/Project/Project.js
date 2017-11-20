import React from 'react';
import {StyleSheet, Text, View, Button, Picker } from 'react-native';

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state.project = this.getProjects();
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
