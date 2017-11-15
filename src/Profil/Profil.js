/**
 * Created by Donavan Aziaka on 31/10/2017.
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import ProgressBar from "../Shared/ProgressBar";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;
const cardWidth = width / 2;

export default class Profil extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/guillaume.tran.jpg")}
          resizeMode="contain"
        />
        <View>
          <Text>Tran</Text>
          <Text>Guillaume</Text>
          <Text>225 épices</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.delimiter} />
        <View style={styles.separator} />
        <View style={{ flex: 1 }}>
          <View>
            <Text>Mes projets</Text>
            <View style={styles.separator} />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.separator} />
          <View style={{ flex: 1 }}>
            <Text>Projets soutenus</Text>
            <View style={styles.separator} />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.separator} />
          <View style={{ flex: 1 }}>
            <Text>Projets terminées</Text>
            <View style={styles.separator} />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.line}>
                    <Text style={styles.title}>RightTime</Text>
                    <Text style={styles.epices}>225/225</Text>
                  </View>
                </View>
                <ProgressBar percentage={70} />
              </View>
            </ScrollView>
            <View style={styles.separator} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "#585858",
    fontFamily: "sukhumvitset"
  },
  image: {
    paddingTop: 30
  },
  delimiter: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  separator: {
    height: 15
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    justifyContent: "space-between"
  }
});
