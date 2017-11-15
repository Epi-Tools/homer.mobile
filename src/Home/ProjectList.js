/**
 * Created by guillaumetran on 14/11/2017.
 */
import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import ProgressBar from "../Shared/ProgressBar";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;

export default class ProjectList extends React.Component {
    getProjects() {
        fetch('http://10.14.58.12:8080/api/projects')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
            activeOpacity={0.7}
          >
            <View style={styles.header}>
              <View style={styles.line}>
                <Text style={styles.title}>RightTime</Text>
                <Text style={styles.epices}>225/225</Text>
              </View>
            </View>
            <ProgressBar percentage={90} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
            activeOpacity={0.7}
          >
            <View style={styles.header}>
              <View style={styles.line}>
                <Text style={styles.title}>SalesUp</Text>
                <Text style={styles.epices}>225/225</Text>
              </View>
            </View>
            <ProgressBar percentage={60} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
            activeOpacity={0.7}
          >
            <View style={styles.header}>
              <View style={styles.line}>
                <Text style={styles.title}>Homer</Text>
                <Text style={styles.epices}>225/225</Text>
              </View>
            </View>
            <ProgressBar percentage={20} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
          >
            <View style={styles.header}>
              <View style={styles.line}>
                <Text style={styles.title}>RightTime</Text>
                <Text style={styles.epices}>225/225</Text>
              </View>
            </View>
            <ProgressBar percentage={90} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
          >
            <View style={styles.header}>
              <View style={styles.line}>
                <Text style={styles.title}>RightTime</Text>
                <Text style={styles.epices}>225/225</Text>
              </View>
            </View>
            <ProgressBar percentage={90} />
          </TouchableOpacity>
          <View style={styles.separator} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  }
});
