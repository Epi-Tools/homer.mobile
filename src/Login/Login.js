/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, fetch, Navigator} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Project from "../Project/Project";

export default class Login extends React.Component {
    username: string;
    password: string;

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(text) => this.setState({text})}
                           value={this.username}/>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(text) => this.setState({text})}
                           value={this.password}/>

                <Button onPress={() => this._navigate()} title="Valider" color="#000000"/>

            </View>
        );
    }

    _navigate() {
        this.props.navigator.push({
            name: 'Project',
            passProps: {
                name: property
            }
        })
    }
    onPressButton() {

        /*
        fetch('http://10.14.58.12:8080/login', {
            method: 'POST',
            form: {
                username: this.username,
                password: this.password
            }
        })*/
        console.debug(this.username + this.password);
        //navigate('Project', {test: 'ok'});
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
