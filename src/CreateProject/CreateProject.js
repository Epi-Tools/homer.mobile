import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from "moment/moment";

const GLOBAL = require("../Global");

export default class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: -1,
      spices: -1,
      name: "",
      description: "",
      followUp: "",
      followUp1: "",
      delivery: "",
      dateFollowUp: "",
      dateFollowUp1: "",
      dateDelivery: "",
        isDateTimePickerVisible: false,
        type: -1
    };
  }

  setDateTimePicker(choose) {
      this.setState({type: choose})
      this.showDateTimePicker();
  }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        console.log("Number : " + this.state.type)
        console.log('A date has been picked: ', date);
        if (this.state.type === 0) {
            this.setState({ dateFollowUp: date });
        } else if (this.state.type === 1) {
            this.setState({ dateFollowUp1: date });
        } else if (this.state.type === 2) {
            this.setState({ dateDelivery: date });
        }
        this.setState({type: -1});
        this.hideDateTimePicker();
    };


  componentWillMount() {
    fetch(GLOBAL.SERVER_URL + "/api/users/current", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.id);
        this.setState({
          userId: responseJson.id
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleNumberInput(text) {
    if (/^\d+$/.test(text)) {
      this.setState({
        spices: text
      });
    }
  }

  SendProjectDatas(project) {
      fetch(GLOBAL.SERVER_URL + "/api/projects", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(project)
      })
          .then(response => response.json())
          .then(responseData => {
              console.log(responseData);
              Alert.alert(
                  "Project created",
                  "The project has been successfully created.",
                  [{ text: "OK", onPress: () => this.props.closeModal() }],
                  { cancelable: false }
              );
          })
          .catch(err => {
              this.errorMessage("Internet Connection Error", "Please check your internet connection.");
              console.log(err);
          });
  }

  errorMessage(title, message) {
      Alert.alert(
          title,
          message,
          [{ text: "OK", onPress: () => console.log("message") }],
          { cancelable: true }
      );
  }

  checkProjectDatas () {
      if (this.state.userId === -1 ||
          this.state.spices === -1 ||
          this.state.name === "" ||
          this.state.description === "" ||
          this.state.followUp === "" ||
          this.state.followUp1 === "" ||
          this.state.delivery === "" ||
          this.state.dateFollowUp === "" ||
          this.state.dateFollowUp1 === "" ||
          this.state.dateDelivery === "")
      {
          return false;
      };
      return true;
  }

  onCreateProject() {
    let project = {
      userId: this.state.userId,
      spices: this.state.spices,
      name: this.state.name,
      description: this.state.description,
      followUp: this.state.followUp,
      followUp1: this.state.followUp1,
      delivery: this.state.delivery,
      dateFollowUp: this.state.dateFollowUp,
      dateFollowUp1: this.state.dateFollowUp1,
      dateDelivery: this.state.dateDelivery
    };
    console.log(JSON.stringify(project));
    if (this.checkProjectDatas())
        this.SendProjectDatas(project);
      else
          this.errorMessage("Error", "A field is still empty.");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.title}>Créer un projet</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, color: "white" }}
            onChangeText={text => this.setState({ name: text })}
          />
          <View style={styles.separator} />
          <Text style={styles.label}>Spices</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, color: "white" }}
            keyboardType="numeric"
            onChangeText={text => this.handleNumberInput(text)}
          />
          <View style={styles.separator} />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={{ height: 80, borderColor: "gray", borderWidth: 1, color: "white" }}
            onChangeText={text => this.setState({ description: text })}
            numberOfLines={4}
            multilines={true}
          />
          <View style={styles.separator} />
          <Text style={styles.label}>FollowUp 1</Text>
            <TextInput
                style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                onChangeText={text => this.setState({ followUp: text })}
                numberOfLines={4}
                multilines={true}
            />
            <View style={styles.separator} />
            <TouchableOpacity
                onPress={() => this.setDateTimePicker(0)}
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
                    Date Follow Up 1
                </Text>
            </TouchableOpacity>
            <Text style={styles.label}>
                {this.state.dateFollowUp !== "" && Moment(this.state.dateFollowUp).format("LL")}
                {this.state.dateFollowUp === "" && <Text>Please select a date</Text>}
            </Text>
            <View style={styles.separator} />
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
            />

            <Text style={styles.label}>FollowUp 2</Text>
            <TextInput
                style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                onChangeText={text => this.setState({ followUp1: text })}
                numberOfLines={4}
                multilines={true}
            />
            <View style={styles.separator} />
            <TouchableOpacity
                onPress={() => this.setDateTimePicker(1)}
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
                    Date Follow Up 2
                </Text>
            </TouchableOpacity>
            <Text style={styles.label}>
                {this.state.dateFollowUp1 !== "" && Moment(this.state.dateFollowUp1).format("LL")}
                {this.state.dateFollowUp1 === "" && <Text>Please select a date</Text>}
            </Text>
            <View style={styles.separator} />
          <Text style={styles.label}>Delivery</Text>
            <TextInput
                style={{ height: 80, borderColor: "white", borderWidth: 1, color: "white" }}
                onChangeText={text => this.setState({ delivery: text })}
                numberOfLines={4}
                multilines={true}
            />
            <View style={styles.separator} />
            <TouchableOpacity
                onPress={() => this.setDateTimePicker(2)}
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
                    Date Delivery
                </Text>
            </TouchableOpacity>
            <Text style={styles.label}>
                {this.state.dateDelivery !== "" && Moment(this.state.dateDelivery).format("LL")}
                {this.state.dateDelivery === "" && <Text>Please select a date</Text>}
            </Text>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => this.onCreateProject()}
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
              Valider
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#fff"
  },
  title: {
    color: "#E3E3E3",
    fontSize: 40,
    fontFamily: "sukhumvitset"
  },
  label: {
    fontSize: 25,
    color: "#E3E3E3",
    fontFamily: "sukhumvitset"
  },
  delimiter: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  separator: {
    height: 15
  }
});


