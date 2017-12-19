import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Button,
  Picker,
  Alert
} from "react-native";
import Moment from "moment";

const GLOBAL = require("../Global");
const { height, width } = Dimensions.get("window");

export default class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idProject: props.Id,
      userId: 0,
        usersBet: [],
        projectInfo: [],
      bets: 5,
        status: props.status
    };
    console.log(this.state.status);
  }

  componentWillMount() {
    console.log(this.state.idProject);
      this.GetUserInfo();
     this.GetBetUserList();
  }

  GetProjectInfo() {
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
  }

  GetUserInfo() {
      fetch(GLOBAL.SERVER_URL + "/api/users/current", {
          method: "GET"
      })
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  userId: responseJson.id
              });
              this.GetProjectInfo()
          })
          .catch(error => {
              console.error(error);
          });
  }

  CheckUserBet() {
      this.state.usersBet.map((item, i) => {
         if (item.userId === this.state.userId)
             this.setState({status: 0})
      });
  }

  GetBetUserList() {
      fetch(GLOBAL.SERVER_URL + "/api/bets/project/provided/" + this.state.idProject, {
          method: "GET"
      })
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  usersBet: responseJson,
              });
              this.CheckUserBet()
          })
          .catch(error => {
              console.error(error);
          });
    }


    UserListRender(user, i) {
        return (
            <View key={i}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.text}>{user.username.split('@').shift().split('.').join(' ')}</Text>
                        <Text style={styles.text}>{user.spices}</Text>
                    </View>
            </View>
        );
    }

  alertMessage(title, message) {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("success") }],
      { cancelable: false }
    );
  }

  betsProject() {
    let project = {
      userId: this.state.userId,
      projectId: this.state.idProject,
      spices: this.state.bets
    };
    fetch(GLOBAL.SERVER_URL + "/api/bets/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then(response => {
          if (response.status === 200) {
            this.alertMessage(
            "Bets",
            "You successfully bet " +
              this.state.bets +
              " spices on this project"
          );
              this.setState({status: 0});
              this.GetBetUserList();

          } else {
              this.setState({status: 0});
              response.json().then(e => this.alertMessage("Error", e.error || "Can not bet this project"))
              .catch(() => this.alertMessage("Error", "You can not bet on this project"));
        }
      })
      .catch(error => {
        this.alertMessage("Authentication Error", "Network request failed.");
        console.error(error);
      });
  }

  render() {
    let project = this.state.projectInfo;
    if (this.state.status === 0)
      return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.title}>{project.name}</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
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
              <Text style={styles.text}>
                {Moment(project.dateFollowUp).format("LL")}
              </Text>
            </View>
            <Text style={styles.text}>{project.followUp}</Text>
            <View style={styles.date}>
              <Text style={styles.text}>
                {Moment(project.dateFollowUp1).format("LL")}
              </Text>
            </View>
            <Text style={styles.text}>{project.followUp1}</Text>
            <View style={styles.date}>
              <Text style={styles.text}>
                {Moment(project.dateDelivery).format("LL")}
              </Text>
            </View>
            <Text style={styles.text}>{project.delivery}</Text>
          </View>
            <View style={styles.separator}/>
            {this.state.usersBet.map((item, i) =>
                this.UserListRender(item, i)
            )}
        </ScrollView>
      </View>
    );
    else
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text style={styles.title}>{project.name}</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
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
                            <Text style={styles.text}>
                                {Moment(project.dateFollowUp).format("LL")}
                            </Text>
                        </View>
                        <Text style={styles.text}>{project.followUp}</Text>
                        <View style={styles.date}>
                            <Text style={styles.text}>
                                {Moment(project.dateFollowUp1).format("LL")}
                            </Text>
                        </View>
                        <Text style={styles.text}>{project.followUp1}</Text>
                        <View style={styles.date}>
                            <Text style={styles.text}>
                                {Moment(project.dateDelivery).format("LL")}
                            </Text>
                        </View>
                        <Text style={styles.text}>{project.delivery}</Text>
                        <View
                            style={{
                                height: height / 8,
                                justifyContent: "center"
                            }}
                        >
                            <Picker
                                style={{backgroundColor:'white'}}
                                itemStyle={{color:'white'}}
                                selectedValue={this.state.bets}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ bets: itemValue })}
                            >
                                <Picker.Item label="5" value={5} />
                                <Picker.Item label="15" value={15} />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.betsProject()}
                            style={{
                                flex: 1,
                                height: 60,
                                backgroundColor: "#60AAFF",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 15
                            }}
                        >
                            <Text
                                style={{
                                    color: "#E3E3E3",
                                    fontSize: 20,
                                    fontFamily: "sukhumvitset"
                                }}
                            >
                                Bets
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator}/>
                    {this.state.usersBet.map((item, i) =>
                        this.UserListRender(item, i)
                    )}
                </ScrollView>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  picker: {
    color: "white"
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
  },
    separator: {
      height: 10
    }
});
