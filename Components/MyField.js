import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

export default function MyField(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.fun()}>
      <Text style={styles.button__text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#708090',
    borderWidth: 3,
  },
  button__text: {
    color: 'white',
    textAlign: 'left',
    fontSize: 15,
  },
});
