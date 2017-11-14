import React from 'react';
import {StyleSheet, Text, View, Button, Picker } from 'react-native';

export default class Project extends React.Component {
    project: any;

    constructor(props) {
        super(props);
        this.state = { bet: "5"};
        this.getProjects();
    }

    getProjects() {
        fetch('http://10.14.58.12:8080/login', {
            method: 'POST',
            form: {
                username:'',
                password:''
            }
        });
        console.log("une grosse bite comme d'hab");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Homer</Text>
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
         fetch('http://10.14.58.12:8080/api/projects')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                //return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/*<Text>{this.project.id}</Text>
                <Text>{this.project.email}</Text>

                <Text>{this.project.spices}</Text>*/

/*
               <Picker
                   selectedValue={this.state.bet}
                   onValueChange={(itemValue, itemIndex) => this.setState({bet: itemValue})}>
                   <Picker.Item label="Participant" value="5" />
                   <Picker.Item label="Contributeur actif" value="15" />
               </Picker>
               */