import React, { Component } from "react";
import { Dimensions } from "react-native";
import {
  Form,
  Label,
  Icon,
  Item,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Toast,
  Input
} from "native-base";
import { Space, Dentinov, Scanner } from "@api";
import ApplicationContext from "../AppContext";

class ProjectInput extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      codeError: props.codeError,
      projectId: ""
    };
  }

  onChangeTextCode = text => {
    this.setState(
      state => ({ ...state, codeError: false, projectId: text }),
      () => {}
    );
  };

  onPressSearch = () => {
    this.props.onPressSearch(this.state.projectId);
  };

  render() {
    const { codeError, projectId } = this.state;

    return (
      <Card transparent>
        <CardItem>
          <Body>
            <Form style={{ width: "100%" }}>
              <Label>
                Vous pouvez aussi entrer directement le code du projet
              </Label>
              <Item error={codeError}>
                <Input
                  regular
                  autoComplete="off"
                  autoCorrect={false}
                  onChangeText={this.onChangeTextCode}
                  placeholder="ex: 34567..."
                />
                {codeError && <Icon name="close-circle" />}
              </Item>
              <Space />
              <Button
                light
                block
                iconLeft
                onPress={this.onPressSearch}
                disabled={projectId.length === 0}
              >
                <Icon name="search" style={{ color: "black" }} />
                <Text>Rechercher</Text>
              </Button>
            </Form>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default ProjectInput;
