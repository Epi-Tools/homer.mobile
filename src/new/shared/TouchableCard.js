/**
 * Created by guillaumetran on 06/01/2018.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";

export default class TouchableCard extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    onPress: PropTypes.func,
    color: PropTypes.string,
    animation: PropTypes.bool,
    gradient: PropTypes.bool,
    start: PropTypes.object,
    end: PropTypes.object,
    colors: PropTypes.array,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    shadow: PropTypes.bool,
    shadowColor: PropTypes.string,
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number,
    shadowOffset: PropTypes.object
  };

  static defaultProps = {
    onPress: () => {},
    color: "#FCFCFC",
    animation: false,
    gradient: false,
    start: { x: 0.0, y: 0.5 },
    end: { x: 0.5, y: 1.0 },
    colors: ["#1F8AD3", "#56B6F8"],
    borderColor: "grey",
    borderWidth: 0,
    borderRadius: 0,
    shadow: false,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { height: 10, width: 0 }
  };

  constructor(props) {
    super(props);

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn() {
    if (this.props.animation) {
      Animated.spring(this.animatedValue, {
        toValue: 0.85
      }).start();
    }
  }

  handlePressOut() {
    if (this.props.animation) {
      Animated.spring(this.animatedValue, {
        toValue: 1,
        friction: 3,
        tension: 40
      }).start();
    }
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: this.props.color,
            borderRadius: this.props.borderRadius
          },
          this.props.shadow ? { elevation: this.props.shadowRadius } : {},
          animatedStyle
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress();
          }}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
        >
          {this.props.gradient ? (
            <LinearGradient
              style={[
                {
                  flex: 1,
                  backgroundColor: "transparent",
                  borderColor: this.props.borderColor,
                  borderWidth: this.props.borderWidth,
                  borderRadius: this.props.borderRadius
                },
                this.props.shadow
                  ? {
                      shadowOpacity: this.props.shadowOpacity,
                      shadowRadius: this.props.shadowRadius,
                      shadowColor: this.props.shadowColor,
                      shadowOffset: this.props.shadowOffset
                    }
                  : {},
                this.props.style
              ]}
              start={this.props.start}
              end={this.props.end}
              colors={this.props.colors}
            >
              {this.props.children}
            </LinearGradient>
          ) : (
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: this.props.color,
                  borderColor: this.props.borderColor,
                  borderWidth: this.props.borderWidth,
                  borderRadius: this.props.borderRadius
                },
                this.props.shadow
                  ? {
                      shadowOpacity: this.props.shadowOpacity,
                      shadowRadius: this.props.shadowRadius,
                      shadowColor: this.props.shadowColor,
                      shadowOffset: this.props.shadowOffset
                    }
                  : {},
                this.props.style
              ]}
            >
              {this.props.children}
            </View>
          )}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }
});
