import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default class Spectators extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usersBet: [],
            projectId: props.Id
        };
    }

    componentWillMount(){
        this.fetchUsers();
    }

    UserListRender(user, i) {
        return (
            <View key={i}>
                    <View style={styles.header}>
                        <View style={styles.line}>
                            <Text style={styles.title}>{user.name}</Text>
                            <Text style={styles.epices}>{user.spices}</Text>
                        </View>
                    </View>
            </View>
        );
    }

    fetchUsers() {
        fetch(GLOBAL.SERVER_URL + "/api/bets/project/provided/" + this.state.projectId, {
            method: "GET"
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    usersBet: responseJson,
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ loading: false, error: true });
            });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                {this.state.usersBet.map((item, i) =>
                    this.UserListRender(item, i)
                )}
            </ScrollView>
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