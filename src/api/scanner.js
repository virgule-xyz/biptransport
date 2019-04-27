import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Button, Text, Card, CardItem, Body, H3 } from "native-base";
import { Space } from "@api";
import { RNCamera } from "react-native-camera";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
  }

  onBarCodeRead = code => {
    if (code && code.barcodes.length > 0 && code.barcodes[0].data) {
      this.props.onBarCodeReadSuccess(code.barcodes[0].data);
    }
  };

  render() {
    const { width } = Dimensions.get("window");
    const { onPressHideScanCode } = this.props;

    return (
      <Card
        transparent
        style={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      >
        <CardItem
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Body
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center"
            }}
          >
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              type={RNCamera.Constants.Type.back}
              style={{
                flex: 0,
                width: width * 0.8,
                height: width * 0.8,
                overflow: "hidden"
              }}
              permissionDialogTitle={"Accord pour utiliser la caméra"}
              permissionDialogMessage={
                "Nous avons besoin de votre accord pour utiliser la caméra"
              }
              onGoogleVisionBarcodesDetected={data => {
                this.onBarCodeRead(data);
              }}
            />
            <Space />
            <H3 style={{ textAlign: "center" }}>
              {`Placer la camera face au code,
à environ 15cm...`}
            </H3>
            <Space />
            <Button danger small full onPress={onPressHideScanCode}>
              <Text>Fermer</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default Scanner;
