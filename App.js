import * as React from "react";
import { Text, View, StyleSheet, Button,Alert, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/HomeScreen";
import NewTask from "./src/NewTask";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="My Todo List">
        <Stack.Screen name="My Todo List" component={HomeScreen} style={styles.item}/>
        <Stack.Screen name="Add New Todo" component={NewTask} style={styles.item}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
      backgroundColor: '#1111',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
export default App;
