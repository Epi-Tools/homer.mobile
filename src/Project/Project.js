import React from 'react';
import {StyleSheet, Text, View, Image, Button, Picker} from 'react-native';

export default class Project extends React.Component {
    onPressLearnMore: any;

    constructor(props) {
        super(props);
        this.state = { bet: "5"};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Homer</Text>
                <Text>Github Account</Text>
                <Text>Description</Text>
                <Text>Some description !</Text>

                <Text>Follow-up 1</Text>
                <Text>Some text follow-up 1</Text>

                <Text>Follow-up 2</Text>
                <Text>Some text follow-up 2</Text>

                <Text>Delivery</Text>
                <Text>Some text Delivery</Text>

                <Picker
                    selectedValue={this.state.bet}
                    onValueChange={(itemValue, itemIndex) => this.setState({bet: itemValue})}>
                    <Picker.Item label="Participant" value="5" />
                    <Picker.Item label="Contributeur actif" value="15" />
                </Picker>

                <Button onPress={this.onPressLearnMore} title="Voir participants" color="#841584"/>

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