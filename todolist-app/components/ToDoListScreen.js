import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ToDoListScreen({ tasks, setTaskItems }) {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter tasks based on search term
  const handleSearch = () => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to toggle the task's 'done' state
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };  
      }
      return task;
    });
    setTaskItems(updatedTasks); 
  };

  // Navigate to the EditTaskScreen, passing the task to be edited
  const handleEditTask = (task) => {
    navigation.navigate('Edit Task', { task, setTaskItems, tasks });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={item.done ? styles.doneTask : styles.task}>{item.title}</Text>
      <View style={styles.actions}>
        {/* Checkbox to toggle task completion */}
        <TouchableOpacity style={styles.checkbox} onPress={() => toggleTask(item.id)}>
          <Text>{item.done ? <MaterialIcons name="check" size={15} color="black" /> : null}</Text>
        </TouchableOpacity>

        {/* Edit button to navigate to the EditTaskScreen */}
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditTask(item)}>
          <MaterialIcons name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}  
        />
      </View>
      <FlatList
        data={handleSearch()}  
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      
      <View style={styles.bottomActions}>
        {/* Button to delete all done tasks */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setTaskItems(tasks.filter(task => !task.done))}>
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
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
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
  searchBar: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 4,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    padding: 2,
    marginRight: 5,
  },
});
