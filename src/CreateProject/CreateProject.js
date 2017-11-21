import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';

// get user info http://10.14.58.12:8080/api/users
// get projects info http://10.14.58.12:8080/api/


export default class CreateProject extends React.Component {
    description: string;
    epices: string;
    title: string;
    follow1: string;
    followdesc1: string;
    follow2: string;
    followdesc2: string;
    delivery: string;
    deliverydesc: string;


    // texteditor : placeholder can make the text in the texteditor

    constructor(props) {
        super(props);
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
                               onChangeText={(text) => this.setState({text})}
                               value={this.title}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Spices</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.epices}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Description</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.description} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Date FollowUp 1</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.desc} />
                <View style={styles.separator} />
                <Text style={styles.title}>FollowUp 1</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.follow1} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Date FollowUp 2</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.followdesc1}/>
                <View style={styles.separator} />
                <Text style={styles.title}>FollowUp 2</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.follow2} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Date Delivery</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.followdesc2} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Text style={styles.title}>Delivery</Text>
                <TextInput style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.delivery} numberOfLines={4} multilines={true}/>
                <View style={styles.separator} />
                <Button onPress={this.onPressButton} title="Create" color="#000000"/>
                </View>
            </ScrollView>
        );
    }

    onPressButton() {

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