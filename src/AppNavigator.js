import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import { Sign, Dashboard, Editor, Resume } from "@screens";

const DashboardStack = createStackNavigator(
  { Dashboard, Editor, Resume },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const SignNavigator = createSwitchNavigator(
  { Sign, DashboardStack },
  {
    initialRouteName: "Sign",
    navigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(SignNavigator);

export default AppContainer;
