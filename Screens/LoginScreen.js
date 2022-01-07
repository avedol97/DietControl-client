import React, {Component} from 'react';
import Button from '../Components/Button';
import Warning from '../Components/Warning.js';
import UserService from '../services/UserService';
import {ImageBackground, StyleSheet, TextInput, View, Text} from 'react-native';
const image = require('../assets/images/login.jpg');
const service = new UserService();

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      warning: 'd',
    };
  }

  login = async (email, password) => {
    if (email !== '' && password !== '') {
      const data = await service.login(email, password);
      this.setState({alert: data.message});
      if (!data.message) {
        this.props.navigation.navigate('Auth');
      }
    }
  };

  warning = () => {
    return (
      <View style={styles.background}>
        <Warning text={this.state.warning} />;
      </View>
    );
  };

  render() {
    this.warning();
    return (
      <View style={styles.background}>
        <ImageBackground source={image} style={styles.login__image}>
          <View style={styles.box}>
            <TextInput
              onChangeText={email => this.setState({email})}
              style={styles.login__input}
              placeholder="Email"
              placeholderTextColor="white"
            />
            <TextInput
              onChangeText={password => this.setState({password})}
              secureTextEntry={true}
              style={styles.login__input}
              placeholder="Hasło"
              placeholderTextColor="white"
            />
            <Text
              onPress={() => {
                this.props.navigation.navigate('Start');
              }}
              style={styles.login__text}>
              Strona główna
            </Text>
            <Button
              text="Zaloguj się"
              fun={() => this.login(this.state.email, this.state.password)}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

//przydatny kolor
//#48D1CC
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__input: {
    width: 300,
    height: 50,
    backgroundColor: '#999999',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 25,
    marginBottom: 25,
    color: 'white',
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
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
