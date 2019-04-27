import React, { Component } from "react";
import { Image } from "react-native";
import {
  Button,
  Text,
  Left,
  Body,
  Icon,
  Right,
  Card,
  CardItem
} from "native-base";
import ApplicationContext from "../AppContext";
import Infos from "./infos";
import ImagePicker from "react-native-image-picker";

const placeholder = require("./medias/thumb-medium.png");

class ProjectCameraTaker extends Component {
  static contextType = ApplicationContext;

  onPressValidate = () => {
    this.context.saveCurrentPicture().then(() => {
      this.props.navigation.navigate(this.props.nextScreen);
    });
  };

  onPressInvalidate = () => {
    this.context.cancelCurrentPicture();
  };

  onPressPicture = () => {
    options = {
      title: "Photo du projet",
      rotation: 90,
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.data };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.context.setCurrentPicture(source);

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  };

  render() {
    const { project } = this.context;
    return (
      <Card>
        <Infos />
        <CardItem cardBody button onPress={this.onPressPicture}>
          <Image
            source={project.picture || placeholder}
            style={{ height: 200, width: null, flex: 1 }}
            resizeMode={project.picture ? "contain" : "cover"}
          />
        </CardItem>
        <CardItem footer>
          <Left>
            <Button
              onPress={this.onPressInvalidate}
              light
              disabled={!project.picture}
            >
              <Icon active name="thumbs-down" style={{ color: "black" }} />
              <Text>Non</Text>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button onPress={this.onPressValidate} disabled={!project.picture}>
              <Text>Oui</Text>
              <Icon active name="thumbs-up" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default ProjectCameraTaker;
