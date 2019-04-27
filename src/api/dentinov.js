import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Icon,
  Button,
  Text,
  Title,
  Left,
  Right,
  Body,
  Badge
} from "native-base";
import { withNavigation } from "react-navigation";
import ApplicationContext from "../AppContext";

class Dentinov extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLogout = () => {
    this.props.navigation.navigate("Sign");
    this.context.logout();
  };

  render() {
    const { children } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onPressLogout}>
              <Icon name="logout" type="AntDesign" />
            </Button>
          </Left>
          <Body>
            <Title>Dentinov Images</Title>
          </Body>
          <Right>
            <Badge>
              <Text style={{ fontSize: 16 }}>
                <Icon
                  name="cloud-upload"
                  style={{ fontSize: 16, color: "#fff" }}
                />{" "}
                {this.context.uploads.count}
              </Text>
            </Badge>
          </Right>
        </Header>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            height: "100%",
            justifyContent: "space-around"
          }}
        >
          {children}
        </View>
      </Container>
    );
  }
}

export default withNavigation(Dentinov);
