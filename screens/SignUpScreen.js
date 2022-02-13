import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "http://ritatony.pythonanywhere.com";
const API_NEWUSER = "/newuser";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success,setSuccess] = useState(false);

  async function signUp() {
    console.log("---- Sign Up Time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_NEWUSER, {
        username,
        password,
      });
      console.log("Success sign up!");
      console.log(response);

      if (response.data.Error == null) {
        setSuccess(true);
        setErrorText(response.data.Success);
      }
      else {
        setSuccess(false);
        setErrorText(response.data.Error);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error register new account!");
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
  }

  function signIn()
  {
    Keyboard.dismiss();
    navigation.navigate("SignIn");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Text style={styles.title}>Sign Up to blog</Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={signUp} style={styles.loginButton}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} /> //adjust
          ) : null }
        </View>
        <Text style={ success ? styles.successText : styles.errorText}>{errorText}</Text>
        <Button title="Go to Sign In page" onPress={signIn} />
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
    color: "green",
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
  successText: {
    color: "green",
    height: 40,
  },
});
