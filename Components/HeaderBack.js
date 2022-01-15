import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import UserService from '../services/UserService';

const service = new UserService();

export default class HeaderBack extends Component {
  constructor() {
    super();
  }

  back() {
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.head}>
        <Text style={styles.title}>{this.props.name}</Text>
        <TouchableOpacity style={styles.icon} onPress={() => this.back()}>
          <Icon name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#2d2e30',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Domine-Bold',
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
});
