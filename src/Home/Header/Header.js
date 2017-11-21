/**
 * Created by guillaumetran on 14/11/2017.
 */
/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          <Text style={styles.title}>Homer</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center" }}
            onPress={() => this.props.openProfil()}
          >
            <Image
              style={{ flex: 0.5 }}
              source={require("../../assets/profile.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    paddingTop: 22,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: "#4A4A4A",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "sukhumvitset",
    color: "#E3E3E3",
    fontSize: 50
  }
});
