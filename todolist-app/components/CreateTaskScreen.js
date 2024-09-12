import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateTaskScreen({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const navigation = useNavigation();

  const handleCreate = () => {
    if (taskName.trim()) {
      addTask(taskName);  // Add the new task to the list
      navigation.goBack();  // Go back to the ToDoListScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCreate()}>
        <Text style={styles.addText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#C0C0C0' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5, backgroundColor: '#FFF' },
  button: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: { color: 'white', fontSize: 24 }
});
