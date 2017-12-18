/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

const radiusSize = 10;

/*Take an header in props*/
export default class CardPage extends React.Component {
  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>
        {this.props.header}
        <View style={styles.card}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#313030",
    borderTopLeftRadius: radiusSize,
    borderTopRightRadius: radiusSize,
    marginTop: -radiusSize
  }
});
