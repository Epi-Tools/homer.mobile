import React from 'react';
import {StyleSheet, Text, View, Button, Picker } from 'react-native';

const GLOBAL = require('../Global');

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idProject: props.Id,
            projectInfo: []
        };
    }

    componentWillMount() {
        console.log(this.state.idProject);
        fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.idProject, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    projectInfo: responseJson
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let project = this.state.projectInfo;
        return (
            <View style={styles.container}>
                <Text>{project.name}</Text>
                <Text>{project.description}</Text>
                <Text>{project.dateFollowUp}</Text>
                <Text>{project.followUp}</Text>
                <Text>{project.dateFollowUp1}</Text>
                <Text>{project.followUp1}</Text>
                <Text>{project.dateDelivery}</Text>
                <Text>{project.delivery}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
