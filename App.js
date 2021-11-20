import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TestScreen from './Screens/Test';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const RootStack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
  }

  Menu = () => {
    return (
      <Tab.Navigator
        initialRouteName="TestScreen"
        activeColor="#ff0000"
        inactiveColor="#fff"
        barStyle={{backgroundColor: '#2d2e30'}}
        activeTintColor="#ff0000">
        <Tab.Screen
          name="About"
          unmountOnBlur={true}
          component={TestScreen}
          activeTintColor="#ff0000"
          options={{
            tabBarLabel: 'O nas',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <Icon
                name="information"
                size={25}
                color={focused ? '#ff0000' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Car-List"
          component={TestScreen}
          unmountOnBlur={true}
          options={{
            tabBarLabel: 'aaaaaa',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <Icon
                name="car"
                size={25}
                color={focused ? '#ff0000' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reservations"
          unmountOnBlur={true}
          component={TestScreen}
          options={{
            tabBarLabel: 'bbbbb',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <Icon
                name="list"
                size={25}
                color={focused ? '#ff0000' : 'white'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  Navi = () => {
    return (
      <Stack.Navigator
        unmountOnBlur={true}
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
      </Stack.Navigator>
    );
  };

  RootStackScreen = () => {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name="App"
          component={this.Navi}
          unmountOnBlur={true}
          options={{
            animationEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <RootStack.Screen
          name="Auth"
          component={this.Menu}
          unmountOnBlur={true}
          options={{
            animationEnabled: false,
            headerShown: true,
            unmountOnBlur: true,
          }}
        />
      </RootStack.Navigator>
    );
  };

  render() {
    return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
  }
}
