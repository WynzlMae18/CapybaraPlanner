import React, { useState } from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,TextInput,ScrollView,Alert,Image,} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Settings = ({ toggleMode, clearList, mode, onClose }) => (
  <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2 }}>
    <TouchableOpacity style={{ padding: 10, alignItems: 'flex-end' }} onPress={onClose}>
      <Icon name="times" size={20} color="#5C4033" marginTop={40} />
    </TouchableOpacity>
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: mode === 'light' ? '#5C4033' : 'white' }}>
        Settings
      </Text>
    </View>
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={toggleMode}>
        <Text style={{ color: mode === 'light' ? '#5C4033' : 'black', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Change Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearList}>
        <Text style={{ color: mode === 'light' ? '#5C4033' : 'black', fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Clear List</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const App = () => {
  const [mode, setMode] = useState('light'); // 'light' or 'dark'
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    setShowSettings(false);
  };

  const clearList = () => {
    Alert.alert('Clear List', 'Are you sure you want to clear all tasks?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: () => {
          setTodos([]);
          setShowSettings(false); // Close settings after clearing the list
        },
        style: 'destructive',
      },
    ]);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const currentDate = new Date(); // Replace with the actual chosen date
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      const updatedTodos = [...todos, { date: formattedDate, activity: newTodo }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const handleCalendarClick = () => {
    // Add your calendar handling logic here
    console.log('Calendar Clicked');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mode === 'light' ? '#F3EFEF' : '#222', margin: 10 }}>
      {/* Top Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
          zIndex: 2, // Ensure the top header is on top
        }}>
        <TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
          <Icon name="cog" size={20} color="#5C4033" marginTop={30} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <Image source={require('./assets/capybara.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: mode === 'light' ? '#5C4033' : 'white' }}>
            Capybara Planner
          </Text>
        </View>
        {/* Leave the center empty or add any other component if needed */}
        <View style={{ width: 40, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={handleCalendarClick}>
            <Icon name="calendar-alt" size={20} color={mode === 'light' ? '#5C4033' : 'white'} marginTop={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Sidebar */}
      {showSettings && (
        <Settings toggleMode={toggleMode} clearList={clearList} mode={mode} onClose={() => setShowSettings(false)} />
      )}

      {/* Main Content */}
      <View style={{ padding: 10, zIndex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: mode === 'light' ? '#5C4033' : 'white', marginTop: 30 }}>
          Todo List
        </Text>
        {/* Date and Day Selection */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity onPress={handleCalendarClick}>
            <Icon name="calendar-day" size={20} color={mode === 'light' ? '#5C4033' : 'white'} marginRight={20} marginTop={20} />
          </TouchableOpacity>
          {/* Add Button Icon */}
          <TouchableOpacity onPress={addTodo}>
            <Icon name="plus" size={20} color={mode === 'light' ? '#5C4033' : 'white'} marginRight={20} marginTop={20} />
          </TouchableOpacity>
          {/* Input Field */}
          <TextInput
            placeholder="Activity"
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: mode === 'light' ? '#5C4033' : 'white',
              color: mode === 'light' ? '#5C4033' : 'white',
              marginRight: 20,
              marginTop: 20,
            }}
          />
        </View>
      </View>

      {/* Todo List Display */}
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {todos.map((todo, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              marginLeft:-20
            }}>
            <RadioButton
              value={index}
              status={selectedItem === index ? 'checked' : 'unchecked'}
              onPress={() => setSelectedItem(index)}
            />
            <Text style={{ color: mode === 'light' ? '#5C4033' : 'white' }}>
              {`${todo.date} - ${todo.activity}`}
            </Text>
            {/* Edit and Delete functionality */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight:11}}>
              <TouchableOpacity onPress={() => setEditingIndex(index)}>
                <Icon name="edit" size={15} color={mode === 'light' ? '#5C4033' : 'white'} />
              </TouchableOpacity>
              {editingIndex === index && (
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Icon name="trash-alt" size={15} color={mode === 'light' ? 'red' : '#FF5757'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
