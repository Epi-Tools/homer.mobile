/**
 * Created by guillaumetran on 30/10/2017.
 */
import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;
