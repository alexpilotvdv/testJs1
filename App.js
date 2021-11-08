//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store/index';
import { Provider } from 'react-redux';
import ToDo from './src/ToDo';

export default class App extends React.Component {
 // console.log('app')
 render(){
  // console.log(store.todos)
  return (
    <Provider store={store}>
      <ToDo />
    </Provider>

  )
 } 
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
