import React, { useState, useCallback } from "react";
import "../global.css";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Tasks from "../components/Tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAllTasks();
    }, [])
  );

  //   const fetchAllTasks = async () => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       const items = await AsyncStorage.multiGet(keys);
  //       const taskList = items.map((item) => {
  //         const task = JSON.parse(item[1]));
  //         return { ...task, key: item[0] };
  //       });
  //       setTasks(taskList);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const fetchAllTasks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const taskList = items.map((item) => {
        const task = JSON.parse(item[1]);
        return { ...task, key: item[0] };
      });
      setTasks(taskList);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <View className="flex-1 bg-customBlueBackground">
      <View className="pt-20 px-5">
        <Text className="text-3xl font-semibold">My Tasks</Text>

        <View className="mt-8">
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <Tasks set={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View className="mt-14 w-full items-center px-5">
        <TouchableOpacity
          className="w-4/5 p-5 items-center justify-center rounded-xl bg-customBlueButton shadow-lg"
          onPress={() => navigation.navigate("CreateTask")}
        >
          <Text className="text-white text-lg">Create Task</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-11/12 bg-white rounded-lg p-5">
            {selectedTask && (
              <>
                <Text className="text-xl font-bold">{selectedTask.title}</Text>
                <Text className="mt-2">User: {selectedTask.user}</Text>
                <Text className="mt-2">Country: {selectedTask.country}</Text>
                <Text className="mt-2">
                  Description: {selectedTask.description}
                </Text>
              </>
            )}
            <TouchableOpacity
              className="mt-5 bg-[#04A5FF] p-3 rounded-lg"
              onPress={closeModal}
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskList;
