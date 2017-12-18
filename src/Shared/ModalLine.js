/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { View } from "react-native";

export default class ModalLine extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            flex: 0.35,
            marginBottom: 22,
            borderBottomWidth: 2,
            borderBottomColor: "white"
          }}
        />
      </View>
    );
  }
}
