import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

export default function Meals(props) {
  return (
    <View style={styles.background}>
      <View style={styles.box2}>
        <View style={styles.box}>
          <Text>{props.name}</Text>
        </View>

        <TouchableOpacity onPress={() => props.fun()}>
          <View style={styles.button}>
            <Text style={styles.button__text}>-</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  background: {
    height: '10%',
    width: '100%',
    backgroundColor: '#708090',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#2d2e30',
    borderWidth: 2,
    marginTop: -12,
  },
  box: {
    width: '97%',
  },
  box2: {
    flexDirection: 'row',
  },
  part: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  part__text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    height: 20,
    width: 20,
    backgroundColor: '#2d2e30',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: -6,
  },
  button__text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
