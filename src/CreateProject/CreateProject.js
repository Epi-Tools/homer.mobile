import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';

const GLOBAL = require("../Global");


export default class CreateProject extends React.Component {

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
            dateDelivery: "2017-10-10T14:00:00"
        };
    }

    componentWillMount() {
        fetch(GLOBAL.SERVER_URL + "/api/users/current", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.id);
                this.setState({
                    userId: responseJson.id
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    handleNumberInput(text) {
        if (/^\d+$/.test(text)) {
            this.setState({
                spices: text
            });
        }
    }

    onCreateProject() {
        console.log(this.state.name);
        let project = {
            userId: this.state.userId,
            spices: this.state.spices,
            name: this.state.name,
            description: this.state.description,
            followUp: this.state.followUp,
            followUp1: this.state.followUp1,
            delivery: this.state.delivery,
            dateFollowUp: "2017-10-10T14:00:00",
            dateFollowUp1: "2017-10-10T14:00:00",
            dateDelivery: "2017-10-10T14:00:00",
        };
        console.log(JSON.stringify(project));
        fetch(GLOBAL.SERVER_URL + "/api/projects", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((responseData) => { console.log(responseData); })
            .catch((err) => { console.log(err); });
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>New Project</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.delimiter} />
                <View style={styles.separator} />
                <Text style={styles.title}>Name</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={text => this.setState({name: text})}
                               value={this.title}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Spices</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               keyboardType='numeric'
                               onChangeText={(text) => this.handleNumberInput(text)}
                               value={this.epices}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Description</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({description: text})}
                               value={this.description} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />

                <Text style={styles.title}>FollowUp 1</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({followUp: text})}
                               value={this.follow1} numberOfLines={4} multilines={true}/>

                <View style={styles.separator} />
                <Text style={styles.title}>FollowUp 2</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({followUp1: text})}
                               value={this.follow2} numberOfLines={4} multilines={true}/>

                <View style={styles.separator} />
                <Text style={styles.title}>Delivery</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({delivery: text})}
                               value={this.delivery} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Button onPress={() => this.onCreateProject()} title="Create" color="#000000"/>
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

/*
    <Text style={styles.title}>Date FollowUp 1</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({dateFollowUp: text})}
                               value={this.desc} />
                <View style={styles.separator} />

                      <View style={styles.separator} />
                <Text style={styles.title}>Date FollowUp 2</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({dateFollowUp1: text})}
                               value={this.followdesc1}/>

                                        <View style={styles.separator} />
                <Text style={styles.title}>Date Delivery</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({dateDelivery: text})}
                               value={this.followdesc2} numberOfLines={4} multilines={true}/>
 */