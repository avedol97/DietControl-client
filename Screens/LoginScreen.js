import React, {Component} from 'react';
import Button from '../Components/Button';
import Warning from '../Components/Warning.js';
import UserService from '../services/UserService';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
const image = require('../assets/images/login.jpg');
const service = new UserService();
import Icon from 'react-native-vector-icons/FontAwesome';
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
      if (!data.message) {
        this.props.navigation.navigate('Auth');
      } else {
        Alert.alert(data.message);
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
        <View style={styles.top}>
          <ImageBackground
            imageStyle={{borderBottomLeftRadius: 150}}
            source={image}
            style={styles.login__image}>
            <Text style={styles.topText}>Logowanie</Text>
          </ImageBackground>
        </View>
        <View style={styles.box}>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name="user" size={22} />
            <TextInput
              onChangeText={email => this.setState({email})}
              selectionColor="#428AF8"
              underlineColorAndroid="#ff8243"
              style={styles.login__input}
              placeholder="Email"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name="eye" size={18} />
            <TextInput
              onChangeText={password => this.setState({password})}
              selectionColor="#428AF8"
              underlineColorAndroid="#ff8243"
              secureTextEntry={true}
              style={styles.login__input}
              placeholder="Hasło"
              placeholderTextColor="white"
              placeholderF
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={styles.button__text}>ZALOGUJ SIĘ</Text>
          </TouchableOpacity>
          <Text
            onPress={() => {
              this.props.navigation.navigate('Start');
            }}
            style={styles.login__text}>
            Chcesz wrócić? <Text style={styles.menu}>Menu</Text>
          </Text>
        </View>

        <View style={styles.down}>
          <ImageBackground
            imageStyle={{
              borderTopLeftRadius: 80,
              borderTopRightRadius: 80,
            }}
            source={image}
            style={styles.login__image}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2d2e30',
  },
  top: {
    width: '100%',
    height: '30%',
  },
  down: {
    margin: 0,
    width: '100%',
    height: '10%',
    justifyContent: 'flex-end',
  },
  box: {
    height: '40%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__input: {
    width: 270,
    height: 50,
    // backgroundColor: '#999999',
    color: 'white',
    alignItems: 'center',
    fontFamily: 'Domine-Bold',
  },
  login__image: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Domine-Bold',
  },
  button: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 4,
    borderColor: '#ff8243',
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 60,
  },
  button__text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Domine-Bold',
  },
  topText: {
    marginTop: 130,
    marginLeft: 220,
    color: 'white',
    fontSize: 25,
    fontFamily: 'Domine-Bold',
  },
  menu: {
    color: '#ff8243',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    margin: 15,
  },
  searchIcon: {
    color: 'white',
    padding: 15,
  },
});
