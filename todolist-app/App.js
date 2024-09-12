import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoListScreen from './components/ToDoListScreen';
import CreateTaskScreen from './components/CreateTaskScreen';
import EditTaskScreen from './components/EditTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = (taskName) => {
    setTaskItems([...taskItems, { id: Date.now().toString(), title: taskName, done: false }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pass the component directly */}
        <Stack.Screen
          name="To-Do List"
          options={{ title: 'To-Do List' }}
        >
          {props => <ToDoListScreen {...props} tasks={taskItems} setTaskItems={setTaskItems} />}
        </Stack.Screen>

        <Stack.Screen
          name="Create Task"
          options={{ title: 'Create Task' }}
        >
          {props => <CreateTaskScreen {...props} addTask={handleAddTask} />}
        </Stack.Screen>

        <Stack.Screen
          name="Edit Task" 
          options={{ title: 'Edit Task' }}
        >
          {props => <EditTaskScreen {...props} tasks={taskItems} setTaskItems={setTaskItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
