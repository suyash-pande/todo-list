import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import "../global.css";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [countries, setCountries] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountries(countryList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch countries");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const createTask = async () => {
    if (!title || !user || !selectedCountry || !description) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        title,
        JSON.stringify({ title, user, country: selectedCountry, description })
      );
      Alert.alert("Task create successfully!");
      setTitle("");
      setUser("");
      setSelectedCountry(null);
      setDescription("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the task.");
    }
  };

  return (
    <View className="flex-1 bg-[#BCD7FF]">
      <View className="pt-20 px-5">
        <Text className="text-2xl font-semibold">Create a new Task!</Text>
        <View className="mt-8">
          <Text className="text-lg font-medium mb-2">Title</Text>
          <TextInput
            className="h-12 w-full border border-white rounded-lg p-2 text-[#20211A] bg-[#FFF5EE] mb-5"
            placeholder="Enter title"
            placeholderTextColor="#585858"
            value={title}
            onChangeText={setTitle}
          />
          <Text className="text-lg font-medium mb-2">User Assigned</Text>
          <TextInput
            className="h-12 w-full border border-white rounded-lg p-2 text-[#20211A] bg-[#FFF5EE] mb-5"
            placeholder="Enter user assigned"
            placeholderTextColor="#585858"
            value={user}
            onChangeText={setUser}
          />

          <Text className="text-lg font-medium mb-2">Country</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <RNPickerSelect
              onValueChange={(value) => setSelectedCountry(value)}
              items={countries}
              style={pickerSelectStyles}
              placeholder={{
                label: "Select a country...",
                value: null,
                color: "#000000",
              }}
              value={selectedCountry}
            />
          )}

          <Text className="text-lg font-medium mb-2">Description</Text>
          <TextInput
            className="h-52 w-full border border-white rounded-lg p-2 text-[#20211A] bg-[#FFF5EE] mb-5"
            placeholder="Description (Max 120 words)"
            placeholderTextColor="#585858"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
      <View className="mt-10 w-full flex items-center">
        <TouchableOpacity
          className="w-4/5 py-5 flex items-center justify-center rounded-2xl bg-[#04A5FF] shadow-md"
          onPress={createTask}
        >
          <Text className="text-2xl text-white">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTask;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#FFF5EE",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#FFF5EE",
    marginBottom: 20,
  },
});
