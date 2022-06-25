import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";

import colors from "../config/colors";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [createdUserName, setcreatedUserName] = useState();
  const [createdPassword, setCreatedPassword] = useState();
  const [linkedEmail, setLinkedEmail] = useState();

  const submitForm = () => {};

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style>Chirp</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="First Name"
          type="firstName"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Last Name"
          type="lastName"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Enter A Username"
          type="username"
          value={createdUserName}
          onChangeText={(text) => setcreatedUserName(text)}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Create A Password"
          type="password"
          value={createdPassword}
          onChangeText={(text) => setCreatedPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.textBox}
          placeholder="Enter Valid Email Address"
          type="username"
          value={linkedEmail}
          onChangeText={(text) => setLinkedEmail(text)}
        />
        <Button style={styles.button} title="Submit" onPress={submitForm} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.45,
    top: 20,
    justifyContent: "space-between",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    alignItems: "center",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    top: 20,
  },
  textBox: {
    width: 350,
    height: 40,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
});
