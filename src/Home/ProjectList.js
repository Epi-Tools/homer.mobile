/**
 * Created by guillaumetran on 14/11/2017.
 */
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
const GLOBAL = require("../Global");

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    fetch(GLOBAL.SERVER_URL + "/api/projects", {
      method: "GET"
    })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then(responseJson => {
        this.setState({
          projects: responseJson,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  }

  ProjectListRender(currentProject, i) {
    return (
      <View key={i}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.showModal(i + 1)}
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
          <ProgressBar percentage={90} />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <Loader />
        </View>
      );
    if (this.state.error)
      return (
        <View style={[styles.container, { justifyContent: "center" }]}>
          <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.errorMessage}>
              Impossible de charger les projets
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                width: '80%',
                backgroundColor: "#60AAFF",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15
              }}
              onPress={() => {
                this.setState({loading: true})
                this.fetchProjects()
              }}
            >
              <Text>Réessayer</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this.state.projects.map((item, i) =>
            this.ProjectListRender(item, i)
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313030",
    flexDirection: "column",
    paddingLeft: "3%",
    paddingRight: "3%"
  },
  card: {
    height: cardHeight,
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    justifyContent: "space-between"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  line: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    color: "#585858",
    fontFamily: "sukhumvitset"
  },
  epices: {
    fontSize: 15,
    color: "#808080",
    fontFamily: "sukhumvitset"
  },
  separator: {
    height: 10
  },
  errorMessage: {
    fontSize: 20,
      flex: 1,
    color: "red",
    fontFamily: "sukhumvitset"
  }
});
