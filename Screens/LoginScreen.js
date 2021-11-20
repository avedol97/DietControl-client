import React, {Component} from 'react';
import Button from '../Components/Button';
import UserService from '../services/UserService';
import {StyleSheet, TextInput, View} from 'react-native';

const service = new UserService();

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = async (email, password) => {
    console.log('email ' + email);
    console.log('password ' + password);
    if (email !== '' && password !== '') {
      const data = await service.login(email, password);
      if (data) {
        this.props.navigation.navigate('Auth');
      }
    }
  };

  render() {
    return (
      <View style={styles.background}>
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
        <Button
          text="Zaloguj się"
          fun={() => this.login(this.state.email, this.state.password)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  login__input: {
    width: '80%',
    height: 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
});
