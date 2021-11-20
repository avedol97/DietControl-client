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
    borderWidth: 2,
    borderColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  button__text: {
    color: 'white',
  },
});
