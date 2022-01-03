import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  constructor(props) {
    super(props);
  }

  login = async (email, password) => {
    return await fetch(this.baseUrl + 'guest/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(async data => {
        if (data) {
          AsyncStorage.setItem('TOKEN', data.token);
          AsyncStorage.setItem('userId', data.user);
          return data;
        }
      })
      .catch(error => {
        console.log('POST error: ' + error);
      });
  };

  signup = async (email, password) => {
    await fetch(this.baseUrl + 'guest/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(response => console.log(response));
  };

  logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
  };
}
