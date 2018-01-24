/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.textFooter}>2018 - Epitech Strasbourg</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  textFooter: {
    color: "#D5D5D5",
    fontSize: 20,
    fontFamily: "sukhumvitset"
  }
});
