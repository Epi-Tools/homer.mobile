import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font } from "expo";
import Home from "./src/Home/Home";
import Loader from "./src/Shared/Loader";
import Profil from "./src/Profil/Profil"
import CreateProject from "./src/Project/CreateProject"
import Project from "./src/Project/Project"
import TabNavigation from "./src/TabNavigation/TabNavigation";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
        "sukhumvitset": require("./src/assets/SukhumvitSet-Medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <CreateProject />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
