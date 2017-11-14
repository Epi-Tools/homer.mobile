/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabViewAnimated } from 'react-native-tab-view';

export default class TabNavigation extends React.Component {
  _renderFooter = props => {
    return <View style={styles.tabBar} />;
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderFooter={this._renderFooter}
        animationEnabled={false}
        swipeEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4"
  }
});
