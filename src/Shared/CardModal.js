/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StatusBar } from "react-native";
import Modal from "./ModalBox";
import CardPage from "./CardPage";

export default class CardModal extends React.Component {
  render() {
    return (
      <Modal
        style={{ flex: 1, backgroundColor: "transparent" }}
        swipeArea={this.props.swipeArea}
        swipeThreshold={this.props.swipeThreshold}
        coverScreen={true}
        isOpen={this.props.isOpen}
        onClosed={() => this.props.onClosed()}
        backdropOpacity={this.props.backdropOpacity}
        backdropContent={this.props.backdropContent}
        modalLine={this.props.header}
      >
        {this.props.header}
        <CardPage style={{ flex: 1 - this.props.headerSize }}>
          {this.props.children}
        </CardPage>
      </Modal>
    );
  }
}
