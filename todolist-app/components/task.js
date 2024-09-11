import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Task = (props) => {

    // State to track if the button is checked or not
  const [checked, setChecked] = useState(false);

  // Function to toggle the checked state
  const toggleChecked = () => {
    setChecked(!checked);
  };

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                
                <Text>{props.text}</Text>

            </View>
            <TouchableOpacity onPress={toggleChecked} style={styles.button}>
                {checked ? (
                    <MaterialIcons name="check" size={15} color="black" />
                ) : (
                    <View style={styles.emptySquare} />
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    button: {
        width: 20, // Adjust the size to your needs
        height: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 4, // Makes it a square with rounded corners
        flexDirection: 'row'
      },
      emptySquare: {
        width: '50%',
        height: '50%',
      },
});

export default Task;