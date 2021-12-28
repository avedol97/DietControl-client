import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MissionScreen from './Screens/MissionScreen';
import LoginScreen from './Screens/LoginScreen';
import StartScreen from './Screens/StartScreen';
import DayScreen from './Screens/DayScreen';
import ProductScreen from './Screens/ProductScreen';
import ResultScreen from './Screens/ResultScreen';
import RegisterScreen from './Screens/RegisterScreen';
import DetailsScreen from './Screens/DetailsScreen';
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
          name="Day"
          unmountOnBlur={true}
          component={DayScreen}
          activeTintColor="#ff0000"
          options={{
            tabBarLabel: 'Dzień',
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
          name="Product"
          component={ProductScreen}
          unmountOnBlur={true}
          options={{
            tabBarLabel: 'Produkt',
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
          name="Result"
          unmountOnBlur={true}
          component={ResultScreen}
          options={{
            tabBarLabel: 'Wynik',
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
        initialRouteName="Details">
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
        <Stack.Screen
          name="Start"
          component={StartScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Mission"
          component={MissionScreen}
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
