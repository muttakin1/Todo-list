import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  FlatList,
} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
     <Text>Hello</Text>
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
  button: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});
