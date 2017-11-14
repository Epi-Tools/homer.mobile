import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font } from "expo";
import Home from "./src/Home/Home";
import Loader from "./src/Shared/Loader";
import Login from "./src/Login/Login";

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    isLogged: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      sukhumvitset: require("./src/assets/SukhumvitSet-Medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Loader />;
    }
    if (!this.state.isLogged) {
      return (
        <View style={styles.container}>
          <Login connectUser={() => this.setState({ isLogged: true })} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Home />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
