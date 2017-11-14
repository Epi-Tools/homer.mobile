import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';

// get user info http://10.14.58.12:8080/api/users
// get projects info http://10.14.58.12:8080/api/


export default class CreateProject extends React.Component {
    onPressLearnMore: any;
    github: string;
    epices: string;
    title: string;
    follow1: string;
    followdesc1: string;
    follow2: string;
    followdesc2: string;
    delivery: string;
    deliverydesc: string;


    constructor(props) {
        super(props);
    }

    
    
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.title}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.epices}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.github}/>
                    <Text>Description</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.desc} numberOfLines={4} multilines={true}/>

                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.follow1}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.followdesc1} numberOfLines={4} multilines={true}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.follow2}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.followdesc2} numberOfLines={4} multilines={true}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.delivery}/>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={(text) => this.setState({text})}
                               value={this.deliverydesc} numberOfLines={4} multilines={true}/>
                    <Button onPress={this.onPressLearnMore} title="Valider" color="#000000"/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});