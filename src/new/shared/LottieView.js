/**
 * Created by guillaumetran on 07/10/2017.
 */
import React, { Component } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import PropTypes from "prop-types";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

export default class LottieView extends React.Component {
  state = {
    progress: new Animated.Value(0),
    loaded: false
  };

  static propTypes = {
    size: PropTypes.number,
    source: PropTypes.element
  };

  static defaultProps = {
    size: 100,
    source: require("../../assets/lottie/loader.json")
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: this.props.size,
            height: this.props.size
          }}
        >
          <Lottie
            ref={animation => {
              if (!this.state.loaded) {
                this.animation = animation;
                this.setState({ loaded: true });
              } else this.animation.play();
            }}
            style={{
              width: this.props.size,
              height: this.props.size
            }}
            progress={this.state.progress}
            loop={true}
            source={this.props.source}
          />
        </View>
      </View>
    );
  }
}
