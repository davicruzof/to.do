import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TasksListProps, Task } from './TasksList';

interface ItemProps extends TasksListProps {
    index: number,
    item: Task
}

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

const TaskItem = ({toggleTaskDone, removeTask, editTask, index, item }: ItemProps) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitleValue, setTaskTitleValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing(){
        setTaskTitleValue(item.title);
        setIsEditing(false);
    }

    function handleSubmitedEditing(){
        editTask({taskId: item.id, taskNewTitle: taskTitleValue});
        setIsEditing(false);
    }

    useEffect(() => {
        if(textInputRef.current){
            if(isEditing){
                textInputRef.current.focus()
            }else{
                textInputRef.current.blur()
            }
        }
    },[isEditing])
  
    return (
    <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
            >
              <View
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
              >
                  {item.done && (
                      <Icon
                          name="check"
                          size={12}
                          color="#FFF" />
                  )}
              </View>

              <TextInput 
                value={taskTitleValue}
                onChangeText={setTaskTitleValue}
                editable={isEditing}
                onSubmitEditing={handleSubmitedEditing}
                style={item.done ? styles.taskTextDone : styles.taskText}
                ref={textInputRef}

              />
          </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: 'row', paddingRight: 24}}
      >
          {
              isEditing ? (
                <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={handleCancelEditing}
                >
                    <Icon name='x' size={24} color='#b2b2b2' />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={handleStartEditing}
                >
                    <Image source={editIcon} />
                </TouchableOpacity>
              )
          }
          <View style={styles.divider} />
            <TouchableOpacity
                testID={`trash-${index}`}
                onPress={() => removeTask(item.id)}
                disabled={isEditing}
            >
                <Image style={{
                    opacity: isEditing ? 0.2: 1
                }} source={trashIcon} />
            </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    divider: {
        width: 1, 
        marginHorizontal: 15, 
        backgroundColor: '#c4c4c4'
    }
  })

export {TaskItem};