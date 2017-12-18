/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";


export default class ProgressBar extends React.Component {
  render() {
    const percentage = this.props.percentage || 0;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={styles.container}>
          <View style={styles.bar}>
            <View style={[{ flex: percentage / 100 }, styles.progress]}>
              <Text style={styles.status}>Follow-up 1 en cours</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  },
  bar: {
    flex: 0.9,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row"
  },
  progress: {
    backgroundColor: "#60AAFF",
    borderRadius: 15,
    alignItems: "center"
  },
  status: {
    fontSize: 12,
    fontFamily: "sukhumvitset",
    color: "#585858"
  }
});
