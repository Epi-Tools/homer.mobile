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

export default class CompletedProjectsList extends React.Component {

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
    console.log(GLOBAL.SERVER_URL + GLOBAL.FINISHED_PROJECTS);
    fetch(GLOBAL.SERVER_URL + GLOBAL.FINISHED_PROJECTS, {
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

ProjectListRender(currentProject, i) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.openProject(currentProject.id, currentProject.status)}
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
                    <Text style={styles.projectText}>{currentProject.name}</Text>
                    <Text style={styles.projectText}>
                        {currentProject.currentSpices} / {currentProject.spices}
                    </Text>
                </View>
            </View>
            <ProgressBar percentage={(currentProject.status / 6) * 100} />
        </TouchableOpacity>
    );
}

render() {
    if (this.state.loading)
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.9 }}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>Projets terminés</Text>
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
                        <Text style={styles.title}>Projets terminés</Text>
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
                        <Text style={styles.title}>Projets terminés</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <Text style={styles.error}>
                            Vous n'avez aucuns projets terminés
                        </Text>
                    </View>
                </View>
            </View>
        );
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flex: 0.9 }}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>Projets terminés</Text>
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
    }
});