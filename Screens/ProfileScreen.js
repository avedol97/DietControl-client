import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import OverlayPassword from '../Components/OverlayPassword';
import OverlayData from '../Components/OverlayData';

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      isResult: true,
      isLoading: false,
      details: null,
      email: '',
      gender: '',
    };
  }

  componentDidMount() {
    this.getAsync();
  }

  async getAsync() {
    let temp;
    const details = JSON.parse(await AsyncStorage.getItem('details'));
    const email = await AsyncStorage.getItem('email');

    if (details.gender === 'Men') {
      temp = 'Mężczyzna';
    } else {
      temp = 'Kobieta';
    }

    this.setState({
      details: details,
      gender: temp,
      email: email,
      isLoading: true,
    });
  }

  renderProfile() {
    return (
      <View>
        <View style={styles.down}>
          <Text style={styles.title}>Twoje dane</Text>
          <View style={styles.tableTop} />
          <View style={styles.table} />
          <View style={styles.table}>
            <View style={styles.box}>
              <Text style={styles.tableText}>Data urodzenia:</Text>
            </View>

            <Text style={styles.tableText}>
              {this.state.details.dateOfBirth.day}/
              {this.state.details.dateOfBirth.month}/
              {this.state.details.dateOfBirth.year}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.box}>
              <Text style={styles.tableText}>Płeć:</Text>
            </View>
            <Text style={styles.tableText}>{this.state.gender}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.box}>
              <Text style={styles.tableText}>Wzrost:</Text>
            </View>
            <Text style={styles.tableText}>{this.state.details.height}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.box}>
              <Text style={styles.tableText}>Waga:</Text>
            </View>
            <Text style={styles.tableText}>{this.state.details.weight}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <Header name="Profil" navigation={this.props.navigation} />
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
              backgroundColor: '#ff8243',
              borderColor: '#999999',
              borderWidth: 2,
            }}
          />
          <View style={styles.buttons}>
            <Text style={styles.email}>{this.state.email}</Text>
            <OverlayPassword />
            <OverlayData />
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
  down: {
    margin: 20,
    backgroundColor: '#333333',
  },
  table: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 5,
    paddingBottom: 10,
    borderWidth: 4,
    borderColor: '#333333',
    borderBottomColor: '#999999',
  },
  tableText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Domine-Bold',
  },
  email: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
    fontFamily: 'Domine-Bold',
  },
  box: {
    width: 170,
  },
});
