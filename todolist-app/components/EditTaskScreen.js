import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditTaskScreen() {
  const route = useRoute();
  const { task, setTaskItems, tasks } = route.params;
  const [taskName, setTaskName] = useState(task.title);
  const navigation = useNavigation();

  const handleSave = () => {
    if (taskName.trim()) {
      const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, title: taskName } : t);
      setTaskItems(updatedTasks);  // Update the task list with the edited task
      navigation.goBack();  // Navigate back to the ToDoListScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}>
        <Text style={styles.addText}>Save</Text>
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
