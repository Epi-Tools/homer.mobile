import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";

import ProgressBar from "../Shared/ProgressBar";
import Loader from "../Shared/Loader";
const { height, width } = Dimensions.get("window");
const cardHeight = height / 6;
const cardWidth = width / 2;
const GLOBAL = require("../Global");

export default class MyProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      projects: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    fetch(GLOBAL.SERVER_URL + "/api/projects/my", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          projects: responseJson,
          loading: false,
          error: ""
        });
      })
      .catch(error => {
        this.setState({
          error: "Impossible de charger les projets",
          loading: false
        });
      });
  }

  ProjectListRender(currentProject, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.showModal(currentProject.id)}
          activeOpacity={0.7}
        >
          <View style={styles.header}>
            <View style={styles.line}>
              <Text style={styles.title}>{currentProject.name}</Text>
              <Text style={styles.epices}>
                {currentProject.currentSpices} / {currentProject.spices}
              </Text>
            </View>
          </View>
          <ProgressBar percentage={70} />
          <View style={{ width: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Mes projets</Text>
            </View>
            <Loader />
          </View>
        </View>
      );
    if (this.state.error)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Mes projets</Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.error}>{this.state.error}</Text>
            </View>
          </View>
        </View>
      );
    if (this.state.projects.length <= 0)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Mes projets</Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.error}>Vous n''avez aucuns projets</Text>
            </View>
          </View>
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Mes Projets</Text>
          <View style={styles.separator} />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {this.state.projects.map((item, i) =>
              this.ProjectListRender(item, i)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    color: "#E0E0E0",
    fontFamily: "sukhumvitset"
  },
  error: {
    fontSize: 14,
    color: "#E0E0E0",
    fontFamily: "sukhumvitset"
  },
  viewTitle: {
    flex: 0.3,
    justifyContent: "center"
  },
  viewContent: {
    flex: 0.5,
    justifyContent: "center"
  },
  image: {
    paddingTop: 30
  },
  separator: {
    height: 15
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    justifyContent: "space-between"
  }
});
