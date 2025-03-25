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


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Buy Milk",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Buy Bread",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Buy Eggs",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.button}>

        <FontAwesome.Button name="plus" onPress={() => navigation.navigate("New Task")}>Add New task</FontAwesome.Button>

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
  button: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});
