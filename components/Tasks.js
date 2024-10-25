import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Tasks = ({ set }) => {
  return (
    <View style={styles.task}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{set.title}</Text>
      </View>

      <View style={styles.itemRight}>
        {/* <Image style={styles.dustbin} source={require("./Images/Delete.png")} /> */}
        <View style={styles.circular}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "gray",
    shadowOpacity: "10",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  dustbin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Tasks;
