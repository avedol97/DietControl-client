import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

export default function Meals(props) {
  return (
    <View style={styles.box}>
      <Text>{props.name}</Text>
      <View style={styles.part}>
        <Text style={styles.part__text}>{props.kcal} kcal</Text>
        <Text style={styles.part__text}>{props.b} B</Text>
        <Text style={styles.part__text}>{props.t} T</Text>
        <Text style={styles.part__text}>{props.w} W</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#708090',
    padding: 6,
    borderColor: '#2d2e30',
    borderWidth: 2,
    marginTop: -10,
    margin: 2,
  },
  part: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  part__text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
