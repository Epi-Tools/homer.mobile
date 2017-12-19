/**
 * Created by Donavan Aziaka on 31/10/2017.
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import MyProjectList from "./MyProjectList";
import CompletedProjectsList from "./CompletedProjectsList";
import SupportedProjectList from "./SupportedProjectList";
import Project from "../Project/Project";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = width / 2;

const GLOBAL = require("../Global");

export default class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userHomer: "", modal: false, selectedProjectId: null };
  }
  componentWillMount() {
    fetch(GLOBAL.SERVER_URL + "/api/users/current", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          userHomer: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.selectedProjectId);
    let currentUser = this.state.userHomer;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1
            }}
          >
            <View
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={() => this.props.closeModal()}>
                <Ionicons name="ios-close-outline" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>{currentUser.email}</Text>
              <Text style={styles.title}>{currentUser.spices} épices</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <MyProjectList
            openProject={projectId =>
              this.setState({ selectedProjectId: projectId, modal: true })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SupportedProjectList />
        </View>
        <View style={{ flex: 1 }}>
          <CompletedProjectsList />
        </View>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.modal}
          onClosed={() => this.setState({ modal: false })}
          headerSize={0.16}
          backdropOpacity={0.7}
          header={
            <View style={{ flex: 0.16, backgroundColor: "transparent" }}>
              <ModalLine />
            </View>
          }
        >
          <Project
            Id={this.state.selectedProjectId}
            closeModal={() => this.setState({ modal: false })}
          />
        </CardModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313030"
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "row"
  },
  title: {
    fontSize: 18,
    color: "#E0E0E0",
    fontFamily: "sukhumvitset"
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    justifyContent: "space-between"
  }
});
