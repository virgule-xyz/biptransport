import React from "react";
import {
  Text,
  Left,
  Body,
  CardItem,
  Thumbnail,
  Icon,
  Button,
  Toast
} from "native-base";
import ApplicationContext from "../AppContext";

const logo = require("./medias/dentinov.png");

const Infos = () => (
  <ApplicationContext.Consumer>
    {({ project }) => (
      <CardItem>
        <Left>
          <Thumbnail source={logo} />
          <Body>
            <Text>
              Bon {project.numero} pour {project.client}
            </Text>
            <Text note>Gamme {project.gamme}</Text>
            <Text note>
              {project.mode} étape {project.etape}
            </Text>
            <Text note>
              Reçu le {project.date} pour le {project.retour}
            </Text>
            <Button
              iconLeft
              small
              light
              onPress={() =>
                Toast.show({
                  text: project.travaux.join(", "),
                  duration: project.travaux.join(", ").length * 100,
                  buttonText: "Fermer"
                })
              }
            >
              <Icon name="cog" />
              <Text>Travaux</Text>
            </Button>
          </Body>
        </Left>
      </CardItem>
    )}
  </ApplicationContext.Consumer>
);

export default Infos;
