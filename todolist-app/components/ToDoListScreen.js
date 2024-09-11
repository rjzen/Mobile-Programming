import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ToDoListScreen({ tasks, setTaskItems }) {
  const navigation = useNavigation();

  // Function to toggle the task's 'done' state
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };  // Toggle the 'done' state
      }
      return task;
    });
    setTaskItems(updatedTasks);  // Update the task list
  };

  // Function to delete all done tasks
  const deleteDoneTasks = () => {
    const updatedTasks = tasks.filter(task => !task.done);  // Remove only tasks that are done
    setTaskItems(updatedTasks);  // Update the task list
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={item.done ? styles.doneTask : styles.task}>{item.title}</Text>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleTask(item.id)}>
        <Text>{item.done ? <MaterialIcons name="check" size={15} color="black" /> : null}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      
      <View style={styles.bottomActions}>
        {/* Button to delete all done tasks */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteDoneTasks}>
          <Text style={styles.deleteText}>🗑️ Delete Done Tasks</Text>
        </TouchableOpacity>
        
        {/* Button to navigate to create task screen */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Create Task')}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { 
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 20,
    borderColor: '#C0C0C0',
    borderWidth: 1,
   },
  task: { fontSize: 18 },
  doneTask: { fontSize: 18, textDecorationLine: 'line-through', color: 'gray' },
  checkbox: { 
    width: 20, // Adjust the size to your needs
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4, // Makes it a square with rounded corners
    flexDirection: 'row',
    marginRight: 5
   },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  addButton: { 
    backgroundColor: 'black', 
    borderRadius: 50, 
    padding: 20,
  },
  addText: { color: 'white', fontSize: 24 },
  deleteButton: { 
    backgroundColor: '#FFF', 
    borderRadius: 5, 
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  deleteText: { fontSize: 18, color: 'black' },
});
