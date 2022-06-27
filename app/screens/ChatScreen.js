import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import colors from "../config/colors";

function ChatScreen(props) {
  const [tempMessage, setTempMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    // const getMessage = async () => {
    //   const data = await getDocs(
    //     query(messagesCollectionRef, orderBy("createdAt", "asc"))
    //   );

    //   setMessages(
    //     data.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }))
    //   );
    // };
    // getMessage();

    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return function () {
      unsubscribe();
    };
  }, []);

  async function handleAddNewMessage() {
    Keyboard.dismiss();
    const { uid, displayName, email } = auth.currentUser;
    const newDoc = await addDoc(messagesCollectionRef, {
      uid,
      displayName,
      text: tempMessage,
      createdAt: serverTimestamp(),
      email: email,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView style={styles.chatBox}>
            {messages.map(({ id, uid, text, email }) =>
              uid === auth.currentUser.uid ? (
                <View key={id} style={styles.sender}>
                  <Text>{email}</Text>
                  <Text style={styles.sendersText}>{text}</Text>
                </View>
              ) : (
                <View>
                  <Text key={id} style={styles.receiver}>
                    {email}
                  </Text>
                  <Text style={styles.receiverText}>{text}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.messageAndSendButtonContainer}>
            <TextInput
              placeholder="Message"
              value={tempMessage}
              onChangeText={(text) => setTempMessage(text)}
              style={styles.sendMessageBox}
            />
            <Button title="Send" onPress={handleAddNewMessage} />
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  chatBox: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  messageAndSendButtonContainer: {
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    bottom: 10,
  },
  sendMessageBox: {
    flex: 1,
    height: 40,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
  receiverText: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  sendersText: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
});
export default ChatScreen;
