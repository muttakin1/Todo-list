import React from "react";
import { Text, View, StyleSheet, Button, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

export default function HomeScreen({ navigation }) {
  const [title, setTitle] = React.useState("My New Todo Title");
  const [description, setDescription] = React.useState("");

  const storeData = async (description, title) => {
    try {
      const newItem = { description, title };
      console.log(newItem, "New item to store");
  
      let value = await AsyncStorage.getItem("Todo");
      let arr = value ? JSON.parse(value) : []; 
  
      console.log(value, "Stored value before update");
  
      if (!Array.isArray(arr)) {
        arr = [];
      }
  
      arr.push(newItem);
      console.log(arr, "Updated array");
  
      await AsyncStorage.setItem("Todo", JSON.stringify(arr));
  
      console.log("Data successfully saved");
    } catch (e) {
      console.log("Error saving data:", e);
    }
  };

  const createTwoButtonAlert = () => {
    if (description || title == "") {
      storeData(description, title);
      Alert.alert("Done", "To do added Successfully", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      Alert.alert("Error", "To do title or description cannot be empty", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Text>Description</Text>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        style={styles.textArea}
        onChangeText={setDescription}
        value={description}
      />
      <View style={styles.buttons}>
        <FontAwesome.Button
          style={styles.cancelButton}
          name="xmark"
          onPress={() => navigation.navigate("My Todo List")}
        >
          Back
        </FontAwesome.Button>
        <FontAwesome.Button
          style={styles.saveButton}
          name="save"
          onPress={createTwoButtonAlert}
        >
          Save
        </FontAwesome.Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#1111",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginLeft: "auto",
    marginRight: "auto",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    borderWidth: 1,
    margin: 12,
    padding: 10,
    minHeight: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
