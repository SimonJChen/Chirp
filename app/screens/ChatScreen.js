import React, { useState, useEffect, useRef } from "react";
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

  const scrollViewRef = useRef();

  const clearTextState = () => {
    setTempMessage("");
  };

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
    clearTextState();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={styles.chatContainer}
        >
          {messages.map(({ id, uid, text, email }) =>
            uid === auth.currentUser.uid ? (
              <View key={id} style={styles.sender}>
                <Text>{email}</Text>
                <Text style={styles.sendersText}>{text}</Text>
              </View>
            ) : (
              <View style={styles.receiver} key={id}>
                <Text>{email}</Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  chatContainer: { flex: 1, bottom: 50 },
  chatBox: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  messageAndSendButtonContainer: {
    flex: 1,
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    bottom: 10,
  },
  receiver: { alignSelf: "flex-end" },
  sender: { alignSelf: "flex-start" },
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
