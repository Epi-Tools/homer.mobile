/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.title}>Homer</Text>
        </View>
        <Image
          source={require("../../assets/logoEpitech.png")}
          style={{ flex: 0.4 }}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#E3E3E3",
    fontSize: 40,
    fontFamily: "sukhumvitset"
  }
});
