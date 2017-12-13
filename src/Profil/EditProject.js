import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, Alert} from 'react-native';

const GLOBAL = require("../Global");


export default class EditProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 1,
            spices: 0,
            name: "",
            description: "",
            followUp: "",
            followUp1: "",
            delivery: "",
            dateFollowUp: "2017-10-10T14:00:00",
            dateFollowUp1: "2017-10-10T14:00:00",
            dateDelivery: "2017-10-10T14:00:00",
            projectId: props.Id
        };
    }

    getUserData() {
        fetch(GLOBAL.SERVER_URL + "/api/users/current", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    userId: responseJson.id
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getProjectData() {
        fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.projectId, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    spices: responseJson.spices,
                    name: responseJson.name,
                    description: responseJson.description,
                    followUp: responseJson.followUp,
                    followUp1: responseJson.followUp1,
                    delivery: responseJson.delivery,
                    dateFollowUp: responseJson.dateFollowUp,
                    dateFollowUp1: responseJson.dateFollowUp1,
                    dateDelivery: responseJson.dateDelivery,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount() {
        this.getUserData();
        this.getProjectData();
    }


    handleNumberInput(text) {
        if (/^\d+$/.test(text)) {
            this.setState({
                spices: text
            });
        }
    }

    onEditProject() {
        console.log(this.state.name);
        let project = {
            userId: this.state.userId,
            spices: this.state.spices,
            name: this.state.name,
            description: this.state.description,
            followUp: this.state.followUp,
            followUp1: this.state.followUp1,
            delivery: this.state.delivery,
            dateFollowUp: this.state.dateFollowUp,
            dateFollowUp1: this.state.dateFollowUp1,
            dateDelivery: this.state.dateDelivery,
        };
        console.log(JSON.stringify(project));
        fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.projectId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((responseData) => { console.log(responseData);
                Alert.alert(
                    "Project edited",
                    "The project has been successfully edited.",
                    [{ text: "OK", onPress: () => console.log("success") }],
                    { cancelable: false });
            })
            .catch((err) => {
                Alert.alert(
                    "Internet Connection Error",
                    "Please check your internet connection.",
                    [{ text: "OK", onPress: () => console.log(err)}],
                    { cancelable: true });
            console.log(err);
        });
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{this.state.name}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.delimiter} />
                <View style={styles.separator} />
                <Text style={styles.title}>Name</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={text => this.setState({name: text})}
                           placeholder={this.state.name}
                               value={this.title}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Spices</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               keyboardType='numeric'
                               onChangeText={(text) => this.handleNumberInput(text)}
                               placeholder={String(this.state.spices)}
                               value={this.epices}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Description</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({description: text})}
                               placeholder={this.state.description}
                               value={this.description} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />

                <Text style={styles.title}>FollowUp 1</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                           placeholder={this.state.followUp}
                           onChangeText={(text) => this.setState({followUp: text})}
                               value={this.follow1} numberOfLines={4} multilines={true}/>

                <View style={styles.separator} />
                <Text style={styles.title}>FollowUp 2</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                           placeholder={this.state.followUp1}
                           onChangeText={(text) => this.setState({followUp1: text})}
                               value={this.follow2} numberOfLines={4} multilines={true}/>

                <View style={styles.separator} />
                <Text style={styles.title}>Delivery</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                           placeholder={this.state.delivery}
                           onChangeText={(text) => this.setState({delivery: text})}
                               value={this.delivery} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Button onPress={() => this.onEditProject()} title="Edit" color="#000000"/>
                </View>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        color: "#585858",
        fontFamily: "sukhumvitset"
    },
    delimiter: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    separator: {
        height: 15
    },
});
