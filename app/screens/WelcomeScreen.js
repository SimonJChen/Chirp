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
import { signInWithEmailAndPassword } from "firebase/auth";

import colors from "../config/colors";
import { auth } from "../firebase";

function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Chat Screen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/defaultWallPaper.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={{ bottom: 20 }}>Chirp</Text>
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
        <Button style={styles.button} title="Login" onPress={handleSignIn} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
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
