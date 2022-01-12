import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.fun()}>
      <Text style={styles.button__text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#708090',
  },
  button__text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Domine-Bold',
  },
});
