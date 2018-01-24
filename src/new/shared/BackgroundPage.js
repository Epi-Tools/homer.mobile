/**
 * Created by guillaumetran on 07/01/2018.
 */
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export default class BackgroundPage extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    backgroundContent: PropTypes.element.isRequired
  };

  static defaultProps = {
    backgroundContent: null
  };
  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute"
          }}
        >
          {this.props.backgroundContent}
        </View>
        {this.props.children}
      </View>
    );
  }
}
