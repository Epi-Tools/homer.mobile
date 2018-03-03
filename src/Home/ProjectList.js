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
    ScrollView, RefreshControl
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
      projects: [],
        refreshing: false
    };
  }

    _onRefresh() {
      this.setState({refreshing: true});
        this.fetchProjects();
        this.setState({refreshing: false});
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    fetch(GLOBAL.SERVER_URL + GLOBAL.PROJECTS, {
      method: "GET"
    })
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                projects: responseJson.reverse(),
                loading: false,
                error: false
            });
        })
        .catch(error => {
            console.error(error);
            this.setState({ loading: false, error: true });
        });
  }

  getCurrentStatus(status) {
      if (status === 0)
          return ("En création");
      else if (status === 1)
          return ("Lancé");
      else if (status === 2)
          return ("Validé");
      else if (status === 3)
          return ("Follow-up 1");
      else if (status === 4)
          return ("Follow-up 2");
      else if (status === 5)
          return ("Delivery");
      else
          return ("Terminé");
  }

  ProjectListRender(currentProject, i) {
      let status = this.getCurrentStatus(currentProject.status);
    return (
      <View key={i}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.showModal(currentProject.id, currentProject.status)}
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
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.epices}>{status}</Text>
            </View>
            <ProgressBar percentage={(currentProject.status / 6) * 100} />
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
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>
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
