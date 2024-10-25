import React from "react";
import { StyleSheet } from "react-native";
import TaskList from "./screens/TaskList";
import CreateTask from "./screens/CreateTask";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BCD7FF",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  listItems: {
    marginTop: 30,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  createButton: {
    width: "80%",
    padding: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#04A5FF",
    shadowColor: "gray",
    shadowOpacity: 5,
  },
  createText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
