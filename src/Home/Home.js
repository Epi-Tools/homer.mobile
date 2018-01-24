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

const { height, width } = Dimensions.get("window");
const cardHeight = height / 5;

export default class Home extends React.Component {
  state = {
    idProject: 0,
    projectStatus: false,
    profilModal: false,
    createModal: false,
    projectModal: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Header openProfil={() => this.setState({ profilModal: true })} />
        <ProjectList
          showModal={(i, status) =>
            this.setState({
              projectModal: true,
              idProject: i,
              projectStatus: status
            })}
        />
        <FAB
          buttonColor="red"
          iconTextColor="white"
          onClickAction={() => {
            this.setState({ createModal: true });
          }}
          visible={true}
          iconTextComponent={<Ionicons name="ios-add" />}
        />
        <Modal
          visible={this.state.profilModal}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={() => this.setState({ profilModal: false })}
        >
          <Profil closeModal={() => this.setState({ profilModal: false })} />
        </Modal>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.projectModal}
          onClosed={() => this.setState({ projectModal: false })}
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
            status={this.state.projectStatus}
            closeModal={() => this.setState({ projectModal: false })}
          />
        </CardModal>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.createModal}
          onClosed={() => this.setState({ createModal: false })}
          headerSize={0.16}
          backdropOpacity={0.7}
          header={
            <View style={{ flex: 0.16, backgroundColor: "transparent" }}>
              <ModalLine />
            </View>
          }
        >
          <CreateProject
            closeModal={() => this.setState({ createModal: false })}
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
