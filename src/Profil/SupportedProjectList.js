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

export default class SupportedProjectsList extends React.Component {
  state = {
    loading: false,
    error: false,
    projects: []
  };

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
        <View style={{ flex: 4, justifyContent: "center" }}>
          <ScrollView
            contentContainerStyle={{ flex: 1, alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View style={{ width: 10 }} />
            <View style={styles.card}>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <View style={{ flex: 0.9, justifyContent: "center" }}>
                  <Text style={styles.projectText}>RightTime</Text>
                  <Text style={styles.projectText}>225/225</Text>
                </View>
              </View>
              <ProgressBar percentage={70} />
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.card}>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <View style={{ flex: 0.9, justifyContent: "center" }}>
                  <Text style={styles.projectText}>RightTime</Text>
                  <Text style={styles.projectText}>225/225</Text>
                </View>
              </View>
              <ProgressBar percentage={70} />
            </View>
            <View style={{ width: 10 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
  /*
    ProjectListRender(currentProject, i) {
        return (
            <View key={i}>
                <View style={styles.separator} />
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
                    <ProgressBar percentage={90} />
                </TouchableOpacity>
                <View style={styles.separator} />
            </View>
        );
    }
    */
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
    justifyContent: "space-between"
  },
  projectText: {
    fontSize: 16,
    color: "#545454",
    fontFamily: "sukhumvitset"
  }
});
