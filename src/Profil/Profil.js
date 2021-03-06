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
import EditProject from "./EditProject";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = width / 2;

const GLOBAL = require("../Global");

export default class Profil extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userHomer: "", modal: false, detailModal: false, selectedProjectId: null, user: "", status: 0 };
  }

  componentWillMount() {
    fetch(GLOBAL.SERVER_URL + GLOBAL.USER, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          userHomer: responseJson,
            user: responseJson.email
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
              <Text style={styles.title}>{this.state.user.split('@').shift().split('.').join(" ")}</Text>
              <Text style={styles.title}>{currentUser.spices} épices</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <MyProjectList openEdit={(projectId, status) => this.setState({ selectedProjectId: projectId, modal: true })}
                         openProject={(projectId, status) => this.setState({ selectedProjectId: projectId, status: status, detailModal: true })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SupportedProjectList openProject={(projectId, status) =>
              this.setState({ selectedProjectId: projectId, status: status, detailModal: true })}/>
        </View>
        <View style={{ flex: 1 }}>
          <CompletedProjectsList openProject={(projectId, status) =>
              this.setState({ selectedProjectId: projectId, status: status, detailModal: true })} />
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
          <EditProject
            Id={this.state.selectedProjectId}
            closeModal={() => this.setState({ modal: false })}
          />
        </CardModal>
          <CardModal
              swipeArea={height / 3}
              swipeThreshold={50}
              isOpen={this.state.detailModal}
              onClosed={() => this.setState({ detailModal: false })}
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
                  status={this.state.status}
                  closeModal={() => this.setState({ detailModal: false })}
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
