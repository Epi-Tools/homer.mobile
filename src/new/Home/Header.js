/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.title} />
        </View>
        <View style={styles.item}>
          <ImageBackground
            source={require("../../assets/logoEpitech.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.item} activeOpacity={0.3}>
          <FontAwesome name="user" color="#E3E3E3" size={28} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    position: "absolute",
    height: height / 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,.6)"
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  title: {
    color: "#E3E3E3",
    fontSize: 26,
    fontFamily: "sukhumvitset"
  }
});
