import React from "react";
import { Image, StyleSheet, View, Button, ImageBackground } from "react-native";

import colors from "../config/colors";

function ViewImageScreen(props) {
  return (
    <ImageBackground
      resizeMode="contain"
      style={styles.backGround}
      source={require("../assets/defaultWallPaper.png")}
    >
      <View style={styles.imageContainer}>
        <Button
          title="< Back"
          color={colors.primaryColor}
          onPress={() => console.log("hi")}
        />
        <Button
          title="Edit"
          color={colors.primaryColor}
          onPress={() => console.log("hi")}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  deleteIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondaryColor,
    position: "absolute",
    top: 40,
    right: 30,
  },

  backGround: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
export default ViewImageScreen;
