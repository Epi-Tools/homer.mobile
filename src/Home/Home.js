/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FAB from "react-native-fab";

import ProjectList from "./ProjectList";
import Header from "./Header/Header";
import CreateProject from "../Project/CreateProject";
import Profil from "../Profil/Profil";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;

export default class Home extends React.Component {
  state = {
    profil: false,
    modal: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Header openProfil={() => this.setState({ profil: true })} />
        <ProjectList />
        <FAB
          buttonColor="red"
          iconTextColor="white"
          onClickAction={() => {
            this.setState({ modal: true });
          }}
          visible={true}
          iconTextComponent={<Ionicons name="ios-add" />}
        />
        <Modal
          visible={this.state.modal}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={() => this.setState({ modal: false })}
        >
          <CreateProject />
        </Modal>
        <Modal
          visible={this.state.profil}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={() => this.setState({ profil: false })}
        >
          <Profil />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
