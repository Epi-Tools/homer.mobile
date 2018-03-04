import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";

import ProgressBar from "../Shared/ProgressBar";
import Loader from "../Shared/Loader";
const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = width / 2;
const GLOBAL = require("../Global");

export default class SupportedProjectsList extends React.Component {

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
        console.log(GLOBAL.SERVER_URL + GLOBAL.SUPPORTED_PROJECTS);
        fetch(GLOBAL.SERVER_URL + GLOBAL.SUPPORTED_PROJECTS, {
            method: "GET"
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
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
        let status = this.getCurrentStatus(currentProject.projectStatus);
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => this.props.openProject(currentProject.projectId, currentProject.projectStatus)}
                activeOpacity={0.7}
                key={i}
            >
                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <View style={{ flex: 0.9, justifyContent: "center" }}>
                        <Text style={styles.projectText}>{currentProject.projectName}</Text>
                        <Text style={styles.projectText}>
                          Spices bet : {currentProject.spices}
                        </Text>
                    </View>

                </View>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.epices}>{status}</Text>
                </View>
                <ProgressBar percentage={(currentProject.projectStatus / 6) * 100} />
            </TouchableOpacity>
        );
    }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Projets soutenus</Text>
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
              <Text style={styles.title}>Projets soutenus</Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.error}>{this.state.error}</Text>
            </View>
          </View>
        </View>
      );
    if (this.state.projects.length < 0)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Projets soutenus</Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.error}>Vous ne soutenez aucuns projets</Text>
            </View>
          </View>
        </View>
      );
      return (
          <View style={{ flex: 1 }}>
              <View style={styles.container}>
                  <View style={{ flex: 0.9 }}>
                      <View style={styles.viewTitle}>
                          <Text style={styles.title}>Projets soutenus</Text>
                      </View>
                  </View>
              </View>
              <View
                  style={{
                      flex: 4,
                      justifyContent: "center"
                  }}
              >
                  <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                  >
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
        flex: 1,
        justifyContent: "center"
    },
    viewContent: {
        flex: 1,
        justifyContent: "center"
    },
    card: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: "#EFEFEF",
        borderRadius: 15,
        justifyContent: "space-between",
        marginLeft: 10
    },
    projectText: {
        fontSize: 16,
        color: "#545454",
        fontFamily: "sukhumvitset"
    },
    epices: {
        fontSize: 15,
        color: "#808080",
        fontFamily: "sukhumvitset"
    },
});