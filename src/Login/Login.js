/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Navigator, Alert
} from "react-native";

const GLOBAL = require('../Global');

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };




    onLogin() {
    let details = {
      username: this.state.username,
      password: this.state.password
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody);
    fetch(GLOBAL.SERVER_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    })
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                this.props.connectUser();
            } else {
                Alert.alert( 'Authentication Error', 'Invalid username and password.',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: true });
            }
        })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ username: text })}
          value={this.username}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.password}
        />

        <Button
          onPress={() => this.onLogin()}
          title="Valider"
          color="#000000"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
