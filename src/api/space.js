import React from "react";
import { View } from "react-native";

const Space = ({ size = 1, flex = false }) => {
  const height = size * 22;
  return (
    <View
      style={{
        height: flex ? "100%" : height,
        width: "100%",
        flex: flex ? 1 : 0
      }}
    />
  );
};

export default Space;
