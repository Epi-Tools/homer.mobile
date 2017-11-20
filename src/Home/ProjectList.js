/**
 * Created by guillaumetran on 14/11/2017.
 */
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";

import ProgressBar from "../Shared/ProgressBar";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {jsonData: []};
    }

    componentWillMount() {
        fetch("http://192.168.1.19:8080/api/projects", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    jsonData: responseJson
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ProjectListRender(currentProject, i) {
            return (
                <View key={i}>
                  <View style={styles.separator} />
                  <TouchableOpacity
                      style={styles.card}
                      onPress={() => this.props.showModal()}
                      activeOpacity={0.7}>
                    <View style={styles.header}>
                      <View style={styles.line}>
                        <Text style={styles.title}>{currentProject.name}</Text>
                        <Text style={styles.epices}>{currentProject.currentSpices} / {currentProject.spices}</Text>
                      </View>
                    </View>
                    <ProgressBar percentage={90} />
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
            );
    };

  render() {
      let projects = this.state.jsonData;
      return (
        <View style={styles.container}>
            {projects.map((item,i) => this.ProjectListRender(item, i))}
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

/*      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.props.showModal()}
            activeOpacity={0.7}>
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
            activeOpacity={0.7}>
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
            activeOpacity={0.7}>
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
            onPress={() => this.props.showModal()}>
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
            onPress={() => this.props.showModal()}>
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
      </View> */