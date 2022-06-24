import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TextInput,
  Keyboard,
} from "react-native";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = () => {};
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/defaultWallPaper.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={{ bottom: 20 }}>Stay Connected</Text>
      </View>
      <View style={styles.textBoxAndButtonContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button style={styles.button} title="Login" onPress={signIn} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
        {/* <Button title="Log In With G-Mail" style={styles.loginButton} /> */}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  button: { color: colors.primaryColor },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  textBox: {
    width: 300,
    height: 40,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
  textBoxAndButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: 50,
  },
});
export default WelcomeScreen;
