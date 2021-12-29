import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

export default function Meals(props) {
  return (
    <View style={styles.part}>
      <Text style={styles.part__text}>{props.text}</Text>
      <TouchableOpacity onPress={() => props.fun()}>
        <View style={styles.button}>
          <Text style={styles.button__text}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  part: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#b70000',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  part__text: {
    marginLeft: 20,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#2d2e30',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 15,
    marginTop: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button__text: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
});
