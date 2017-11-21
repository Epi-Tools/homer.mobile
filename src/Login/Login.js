/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import Loader from "../Shared/Loader";

const GLOBAL = require("../Global");

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  onLogin() {
    this.setState({ loading: true });
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
      .then(response => {
        this.setState({ loading: false });
        console.log(response.status);
        if (response.status === 200) {
          this.props.connectUser();
        } else {
          Alert.alert(
            "Authentication Error",
            "Invalid username and password.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bloc}>
          <Text style={styles.title}>Homer</Text>
          <Image
            source={require("../assets/logoEpitech.png")}
            style={{ flex: 0.4 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 0.6,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.7,
                flexDirection: "column"
              }}
            >
              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ username: text })}
                  value={this.username}
                  placeholder="Adresse email"
                  placeholderTextColor="#E3E3E3"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.password}
                  placeholder="Mot de passe"
                  placeholderTextColor="#E3E3E3"
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity
                onPress={() => this.onLogin()}
                style={{
                  flex: 1,
                  backgroundColor: "#60AAFF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                {this.state.loading ? (
                  <Loader />
                ) : (
                  <Text
                    style={{
                      color: "#E3E3E3",
                      fontSize: 20,
                      fontFamily: "sukhumvitset"
                    }}
                  >
                    Se connecter
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>2017 - Epitech Strasbourg</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313030"
  },
  bloc: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10%"
  },
  title: {
    color: "#E3E3E3",
    fontSize: 55,
    fontFamily: "sukhumvitset"
  },
  inputView: {
    flex: 1,
    justifyContent: "center"
  },
  textInput: {
    flex: 0.5,
    textAlign: "center",
    color: "#E3E3E3",
    borderBottomColor: "#E3E3E3",
    borderBottomWidth: 1
  },
  textFooter: {
    color: "#D5D5D5",
    fontSize: 20,
    fontFamily: "sukhumvitset"
  }
});
