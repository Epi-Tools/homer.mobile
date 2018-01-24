/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import TouchableCard from "../shared/TouchableCard";
import BackgroundPage from "../shared/BackgroundPage";
import Header from "./Header";
const { height } = Dimensions.get("window");

const ProjectList = [
  {
    title: "test"
  },
  { title: "oui" },
  { title: "oui" },
  { title: "oui" },
  { title: "oui" }
];

export default class Home extends React.Component {
  renderItem() {
    return ProjectList.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flex: 1,
            height: height / 4,
            alignItems: "center"
          }}
        >
          <View style={{ height: 20 }} />
          <View
            style={{
              width: "90%",
              height: "90%"
            }}
          >
            <TouchableCard
              borderRadius={10}
              shadow={true}
              shadowColor="black"
              animation={true}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 10,
                  flexDirection: "row",
                  overflow: "hidden"
                }}
              >
                <View
                  style={{
                    flex: 3,
                    padding: "5%"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center"
                    }}
                  >
                    <Text numberOfLines={2} style={styles.name}>
                      {item.title}
                    </Text>
                    <Text style={styles.date} />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center"
                    }}
                  >
                    <Text numberOfLines={3} style={styles.description}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <ImageBackground
                  style={{
                    flex: 2,
                    height: "100%"
                  }}
                  source={item.image}
                  resizeMode="cover"
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(66, 117, 152, 0.3)"
                    }}
                  />
                </ImageBackground>
              </View>
            </TouchableCard>
          </View>
        </View>
      );
    });
  }
  render() {
    return (
      <BackgroundPage
        backgroundContent={
          <View style={{ flex: 1 }}>
            <ImageBackground
              style={{ flex: 1 }}
              source={require("../../assets/background.jpeg")}
              resizeMode="cover"
            >
              <LinearGradient
                style={{
                  flex: 1
                }}
                start={{ x: 0.0, y: 0 }}
                end={{ x: 0, y: 1.0 }}
                colors={["rgba(67, 137, 162, 0.5)", "rgba(92, 37, 141, 0.7)"]}
              >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.7)" }} />
              </LinearGradient>
            </ImageBackground>
            <View style={{ flex: 3, backgroundColor: "white" }} />
          </View>
        }
      >
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <ScrollView
            contentContainerStyle={{
              marginTop: height / 10,
              paddingBottom: height / 8
            }}
          >
            {this.renderItem()}
          </ScrollView>
          <Header />
        </View>
      </BackgroundPage>
    );
  }
}

const styles = StyleSheet.create({});
