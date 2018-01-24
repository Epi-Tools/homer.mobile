/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";
import LottieView from "../shared/LottieView";
import TouchableCard from "../shared/TouchableCard";
import Header from "./Header";
import Footer from "./Footer";

const { height } = Dimensions.get("window");

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false,
    loading: false
  };

  onLogin() {
    this.setState({ loading: true });
    this.props.connectUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/background.jpeg")}
          resizeMode="cover"
        >
          <LinearGradient
            style={{
              flex: 1
            }}
            start={{ x: 0.0, y: 0 }}
            end={{ x: 0, y: 1.0 }}
            colors={["rgba(67, 137, 162, 0.5)", "rgba(92, 37, 141, 0.7)"]}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}>
              <Header />
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{
                      flex: 0.6,
                      justifyContent: "space-around"
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
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                      <View style={{ flex: 0.7, justifyContent: "center" }}>
                        <TouchableCard
                          animation={true}
                          onPress={() => this.onLogin()}
                          color="#60AAFF"
                          borderRadius={30}
                          style={{
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {this.state.loading ? (
                            <LottieView
                              size={height / 12}
                              source={
                                this.state.error
                                  ? require("../../assets/lottie/warning.json")
                                  : require("../../assets/lottie/loader.json")
                              }
                            />
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
                        </TouchableCard>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Footer />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    flex: 1,
    justifyContent: "center"
  },
  textInput: {
    flex: 0.7,
    textAlign: "center",
    color: "#E3E3E3",
    borderRadius: 30,
    backgroundColor: "rgba(96, 96, 96,.5)",
    fontFamily: "sukhumvitset"
  }
});
