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
const { height, width } = Dimensions.get("window");
const cardHeight = height / 6;
const cardWidth = width / 2;
const GLOBAL = require("../Global");


export default class MyProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
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
                    error: false
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ loading: false, error: true });
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
                            <Text style={styles.epices}>{currentProject.currentSpices} / {currentProject.spices}</Text>
                        </View>
                    </View>
                    <ProgressBar percentage={70} />
                    <View style={{ width: 10 }} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Mes Projets</Text>
                    <View style={styles.separator} />
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
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
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20,
        color: "#585858",
        fontFamily: "sukhumvitset"
    },
    image: {
        paddingTop: 30
    },
    delimiter: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
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
