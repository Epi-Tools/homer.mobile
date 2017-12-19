/**
 * Created by guillaumetran on 30/10/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FAB from "react-native-fab";

import ProjectList from "./ProjectList";
import Header from "./Header/Header";
import CreateProject from "../CreateProject/CreateProject";
import Profil from "../Profil/Profil";
import Project from "../Project/Project";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";
import EditProject from "../Profil/EditProject";

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;

export default class Home extends React.Component {
  state = {
    idProject: 0,
    profil: false,
    modal: false,
    project: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Header openProfil={() => this.setState({ profil: true })} />
        <ProjectList
          showModal={i => this.setState({ project: true, idProject: i })}
        />
        <FAB
          buttonColor="red"
          iconTextColor="white"
          onClickAction={() => {
            this.setState({ modal: true });
          }}
          visible={true}
          iconTextComponent={<Ionicons name="ios-add" />}
        />
        <Modal
          visible={this.state.modal}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={() => this.setState({ modal: false })}
        >
          <CreateProject closeModal={() => this.setState({ project: false })} />
        </Modal>
        <Modal
          visible={this.state.profil}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={() => this.setState({ profil: false })}
        >
          <Profil />
        </Modal>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.project}
          onClosed={() => this.setState({ project: false })}
          headerSize={0.16}
          backdropOpacity={0.7}
          header={
            <View style={{ flex: 0.16, backgroundColor: "transparent" }}>
              <ModalLine />
            </View>
          }
        >
          <Project
            Id={this.state.idProject}
            closeModal={() => this.setState({ project: false })}
          />
        </CardModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313030"
  }
});

//           <EditProject Id={2} />
