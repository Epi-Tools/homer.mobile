import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, TouchableOpacity} from 'react-native';

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
            status : "",
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

    checkInternetConnection() {
        Alert.alert(
            "Internet Connection Error",
            "Please check your internet connection.",
            [{ text: "OK", onPress: () => console.log("")}],
            { cancelable: true });
    }

    deleteMessage() {
        Alert.alert(
            "Delete Project",
            "Do you really want to delete the project : " + this.state.name,
            [{ text: "OK", onPress: () => this.deleteCurrentProject()},
                { text: "Cancel", onPress: () => console.log("cancel")}],
            { cancelable: true });
    }

    deleteCurrentProject() {
        if (this.state.status === 0) {
            fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.projectId, {
                method: "DELETE",
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200)
                        Alert.alert(
                            "Project deleted",
                            "The project has been successfully deleted.",
                            [{text: "OK", onPress: () => console.log("success")}],
                            {cancelable: false});
                })
                .catch((error) => {
                    console.error(error);
                    this.checkInternetConnection()
                });
        }
        else {
            this.messageAntiDelete("Project deleted", "You can't delete this project.")
        }
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
                    status: responseJson.status
                });
            })
            .catch((error) => {
                console.error(error);
                this.checkInternetConnection()
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

    messageAntiDelete(title, message) {
        Alert.alert(
            title,
            message,
            [{text: "OK", onPress: () => console.log("success")}],
            {cancelable: false});
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
        if (this.state.status === 0) {
            fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.projectId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    Alert.alert(
                        "Project edited",
                        "The project has been successfully edited.",
                        [{text: "OK", onPress: () => console.log("success")}],
                        {cancelable: false});
                })
                .catch((err) => {
                    this.checkInternetConnection()
                    console.log(err);
                });
        }
        else
        {
            this.messageAntiDelete("Project edited", "You can't edit this project.")
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text style={styles.title}>Editer un projet</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={{ height: 40, borderColor: "white", borderWidth: 1 }}
                        placeholder={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                        value={this.title}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.label}>Spices</Text>
                    <TextInput
                        style={{ height: 40, borderColor: "white", borderWidth: 1 }}
                        keyboardType="numeric"
                        placeholder={this.state.spices.toString()}
                        onChangeText={text => this.handleNumberInput(text)}
                        value={this.epices}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1 }}
                        onChangeText={text => this.setState({ description: text })}
                        placeholder={this.state.description}
                        value={this.description}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />

                    <Text style={styles.label}>FollowUp 1</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1 }}
                        onChangeText={text => this.setState({ followUp: text })}
                        value={this.follow1}
                        placeholder={this.state.followUp}
                        numberOfLines={4}
                        multilines={true}
                    />

                    <View style={styles.separator} />
                    <Text style={styles.label}>FollowUp 2</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1 }}
                        onChangeText={text => this.setState({ followUp1: text })}
                        value={this.follow2}
                        placeholder={this.state.followUp1}
                        numberOfLines={4}
                        multilines={true}
                    />

                    <View style={styles.separator} />
                    <Text style={styles.label}>Delivery</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1 }}
                        onChangeText={text => this.setState({ delivery: text })}
                        value={this.delivery}
                        placeholder={this.state.delivery}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => this.onEditProject()}
                        style={{
                            flex: 1,
                            height: 60,
                            backgroundColor: "#60AAFF",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15
                        }}
                    >
                        <Text
                            style={{
                                color: "#E3E3E3",
                                fontSize: 20,
                                fontFamily: "sukhumvitset"
                            }}
                        >
                            Valider
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => this.deleteMessage()}
                        style={{
                            flex: 1,
                            height: 60,
                            backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15
                        }}
                    >
                        <Text
                            style={{
                                color: "#E3E3E3",
                                fontSize: 20,
                                fontFamily: "sukhumvitset"
                            }}
                        >
                            Supprimer
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    title: {
        color: "#E3E3E3",
        fontSize: 40,
        fontFamily: "sukhumvitset"
    },
    label: {
        fontSize: 25,
        color: "#E3E3E3",
        fontFamily: "sukhumvitset"
    },
    delimiter: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    separator: {
        height: 15
    }
});
