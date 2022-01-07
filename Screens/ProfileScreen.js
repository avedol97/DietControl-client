import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      isResult: true,
      isLoading: false,
      details: null,
      email: '',
    };
  }

  componentDidMount() {
    this.getAsync();
  }

  async getAsync() {
    const details = await AsyncStorage.getItem('details');
    const email = await AsyncStorage.getItem('email');
    
    this.setState({
      details: JSON.parse(details),
      email: email,
      isLoading: true,
    });
  }

  renderProfile() {
    return (
      <View>
        <View style={styles.down}>
          <Text style={styles.title}>Twoje dane</Text>
          <Text style={styles.title}>{this.state.email}</Text>
          <View style={styles.tableTop}>
            <Text>Test</Text>
          </View>
          <View style={styles.table} />
          <View style={styles.table}>
            <View style={styles.tableIn} />
            <View style={styles.tableOn} />
          </View>
          <View style={styles.table}>
            <View style={styles.tableIn} />
            <View style={styles.tableOn} />
          </View>
          <View style={styles.table}>
            <View style={styles.tableIn} />
            <View style={styles.tableOn} />
          </View>
        </View>

        <Text>Twoje Dane:</Text>
        <Text>{this.state.details.gender}</Text>
        <Text>
          {this.state.details.dateOfBirth.day}{' '}
          {this.state.details.dateOfBirth.month}{' '}
          {this.state.details.dateOfBirth.year}
        </Text>
        <Text>{this.state.details.height}</Text>
        <Text>{this.state.details.activity}</Text>
        <Text>{this.state.details.type}</Text>
        <Text>{this.state.details.somatotyp}</Text>
        <Text>{this.state.details.kcalUserBalance}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <Header name="Profil" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
            marginBottom: 30,
            marginLeft: 30,
          }}>
          <Avatar
            size={190}
            rounded
            // title="Ty"
            icon={{name: 'adb', type: 'material'}}
            containerStyle={{
              backgroundColor: '#b70000',
              borderColor: '#999999',
              borderWidth: 2,
            }}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => this.changeViewProfile()}
              style={styles.button}>
              <Text style={styles.buttonText}>Zmień Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeViewProfile()}
              style={styles.button}>
              <Text style={styles.buttonText}>Zmień </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoading ? this.renderProfile() : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#181818',
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    margin: 2,
    height: 30,
    borderWidth: 2,
    backgroundColor: '#b70000',
    borderColor: '#999999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
  },
  down: {
    margin: 15,
    height: '50%',
    backgroundColor: '#333333',
  },
  table: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 10,
    borderWidth: 4,
    borderColor: '#333333',
    borderBottomColor: '#999999',
  },
  tableText: {
    color: '#b70000',
    fontSize: 15,
    fontWeight: '700',
  },
  tableTopText: {
    color: 'white',
  },
  tableDownText: {
    color: 'white',
  },
  tableIn: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableOn: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 30,
  },
  tableTop: {
    marginTop: 20,
    marginBottom: -10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 140,
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  eat: {
    height: '4%',
    width: '100%',
    backgroundColor: '#b70000',
    borderWidth: 2,
    marginTop: -10,
    borderColor: '#333333',
  },
  eatText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: 40,
    marginLeft: 65,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#b70000',
    borderWidth: 2,
    color: 'white',
  },
  topBox: {
    margin: 10,
    width: '95%',
    height: '15%',
    backgroundColor: '#333333',
    flexDirection: 'row',
  },
  topBoxText1: {
    color: 'white',
    marginLeft: 180,
    marginTop: 10,
  },
  topBoxText: {
    color: 'white',
    marginLeft: 100,
    marginTop: 10,
  },
  topBoxText2: {
    color: 'white',
    margin: 10,
  },
});
