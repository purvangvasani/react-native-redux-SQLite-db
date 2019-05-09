/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import AddUserScreen from './screens/AddUserScreen';
import ListUserScreen from './screens/ListUserScreen';
import EditUserScreen from './screens/EditUserScreen';
import ListUserStore from './screens/ListUserStore';
import UserDetailScreen from './screens/UserDetailScreen';

class App extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  AddUser: {
    screen: AddUserScreen
  },
  ListUser: {
    screen: ListUserScreen
  },
  UserDetail: {
    screen: UserDetailScreen
  },
  ListUserStore: {
    screen: ListUserStore
  },
  EditUser:{
    screen: EditUserScreen
  }
},{
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#777777',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
},);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
