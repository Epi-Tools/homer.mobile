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
  Navigator
} from "react-native";

export default class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  onLogin() {
    fetch("http://10.14.58.12:8080/login", {
      method: "POST",
      form: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(res => {
      console.log(res);
    });
    console.debug(this.state.username + this.state.password);
    //this.props.connectUser()
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
