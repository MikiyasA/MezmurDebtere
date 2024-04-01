import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

function EditRich({ navigation }) {
  const [l, setL] = useState();
  const saveMezmur = async (lyric) => {
    await AsyncStorage.setItem("lyric", lyric);
    console.log("kjn", l);
  };
  const richText = React.useRef();
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Text>Description:</Text>
          <RichEditor
            ref={richText}
            onChange={(descriptionText) => setL(descriptionText)}
          />
        </KeyboardAvoidingView>
        <Button onPress={() => saveMezmur(l)} title="Save" />
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.indent,
            actions.outdent,
          ]}
          iconMap={{ [actions.heading1]: handleHead }}
        />
      </ScrollView>

      <Button
        title="View Rich"
        onPress={() => navigation.navigate("ViewRich")}
      />
    </SafeAreaView>
  );
}

function ViewRich({ navigation }) {
  const [lyric, setLyric] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const retrievedLyric = await AsyncStorage.getItem("lyric");
        console.log("Retrieved Lyric:", retrievedLyric);
        setLyric(retrievedLyric);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    getData();
  }, []);

  console.log("Lyric:", lyric);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: lyric }}
        onError={(error) => console.error("WebView Error:", error)}
        // style={{ flex: 1 }} // Ensure WebView fills the container
      />

      <Button
        title="Edit Rich"
        onPress={() => navigation.navigate("EditRich")}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ViewRich" component={ViewRich} />
      <Stack.Screen name="EditRich" component={EditRich} />
    </Stack.Navigator>
  );
}
