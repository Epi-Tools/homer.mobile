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
        status: props.status,
        button: 1,
        owner: ""
    };
    console.log(this.state.status);
  }

  componentDidMount() {
      console.log(this.state.idProject);
      this.GetUserInfo();
      this.GetBetUserList();
  }

  GetProjectInfo() {
      fetch(GLOBAL.SERVER_URL + GLOBAL.PROJECTS + this.state.idProject, {
          method: "GET"
      })
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  projectInfo: responseJson
              });
              this.GetOwnerInfo(responseJson.userId);
          })
          .catch(error => {
              console.error(error);
          });
  }

  GetUserInfo() {
      fetch(GLOBAL.SERVER_URL + GLOBAL.USER, {
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
             this.setState({button: 0})
      });
  }

  GetBetUserList() {
      fetch(GLOBAL.SERVER_URL + GLOBAL.BETS + this.state.idProject, {
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

    GetContributorsList() {
        fetch(GLOBAL.SERVER_URL + GLOBAL.BETS + this.state.idProject, {
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

    GetOwnerInfo(id) {
        fetch(GLOBAL.SERVER_URL + GLOBAL.USERS + id, {
            method: "GET"
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    owner: responseJson,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    UserListRender(user, i) {
        return (
            <View key={i}>
                <View style={{padding: 20}}>
                    <View style={{ flexDirection: "row", paddingLeft: 10, flex: 1}}>
                        <Text style={styles.bets}>{user.spices}</Text>
                        <Text style={styles.bets}>-</Text>
                        <Text style={styles.bets}>{user.username.split('@').shift().split('.').join(' ')}</Text>
                    </View>
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
    fetch(GLOBAL.SERVER_URL + GLOBAL.USE_BET, {
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
    if (this.state.status !== 0 && this.state.button !== 0)
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text style={styles.header}>{project.name}</Text>
                    <Text style={styles.owner}>{this.state.owner.email}</Text>
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
                    <View style={styles.separator}/>
                    <View style={styles.separator}/>
                    <View style={styles.separator}/>
                    <View
                        style={{
                            backgroundColor: "#525050",
                            borderLeftWidth: 4,
                            borderLeftColor: "#60AAFF",
                            padding: 20
                        }}
                    >
                        <Text style={styles.text}>Bets</Text>
                    </View>
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
                    <Text style={styles.header}>{project.name}</Text>
                    <Text style={styles.owner}>{this.state.owner.email}</Text>
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
                    <View style={styles.separator}/>
                    <View style={styles.separator}/>
                    <View style={styles.separator}/>
                    <View
                        style={{
                            backgroundColor: "#525050",
                            borderLeftWidth: 4,
                            borderLeftColor: "#60AAFF",
                            padding: 20
                        }}
                    >
                        <Text style={styles.text}>Bets</Text>
                    </View>
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
    header: {
        color: "#E3E3E3",
        fontSize: 25,
        fontFamily: "sukhumvitset"
    },
    owner: {
        color: "#E3E3E3",
        fontSize: 15,
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
  },
    bets: {
        color: "#E3E3E3",
        fontSize: 18,
        fontFamily: "sukhumvitset",
        paddingRight: 20
    },
});
