import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import Moment from "moment/moment";
import DateTimePicker from 'react-native-modal-datetime-picker';

const GLOBAL = require("../Global");


export default class EditProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: -1,
            spices: -1,
            name: "",
            description: "",
            followUp: "",
            followUp1: "",
            delivery: "",
            dateFollowUp: "",
            dateFollowUp1: "",
            dateDelivery: "",
            status : "",
            projectId: props.Id,
            type: -1,
            isDateTimePickerVisible: false
        };
    }

    setDateTimePicker(choose) {
        this.setState({type: choose})
        this.showDateTimePicker();
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        console.log("Number : " + this.state.type)
        console.log('A date has been picked: ', date);
        if (this.state.type === 0) {
            this.setState({ dateFollowUp: date });
        } else if (this.state.type === 1) {
            this.setState({ dateFollowUp1: date });
        } else if (this.state.type === 2) {
            this.setState({ dateDelivery: date });
        }
        this.setState({type: -1});
        this.hideDateTimePicker();
    };



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

    checkProjectDatas () {
        if (this.state.userId === -1 ||
            this.state.spices === -1 ||
            this.state.name === "" ||
            this.state.description === "" ||
            this.state.followUp === "" ||
            this.state.followUp1 === "" ||
            this.state.delivery === "" ||
            this.state.dateFollowUp === "" ||
            this.state.dateFollowUp1 === "" ||
            this.state.dateDelivery === "")
        {
            return false;
        };
        return true;
    }

    SendProjectsDatas(project) {
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
            if (this.checkProjectDatas())
                this.SendProjectsDatas(project);
            else
                this.messageAntiDelete("Error", "A field is still empty.");
        }
        else {
            this.messageAntiDelete("Project edition", "You can't edit this project.")
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
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={{ height: 40, borderColor: "white", borderWidth: 1, color: "white" }}
                        onChangeText={text => this.setState({ name: text })}
                        value={this.state.name}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.label}>Spices</Text>
                    <TextInput
                        style={{ height: 40, borderColor: "white", borderWidth: 1, color: "white" }}
                        keyboardType="numeric"
                        onChangeText={text => this.handleNumberInput(text)}
                        value={this.state.spices.toString()}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                        onChangeText={text => this.setState({ description: text })}
                        value={this.state.description}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />

                    <Text style={styles.label}>FollowUp 1</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                        onChangeText={text => this.setState({ followUp: text })}
                        value={this.state.followUp}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => this.setDateTimePicker(0)}
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
                            Date Follow Up 1
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{Moment(this.state.dateFollowUp).format("LL")}</Text>

                    <View style={styles.separator} />
                    <Text style={styles.label}>FollowUp 2</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                        onChangeText={text => this.setState({ followUp1: text })}
                        value={this.state.followUp1}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => this.setDateTimePicker(1)}
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
                            Date Follow Up 2
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{Moment(this.state.dateFollowUp1).format("LL")}</Text>
                    <View style={styles.separator} />

                    <Text style={styles.label}>Delivery</Text>
                    <TextInput
                        style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                        onChangeText={text => this.setState({ delivery: text })}
                        value={this.state.delivery}
                        numberOfLines={4}
                        multilines={true}
                    />
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => this.setDateTimePicker(2)}
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
                            Date Delivery
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{Moment(this.state.dateDelivery).format("LL")}</Text>
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
