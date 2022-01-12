import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class StartScreen extends Component {
  render() {
    return (
      <View style={styles.background}>
        <View style={styles.triangleCornerTop} />
        <View style={styles.main}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.props.navigation.navigate('Mission')}>
            <Text style={styles.text}>APLIKACJA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.text}>Logowanie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button3}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.text}>Rejestracja</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.triangleCornerBottom} />
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
  button1: {
    width: 190,
    height: 100,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 20,
    textAlign: 'center',
    marginLeft: 5,
    marginTop: 120,
  },
  button2: {
    width: 210,
    height: 110,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 20,
    textAlign: 'center',
    marginLeft: -90,
  },
  button3: {
    width: 210,
    height: 110,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 20,
    textAlign: 'center',
    marginTop: -120,
    marginLeft: -130,
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
  triangleCornerTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 450,
    borderTopWidth: 300,
    borderRightColor: 'transparent',
    borderTopColor: '#ff8243',
  },
  triangleCornerBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 500,
    borderTopWidth: 360,
    borderRightColor: 'transparent',
    borderTopColor: '#ff8243',
    transform: [{rotate: '180deg'}],
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 30,
    fontSize: 20,
    fontFamily: 'PermanentMarker-Regular',
  },
  main: {
    height: '0%',
    margin: 10,
    flexDirection: 'row',
  },
});
