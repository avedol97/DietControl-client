import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MissionScreen from './Screens/MissionScreen';
import LoginScreen from './Screens/LoginScreen';
import StartScreen from './Screens/StartScreen';
import DayScreen from './Screens/DayScreen';
import ResultScreen from './Screens/ResultScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SearchMealScreen from './Screens/SearchMealScreen';
import AddMealScreen from './Screens/AddMealScreen';
import DetailsScreen from './Screens/DetailsScreen';
import CalculateScreen from './Screens/CalculateScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        fontFamily="Domine-Bold"
        activeColor="#ff8243"
        inactiveColor="#fff"
        barStyle={{backgroundColor: '#2d2e30'}}
        activeTintColor="#ff8243">
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
                name="calendar"
                size={22}
                color={focused ? '#ff8243' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Recipe"
          component={ResultScreen}
          unmountOnBlur={true}
          options={{
            tabBarLabel: 'Postęp',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <Icon
                name="calculator"
                size={22}
                color={focused ? '#ff8243' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Result"
          unmountOnBlur={true}
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profil',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <Icon
                name="list"
                size={23}
                color={focused ? '#ff8243' : 'white'}
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
        initialRouteName="Start">
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
        <Stack.Screen
          name="AddMeal"
          component={AddMealScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen
          name="SearchMeal"
          component={SearchMealScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Calculate"
          component={CalculateScreen}
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
      </Stack.Navigator>
    );
  };

  RootStackScreen = () => {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="App"
          component={this.Navi}
          unmountOnBlur={true}
          options={{
            headerShown: false,
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
            headerShown: false,
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
