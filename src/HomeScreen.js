import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Item = ({ item, isExpanded, toggleExpand, onDelete, onSave }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={toggleExpand} style={styles.header}>
      <Text style={styles.title}>{item.title}</Text>

      {item.done &&  
      <>
      <Text>Done</Text> 
      <FontAwesome name="check" size={24} color="green" />
      </>
      }

      <FontAwesome
        name={isExpanded ? "caret-up" : "caret-down"}
        size={24}
      />
    </TouchableOpacity>

    {isExpanded && (
      <View style={styles.expandedContainer}>
        <Text style={styles.description}>{item.description}</Text>

        {/* Action Buttons */}

        <View style={styles.actionButtons}>
          {!item.done && (
            <TouchableOpacity onPress={onSave} style={styles.iconButton}>
              <FontAwesome name="save" size={24} color="green" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);

export default function HomeScreen({ navigation }) {
  const [todoList, setTodoList] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null); // Track expanded item

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Todo");
      if (value !== null) {
        setTodoList(JSON.parse(value)); // Convert string to array
      } else {
        setTodoList([]);
      }
    } catch (e) {
      console.error("Error reading data:", e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData(); // Fetch latest data when screen is focused
    }, [])
  );

  const toggleExpand = (index) => {
    setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index)); // Collapse if clicked again
  };

  const markAsDone = async (index) => {
    try {
      const updatedList = [...todoList];
      updatedList[index].done = true; // Mark the task as done
      await AsyncStorage.setItem("Todo", JSON.stringify(updatedList));
      setTodoList(updatedList);
    } catch (e) {
      console.error("Error updating item:", e);
    }
  };
  
  const deleteItem = async (index) => {
    try {
      const updatedList = todoList.filter((_, i) => i !== index);
      await AsyncStorage.setItem("Todo", JSON.stringify(updatedList));
      setTodoList(updatedList);
    } catch (e) {
      console.error("Error deleting item:", e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todoList || []}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            isExpanded={expandedItemIndex === index} // Use index for expansion
            toggleExpand={() => toggleExpand(index)}
            onSave={() => markAsDone(index)}
            onDelete={() => deleteItem(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()} // Use index as key
      />
      <View style={styles.button}>
        <FontAwesome.Button
          name="plus"
          onPress={() => navigation.navigate("Add New Todo")}
        >
          Add New Task
        </FontAwesome.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expandedContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  button: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});
