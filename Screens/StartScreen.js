import React, {Component} from 'react';
import {ImageBackground, StyleSheet, TextInput, View, Text} from 'react-native';

import Button from '../Components/Button';
const image = require('../assets/images/start.jpg');
export default class StartScreen extends Component {
  render() {
    return (
      <View style={styles.background}>
        <ImageBackground source={image} style={styles.login__image}>
          <View style={styles.box}>
            <Button
              style={styles.button}
              text="Nasza Misja"
              fun={() => this.props.navigation.navigate('Mission')}
            />
            <Button
              style={styles.button}
              text="Zaloguj się"
              fun={() => this.props.navigation.navigate('Login')}
            />
            <Button
              style={styles.button}
              text="Zarejestruj się"
              fun={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: '85%',
  },
  button: {
    margin: 10,
  },
  login__image: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__text: {
    width: 150,
    height: 25,
    color: 'white',
    margin: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
