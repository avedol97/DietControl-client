import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Warning(props) {
  return (
    <View style={styles.background}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 300,
    height: 40,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
});
