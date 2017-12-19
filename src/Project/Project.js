import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    Button, Picker, Alert
} from "react-native";

const GLOBAL = require("../Global");
const { height, width } = Dimensions.get("window");

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idProject: props.Id,
        userId: 0,
      projectInfo: [],
      bets: 5
    };
  }

  componentWillMount() {
    console.log(this.state.idProject);
    fetch(GLOBAL.SERVER_URL + "/api/projects/" + this.state.idProject, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          projectInfo: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
      fetch(GLOBAL.SERVER_URL + "/api/users/current", {
          method: "GET"
      })
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  userId: responseJson.id
              });
          })
          .catch(error => {
              console.error(error);
          });
  }


  alertMessage(title, message) {
      Alert.alert(
          title,
          message,
          [{text: "OK", onPress: () => console.log("success")}],
          {cancelable: false});
  }

  betsProject() {
      let project = {
          userId: this.state.userId,
          projectId: this.state.idProject,
          spices: this.state.bets
      };
      fetch(GLOBAL.SERVER_URL + "/api/bets/", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(project)
      })
          .then(response => {
              let message = response.json();
              console.log(message);
              if (response.status === 200) {
                  this.alertMessage("Bets", "You successfully bet " + this.state.bets + " spices on this project")
              }
              else {
                  this.alertMessage("Error", message.error)
              }
          })
          .catch(error => {
          this.alertMessage("Authentication Error", "Network request failed.");
          console.error(error);
      });
  }

  render() {
    let project = this.state.projectInfo;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.closeModal()}
              style={{ flex: 1 }}
            >
              <Image
                style={{ flex: 0.5 }}
                source={require("../assets/back-button.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.title}>{project.name}</Text>
            <View style={{ flex: 1 }} />
          </View>
          <View
            style={{
              backgroundColor: "#525050",
              borderLeftWidth: 4,
              borderLeftColor: "#60AAFF",
              padding: 20
            }}
          >
            <Text style={styles.text}>{project.description}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.date}>
              <Text style={styles.text}>{project.dateFollowUp}</Text>
            </View>
            <Text style={styles.text}>{project.followUp}</Text>
            <View style={styles.date}>
              <Text style={styles.text}>{project.dateFollowUp1}</Text>
            </View>
            <Text style={styles.text}>{project.followUp1}</Text>
            <View style={styles.date}>
              <Text style={styles.text}>{project.dateDelivery}</Text>
            </View>
            <Text style={styles.text}>{project.delivery}</Text>
              <Picker style={styles.picker}
                  selectedValue={this.state.bets}
                  onValueChange={(itemValue, itemIndex) => this.setState({bets: itemValue})}>
                  <Picker.Item label="5" value={5} />
                  <Picker.Item label="15" value={15} />
              </Picker>
              <Button onPress={() => this.betsProject()} title="Bets" color="#000000"/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
    picker: {
        color: "#E3E3E3",
    },
  title: {
      color: "#E3E3E3",
    fontSize: 40,
      fontFamily: "sukhumvitset"
  },
  text: {
    color: "#E3E3E3",
    fontSize: 18,
    fontFamily: "sukhumvitset"
  },
  date: {
    height: height / 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
