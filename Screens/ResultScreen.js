import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../Components/Header';

export default class ResultScreen extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Header name="Rezulaty" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
});
