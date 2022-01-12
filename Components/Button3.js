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
    width: 200,
    height: 50,
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#333333',
    borderWidth: 3,
    borderColor: '#ff8243',
  },
  button__text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Domine-Bold',
  },
});
