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
const { height, width } = Dimensions.get("window");
const cardHeight = height / 6;
const cardWidth = width / 2;

export default class CompletedProjectsList extends React.Component {

    render() {
        return (
            <View>
                <View>
                    <Text>Projets terminés</Text>
                    <View style={styles.separator} />
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <View style={styles.line}>
                                    <Text style={styles.title}>RightTime</Text>
                                    <Text style={styles.epices}>225/225</Text>
                                </View>
                            </View>
                            <ProgressBar percentage={70} />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <View style={styles.line}>
                                    <Text style={styles.title}>RightTime</Text>
                                    <Text style={styles.epices}>225/225</Text>
                                </View>
                            </View>
                            <ProgressBar percentage={70} />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <View style={styles.line}>
                                    <Text style={styles.title}>RightTime</Text>
                                    <Text style={styles.epices}>225/225</Text>
                                </View>
                            </View>
                            <ProgressBar percentage={70} />
                        </View>
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
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 25,
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
