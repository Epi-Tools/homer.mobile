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
  ScrollView
} from "react-native";

import MyProjectList from "./MyProjectList";
import CompletedProjectsList from "./CompletedProjectsList";
import SupportedProjectList from "./SupportedProjectList";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = width / 2;

const GLOBAL = require("../Global");

export default class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userHomer: "" };
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
    let currentUser = this.state.userHomer;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              borderBottomColor: "#D9D9D9",
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
              <Text style={styles.title}>
                {currentUser.email} guillaume.tran@epitech.eu
              </Text>
              <Text style={styles.title}>{currentUser.spices}123 épices</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <MyProjectList />
        </View>
        <View style={{ flex: 1 }}>
          <SupportedProjectList />
        </View>
        <View style={{ flex: 1 }}>
          <CompletedProjectsList />
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
  header: {
    flex: 0.6,
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
