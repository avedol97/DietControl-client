import React, {useState} from 'react';
import {Button, Overlay, Icon} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';

import UserService from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = new UserService();

type OverlayComponentProps = {};

const OverlayComponent: React.FunctionComponent<OverlayComponentProps> = () => {
  const [visible, setVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState('1');
  const [repeatPassword, setRepeatPassword] = useState('2');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const changePassword = async () => {
    if (password === repeatPassword) {
      const email = await AsyncStorage.getItem('email');
      let change = service.changePassword(email, oldPassword, password);
      Alert.alert('Pomyślnie zmieniono hasło !');
      setVisible(!visible);
    } else {
      Alert.alert('Różne hasła !');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleOverlay()} style={styles.button}>
        <Text style={styles.buttonText}>Zmień Hasło</Text>
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.mainText}>AKTUALNE HASŁO</Text>
        <TextInput
          onChangeText={oldPassword => setOldPassword(oldPassword)}
          secureTextEntry={true}
          style={styles.login__input}
          placeholder="WPISZ"
          placeholderTextColor="white"
        />
        <Text style={styles.mainText}>NOWE HASŁO</Text>
        <TextInput
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
          style={styles.login__input}
          placeholder="WPISZ"
          placeholderTextColor="white"
        />
        <Text style={styles.mainText}>POWTÓRZ NOWE HASŁO</Text>
        <TextInput
          onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
          secureTextEntry={true}
          style={styles.login__input}
          placeholder="WPISZ"
          placeholderTextColor="white"
        />
        <TouchableOpacity
          onPress={() => changePassword()}
          style={styles.button}>
          <Text style={styles.buttonText}>Zmień Hasło</Text>
        </TouchableOpacity>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    height: 35,
    borderWidth: 2,
    backgroundColor: '#ff8243',
    borderColor: '#999999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 19,
    fontFamily: 'Domine-Bold',
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

    color: 'white',
    paddingLeft: 15,
  },
  login__text: {
    width: 150,
    height: 25,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainText: {
    margin: 10,
    fontFamily: 'Domine-Bold',
  },
});

export default OverlayComponent;
